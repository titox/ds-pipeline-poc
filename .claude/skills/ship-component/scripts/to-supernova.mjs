#!/usr/bin/env node
// Converts a neutral documentation source into Supernova page bodies (MDX-lite).
//   node to-supernova.mjs docs/pages/<Name>.md docs/pages/supernova.config.json [out.json]
// Prints (or writes) { title, description, tabs: [{ title, mdx }] }, ready for the
// CREATE_DOC_TABBED_PAGE action or one WRITE_DOC_PAGE_CONTENT per tab.
// It writes nothing to Supernova: the caller does, after stating the credit cost.
import fs from "node:fs";
import path from "node:path";

const [src, configPath, outPath] = process.argv.slice(2);
if (!src || !configPath) {
  console.error("usage: to-supernova.mjs docs/pages/<Name>.md supernova.config.json [out.json]");
  process.exit(1);
}
const name = path.basename(src, ".md");
const cfg = JSON.parse(fs.readFileSync(configPath, "utf8"));
const comp = cfg.components?.[name];
if (!comp) {
  console.error(`No entry for "${name}" under "components" in ${configPath}. Add its componentId and storybookEntityId.`);
  process.exit(1);
}
const text = fs.readFileSync(src, "utf8").replace(/\r\n/g, "\n");

const meta = {};
let body = text;
if (text.startsWith("---\n")) {
  const end = text.indexOf("\n---\n", 4);
  for (const line of text.slice(4, end).split("\n")) {
    const m = line.match(/^([A-Za-z]+):\s*(.*)$/);
    if (m) meta[m[1]] = m[2].replace(/^"|"$/g, "");
  }
  body = text.slice(end + 5);
}

const attr = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;");
const figmaUrl = (node) => `https://www.figma.com/design/${cfg.figmaFileKey}/?node-id=${node.trim().replace(":", "-")}`;
const storyUrl = (id) => `${cfg.storybookBase}/?path=/story/${id}`;
const cells = (line) => line.trim().replace(/^\||\|$/g, "").split("|").map((c) => c.trim());
const lines = body.split("\n");

// Alternative texts: the "## Images" table before the first tab.
const alts = {};
{
  const start = lines.findIndex((l) => l.trim() === "## Images");
  if (start >= 0) {
    for (let k = start + 1; k < lines.length && !lines[k].startsWith("## Tab:"); k++) {
      const m = lines[k].match(/^\|\s*(\d+:\d+)\s*\|\s*(.+?)\s*\|$/);
      if (m) alts[m[1]] = m[2];
    }
  }
}
const image = (node, alt) => `<SNImage alt="${attr(alt || alts[node.trim()] || "")}" figmaUrl="${figmaUrl(node)}" />`;

function table(head, rows, indent = "", headerColumn = false) {
  const row = (r) =>
    `${indent}  <SNTableRow>\n` +
    r.map((c) => `${indent}    <SNTableCell>\n${c ? `${indent}      ${c}` : ""}\n${indent}    </SNTableCell>`).join("\n\n") +
    `\n${indent}  </SNTableRow>`;
  return `${indent}<SNTable showBorder highlightHeaderRow highlightHeaderColumn${headerColumn ? "" : "={false}"}>\n${[head, ...rows].map(row).join("\n\n")}\n${indent}</SNTable>`;
}

function shortcut(title, description, href, logo, indent = "  ") {
  const l = cfg.logos?.[logo];
  const open = `${indent}<SNShortcut title="${attr(title)}" description="${attr(description)}" href="${attr(href)}" openInNewTab`;
  return l ? `${open}>\n${indent}  <SNImage resourceId="${l.resourceId}" src="${l.src}" />\n${indent}</SNShortcut>` : `${open} />`;
}

function target(logo, raw) {
  const t = raw.replace(/`/g, "");
  let m;
  if ((m = t.match(/Node (\d+:\d+)/))) return figmaUrl(m[1]);
  if ((m = t.match(/Story (\S+)/))) return storyUrl(m[1]);
  if (logo === "code") return cfg.repoBase + t;
  return t;
}

const tabs = [];
let out = null;
let pending = null;
let sub = null; // in-page tabs: [{ title, parts[] }]
let section = "";
let intro = []; // "What it is" paragraphs open the Usage tab without a heading
const push = (s) => (sub && sub.length ? sub.at(-1).parts : out).push(s);
function closeSub() {
  if (!sub) return;
  const inner = sub
    .map((t) => `  <SNTab title="${attr(t.title)}">\n    <SNColumn>\n${t.parts.join("\n\n")}\n    </SNColumn>\n  </SNTab>`)
    .join("\n\n");
  out.push(`<SNSection sectionType="Tabs" variantId="Tabs">\n${inner}\n</SNSection>`);
  sub = null;
}

let i = lines.findIndex((l) => l.startsWith("## Tab:"));
while (i < lines.length) {
  const t = lines[i].trim();
  if (!t) {
    i++;
    continue;
  }
  if (t.startsWith("<!--")) {
    const start = i;
    while (!lines[i].includes("-->")) i++;
    const m = lines.slice(start, i + 1).join(" ").match(/block:\s*([a-z-]+)/);
    if (m) pending = m[1];
    if (pending === "tabs-in-page") {
      sub = [];
      pending = null;
    }
    i++;
    continue;
  }
  let m;
  if ((m = t.match(/^## Tab:\s*(.+)$/))) {
    closeSub();
    tabs.push({ title: m[1], parts: [] });
    out = tabs.at(-1).parts;
    i++;
    continue;
  }
  if ((m = t.match(/^### (.+)$/))) {
    closeSub();
    section = m[1];
    // Status and "What it is" carry no heading: they open the page.
    if (section !== "Status" && section !== "What it is") out.push(`## ${section}`);
    i++;
    continue;
  }
  if ((m = t.match(/^#### (.+)$/))) {
    if (sub) sub.push({ title: m[1], parts: [] });
    else out.push(`### ${m[1]}`);
    i++;
    continue;
  }
  if (t.startsWith("```")) {
    const code = [lines[i++]];
    while (i < lines.length && !lines[i].trim().startsWith("```")) code.push(lines[i++]);
    code.push(lines[i++]);
    push(code.join("\n"));
    pending = null;
    continue;
  }
  if (t.startsWith("|")) {
    const head = cells(lines[i]);
    i += 2;
    const rows = [];
    while (i < lines.length && lines[i].trim().startsWith("|")) rows.push(cells(lines[i++]));
    const col = (r, n) => r[head.findIndex((h) => h.toLowerCase() === n)] || "";
    if (pending === "status") {
      const detail = (area) => (rows.find((r) => r[0].toLowerCase() === area) || [])[2] || "";
      out.push(
        `<SNComponentHealth component="${comp.componentId}" selectedPropertyIds={${JSON.stringify(cfg.healthPropertyIds)}} />`,
      );
      out.push([detail("review"), detail("react")].filter(Boolean).join(" "));
    } else if (pending === "cards" && section === "Related components") {
      push(rows.map((r) => `- [**${col(r, "title")}**](${target("", col(r, "target"))}): ${col(r, "subtitle")}`).join("\n"));
    } else if (pending === "cards") {
      const items = rows.map((r) => {
        const logo = col(r, "logo").toLowerCase();
        return shortcut(col(r, "title"), col(r, "subtitle"), target(logo, col(r, "target")), logo);
      });
      push(`<SNShortcuts variant="iconOnTop" columns={${Math.min(items.length, 3)}}>\n${items.join("\n\n")}\n</SNShortcuts>`);
    } else if (pending === "do-dont") {
      const items = rows.flatMap((r) => {
        const nodes = (r[2] || "").match(/\d+:\d+/g) || [];
        return [
          ["do", r[0], nodes[0]],
          ["dont", r[1], nodes[1]],
        ].map(([type, textCell, node]) => `  <SNGuideline type="${type}">\n${node ? `    ${image(node)}\n\n` : ""}    ${textCell}\n  </SNGuideline>`);
      });
      push(`<SNGuidelines columns={2}>\n${items.join("\n\n")}\n</SNGuidelines>`);
    } else {
      // Top-level tables go as GFM pipe tables: the source is GFM, Supernova turns
      // them into native tables, and the payload stays small. Tables inside in-page
      // tabs use the explicit block form, which is what is known to work there.
      if (sub && sub.length) push(table(head, rows, "      ", head[0] === "Part" && head.length > 2));
      else push([head, head.map(() => "---"), ...rows].map((r) => `| ${r.join(" | ")} |`).join("\n"));
    }
    pending = null;
    continue;
  }
  if (/^(- |\d+\. )/.test(t)) {
    const items = [];
    while (i < lines.length && /^(- |\d+\. )/.test(lines[i].trim())) items.push(lines[i++].trim());
    push(items.join("\n"));
    continue;
  }
  if (pending === "storybook") {
    push(`<SNStorybook id="${comp.storybookEntityId}" variant="playground" />`);
  } else if (pending === "image") {
    const node = (t.match(/Figma frame (\d+:\d+)/) || [])[1];
    if (node) push(image(node, t.replace(/\s*Figma frame \d+:\d+\s*$/, "").replace(/\.$/, "")));
  } else if (pending === "callout") {
    push(`<SNCallout type="Info">\n  ${t}\n</SNCallout>`);
  } else if (pending === "contact") {
    const [title, subtitle, link] = t.split(",").map((s) => s.trim());
    const placeholder = /placeholder/i.test(link || "");
    push(
      `<SNShortcuts variant="iconOnLeft" columns={1}>\n${shortcut(title, placeholder ? `${subtitle} (placeholder link)` : subtitle, placeholder ? cfg.contactHref : link, "teams")}\n</SNShortcuts>`,
    );
  } else if (section === "What it is") {
    intro.push(t);
  } else if (/^(Use it for|Not for this|The component handles|You must do)$/.test(t)) {
    push(`### ${t}`);
  } else {
    push(t);
  }
  pending = null;
  i++;
}
closeSub();

if (tabs.length && intro.length) tabs[0].parts.unshift(intro.join("\n\n"));
const result = {
  title: meta.component || name,
  description: meta.summary || "",
  tabs: tabs.map((tab) => ({ title: tab.title, mdx: tab.parts.join("\n\n") + "\n" })),
};
const json = JSON.stringify(result, null, 2);
if (outPath) {
  fs.writeFileSync(outPath, json + "\n");
  const images = (json.match(/figmaUrl=/g) || []).length;
  console.log(`wrote ${outPath}: ${result.tabs.map((t) => `${t.title} (${t.mdx.split("\n").length} lines)`).join(", ")}; ${images} Figma images`);
} else {
  console.log(json);
}
