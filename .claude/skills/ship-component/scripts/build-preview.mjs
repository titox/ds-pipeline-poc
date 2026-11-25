#!/usr/bin/env node
// Builds the local documentation preview from a neutral source file.
//   node build-preview.mjs docs/pages/<Name>.md [storybook-origin]
// Writes docs/pages/<Name>.preview.html next to the source. The preview shows
// the content and structure of the page (tabs, cards, tables, do and don't),
// not the exact look of any documentation platform. Text marked data-edit can
// be changed in the page and saved through preview-server.mjs.
import fs from "node:fs";
import path from "node:path";

const src = process.argv[2];
const storybook = process.argv[3] || "http://localhost:6006";
if (!src) {
  console.error("usage: build-preview.mjs docs/pages/<Name>.md [storybook-origin]");
  process.exit(1);
}
const name = path.basename(src, ".md");
const text = fs.readFileSync(src, "utf8").replace(/\r\n/g, "\n");

// Exported illustrations (export-illustrations.mjs): node id -> file, and the
// alternative texts from the "## Images" table of the source.
const imgIndexPath = path.join(path.dirname(src), "img", "index.json");
const imgIndex = fs.existsSync(imgIndexPath) ? JSON.parse(fs.readFileSync(imgIndexPath, "utf8")).images : {};
const alts = Object.fromEntries([...text.matchAll(/^\|\s*(\d+:\d+)\s*\|\s*(.+?)\s*\|\s*$/gm)].map((m) => [m[1], m[2]]));
const illustration = (node, alt) => {
  const id = (node || "").trim();
  const hit = imgIndex[id];
  const a = (alt || alts[id] || "").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
  return hit
    ? `<img class="illustration" src="${hit.file}" alt="${a}" loading="lazy">`
    : `<div class="placeholder">Illustration not exported yet: Figma frame ${id || "missing"}</div>`;
};

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

// ---------- front matter
let body = text;
const meta = {};
if (text.startsWith("---\n")) {
  const end = text.indexOf("\n---\n", 4);
  for (const line of text.slice(4, end).split("\n")) {
    const m = line.match(/^([A-Za-z]+):\s*(.*)$/);
    if (m) meta[m[1]] = m[2].replace(/^"|"$/g, "");
  }
  body = text.slice(end + 5);
}

// ---------- inline text. Plain text can be edited; code and bold labels cannot
// be reworded as one piece, so each plain run gets its own editable span.
let editCount = 0;
let scope = "page";
const key = () => `${scope}.${++editCount}`;
const MIN_RUN = 12;

function inline(md, tag, attrs = "") {
  const parts = md.split(/(`[^`]+`|\*\*[^*]+\*\*)/).filter((p) => p !== "");
  const plain = parts.length === 1 && !/^(`|\*\*)/.test(parts[0]);
  if (plain) {
    const t = md.trim();
    return t ? `<${tag}${attrs} data-edit="${key()}">${esc(t)}</${tag}>` : `<${tag}${attrs}></${tag}>`;
  }
  const html = parts
    .map((p) => {
      if (p.startsWith("`")) return `<code>${esc(p.slice(1, -1))}</code>`;
      if (p.startsWith("**")) return `<strong>${esc(p.slice(2, -2))}</strong>`;
      const t = p.trim();
      if (t.length < MIN_RUN) return esc(p);
      const lead = p.match(/^\s*/)[0];
      const trail = p.match(/\s*$/)[0];
      return `${lead}<span data-edit="${key()}">${esc(t)}</span>${trail}`;
    })
    .join("");
  return `<${tag}${attrs}>${html}</${tag}>`;
}

// ---------- block parsing
const lines = body.split("\n");
let i = 0;
const tabs = []; // { title, html[] }
let out = null; // current html sink
let pending = null; // block marker waiting for content
let subtabs = null; // { panels: [{ title, html[] }] }
const push = (h) => (subtabs && subtabs.panels.length ? subtabs.panels.at(-1).html : out).push(h);

function closeSubtabs() {
  if (!subtabs) return;
  const id = `st${tabs.length}-${out.length}`;
  const buttons = subtabs.panels
    .map((p, n) => `<button type="button" role="tab" aria-selected="${n === 0}" data-sub="${id}-${n}">${esc(p.title)}</button>`)
    .join("");
  const panels = subtabs.panels
    .map((p, n) => `<div data-subpanel="${id}-${n}"${n ? " hidden" : ""}>${p.html.join("\n")}</div>`)
    .join("\n");
  const html = `<div class="subtabs" role="tablist">${buttons}</div>\n${panels}`;
  subtabs = null;
  out.push(html);
}

const cells = (line) => line.trim().replace(/^\||\|$/g, "").split("|").map((c) => c.trim());

function readTable() {
  const head = cells(lines[i]);
  i += 2; // header and separator
  const rows = [];
  while (i < lines.length && lines[i].trim().startsWith("|")) rows.push(cells(lines[i++]));
  return { head, rows };
}

const STATUS = { ready: "ok", passed: "ok", pending: "warn", "known issues": "warn", "not tested": "mute", missing: "bad" };
const LOGO = { figma: "Fg", storybook: "Sb", code: "</>", "figma preview": "▢" };

function renderTable({ head, rows }, type) {
  if (type === "cards") {
    const col = (r, n) => r[head.findIndex((h) => h.toLowerCase() === n)] || "";
    return `<div class="cards">${rows
      .map(
        (r) =>
          `<div class="card"><span class="logo" aria-hidden="true">${esc(LOGO[col(r, "logo").toLowerCase()] || "•")}</span><span>` +
          inline(col(r, "title"), "strong", ' class="card-title"') +
          inline(col(r, "subtitle"), "span", ' class="card-sub"') +
          `<span class="card-target">${inline(col(r, "target"), "span").replace(/ data-edit="[^"]+"/g, "")}</span></span></div>`,
      )
      .join("")}</div>`;
  }
  if (type === "do-dont") {
    return rows
      .map((r) => {
        const [doNode, dontNode] = r[2] && r[2] !== "none yet" ? r[2].split(",").map((x) => x.trim()) : [];
        return (
          `<div class="dodont"><div class="do">${illustration(doNode)}<span class="tag">Do</span>${inline(r[0], "p")}</div>` +
          `<div class="dont">${illustration(dontNode)}<span class="tag">Don't</span>${inline(r[1], "p")}</div></div>`
        );
      })
      .join("");
  }
  const statusCol = type === "status" ? head.findIndex((h) => h.toLowerCase() === "status") : -1;
  const th = head.map((h) => `<th>${esc(h)}</th>`).join("");
  const trs = rows
    .map(
      (r) =>
        `<tr>${r
          .map((c, n) =>
            n === statusCol ? `<td><span class="chip ${STATUS[c.toLowerCase()] || "mute"}">${esc(c)}</span></td>` : inline(c, "td"),
          )
          .join("")}</tr>`,
    )
    .join("\n");
  return `<div class="table-wrap"><table${type ? ` class="${type}"` : ""}><thead><tr>${th}</tr></thead><tbody>\n${trs}\n</tbody></table></div>`;
}

while (i < lines.length) {
  const line = lines[i];
  const t = line.trim();
  if (!t) {
    i++;
    continue;
  }
  if (t.startsWith("<!--")) {
    const start = i;
    while (!lines[i].includes("-->")) i++;
    const comment = lines.slice(start, i + 1).join(" ");
    const m = comment.match(/block:\s*([a-z-]+)/);
    if (m) pending = m[1];
    i++;
    if (pending === "tabs-in-page") {
      subtabs = { panels: [] };
      pending = null;
    }
    continue;
  }
  let m;
  if ((m = t.match(/^## Tab:\s*(.+)$/))) {
    closeSubtabs();
    tabs.push({ title: m[1], html: [] });
    out = tabs.at(-1).html;
    scope = slug(m[1]);
    i++;
    continue;
  }
  if (!out) {
    i++;
    continue;
  }
  if ((m = t.match(/^### (.+)$/))) {
    closeSubtabs();
    out.push(inline(m[1], "h2"));
    i++;
    continue;
  }
  if ((m = t.match(/^#### (.+)$/))) {
    if (subtabs) subtabs.panels.push({ title: m[1], html: [] });
    else out.push(inline(m[1], "h3"));
    i++;
    continue;
  }
  if (t.startsWith("```")) {
    const code = [];
    i++;
    while (i < lines.length && !lines[i].trim().startsWith("```")) code.push(lines[i++]);
    i++;
    push(`<pre><code>${esc(code.join("\n"))}</code></pre>`);
    pending = null;
    continue;
  }
  if (t.startsWith("|")) {
    push(renderTable(readTable(), pending));
    pending = null;
    continue;
  }
  if (/^(- |\d+\. )/.test(t)) {
    const ordered = /^\d+\. /.test(t);
    const items = [];
    while (i < lines.length && /^(- |\d+\. )/.test(lines[i].trim())) items.push(lines[i++].trim().replace(/^(- |\d+\. )/, ""));
    push(`<${ordered ? "ol" : "ul"}>${items.map((it) => inline(it, "li")).join("")}</${ordered ? "ol" : "ul"}>`);
    continue;
  }
  // one-line blocks and paragraphs
  if (pending === "storybook") {
    const url = `${storybook}/iframe.html?viewMode=story&id=${encodeURIComponent(t)}`;
    push(`<figure class="story"><iframe src="${url}" title="Storybook story" loading="lazy"></iframe><figcaption>Live story from Storybook: <code>${esc(t)}</code></figcaption></figure>`);
  } else if (pending === "image") {
    const node = (t.match(/Figma frame (\d+:\d+)/) || [])[1];
    const alt = t.replace(/\s*Figma frame \d+:\d+.*$/, "").replace(/\.$/, "");
    push(`<figure class="image">${illustration(node, alt)}<figcaption>${esc(alt)}</figcaption></figure>`);
  } else if (pending === "callout") {
    push(`<div class="callout">${inline(t, "p")}</div>`);
  } else if (pending === "contact") {
    const [title, sub, link] = t.split(",").map((s) => s.trim());
    push(`<div class="cards"><div class="card"><span class="logo" aria-hidden="true">T</span><span>${inline(title, "strong", ' class="card-title"')}${inline(sub || "", "span", ' class="card-sub"')}<span class="card-target">${esc(link || "")}</span></span></div></div>`);
  } else {
    push(inline(t, "p"));
  }
  pending = null;
  i++;
}
closeSubtabs();

// ---------- page
const tabButtons = tabs
  .map((tab, n) => `<button role="tab" id="t-${n}" aria-controls="p-${n}" aria-selected="${n === 0}"${n ? ' tabindex="-1"' : ""}>${esc(tab.title)}</button>`)
  .join("");
const tabPanels = tabs
  .map((tab, n) => `<section class="panel" role="tabpanel" id="p-${n}" aria-labelledby="t-${n}"${n ? " hidden" : ""}>\n${tab.html.join("\n")}\n</section>`)
  .join("\n");

const css = `
:root,[data-theme="light"]{--bg:#fff;--surface:#f5f5f5;--text:#1e1e1e;--muted:#5a5a5a;--rule:#d9d9d9;--accent:#2c2c2c;--ok:#14ae5c;--okbg:#ebffee;--warn:#975102;--warnbg:#fff8e5;--bad:#900b09;--badbg:#fee9e7;--mutebg:#e6e6e6}
[data-theme="dark"]{--bg:#1e1e1e;--surface:#2c2c2c;--text:#fff;--muted:#b3b3b3;--rule:#444;--accent:#f5f5f5;--ok:#85e0a3;--okbg:#024023;--warn:#ffe8a3;--warnbg:#522504;--bad:#fdd3d0;--badbg:#690807;--mutebg:#383838}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--text);font:16px/1.5 Inter,system-ui,sans-serif}
main{max-width:920px;margin:0 auto;padding:32px 24px 120px}
.top{display:flex;justify-content:space-between;align-items:flex-start;gap:16px}
h1{font-size:40px;line-height:1.2;margin:0 0 8px}.summary{color:var(--muted);margin:0 0 24px;font-size:18px}
.banner{background:var(--surface);border:1px solid var(--rule);border-radius:8px;padding:10px 14px;font-size:14px;color:var(--muted);margin-bottom:24px}
h2{font-size:24px;line-height:1.2;margin:40px 0 12px}h3{font-size:18px;margin:24px 0 8px}p{margin:0 0 12px;max-width:70ch}li{margin:4px 0;max-width:70ch}
code{font:14px/1.4 ui-monospace,Menlo,monospace;background:var(--surface);border-radius:4px;padding:1px 5px}
pre{background:var(--surface);border:1px solid var(--rule);border-radius:8px;padding:16px;overflow:auto}pre code{background:none;padding:0}
.tabs,.subtabs{display:flex;gap:4px;border-bottom:1px solid var(--rule);margin-bottom:8px}
.tabs button,.subtabs button{font:inherit;color:var(--muted);background:none;border:0;border-bottom:2px solid transparent;padding:10px 14px;cursor:pointer}
.tabs button[aria-selected="true"],.subtabs button[aria-selected="true"]{color:var(--text);border-bottom-color:var(--accent);font-weight:600}
.subtabs{margin-top:8px}.subtabs button{padding:6px 12px;font-size:14px}
button:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
.table-wrap{overflow-x:auto;margin:8px 0 16px}table{border-collapse:collapse;width:100%;font-size:15px}
th,td{text-align:left;vertical-align:top;padding:10px 12px;border-bottom:1px solid var(--rule)}th{font-weight:600;color:var(--muted);font-size:13px;text-transform:uppercase;letter-spacing:.04em}
.chip{display:inline-block;border-radius:999px;padding:2px 10px;font-size:13px;font-weight:600;white-space:nowrap}
.chip.ok{background:var(--okbg);color:var(--ok)}.chip.warn{background:var(--warnbg);color:var(--warn)}.chip.bad{background:var(--badbg);color:var(--bad)}.chip.mute{background:var(--mutebg);color:var(--muted)}
[data-theme="light"] .chip.ok{color:#02542d}
.cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px;margin:8px 0 16px}
.card{display:flex;gap:12px;align-items:flex-start;border:1px solid var(--rule);border-radius:8px;padding:14px;height:100%}
.logo{flex:none;width:36px;height:36px;border-radius:8px;background:var(--surface);display:grid;place-items:center;font-weight:700;font-size:13px}
.card-title,.card-sub,.card-target{display:block}.card-sub{color:var(--muted);font-size:14px}.card-target{color:var(--muted);font-size:12px;margin-top:4px}
.dodont{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:8px 0}.dodont>div{border:1px solid var(--rule);border-top-width:4px;border-radius:8px;padding:14px}
.do{border-top-color:var(--ok)!important}.dont{border-top-color:var(--bad)!important}.tag{font-weight:700;font-size:13px;text-transform:uppercase;letter-spacing:.04em}.dodont p{margin:6px 0 0}
.note{color:var(--muted);font-size:13px}.callout{border-left:4px solid var(--accent);background:var(--surface);border-radius:0 8px 8px 0;padding:12px 16px;margin:8px 0}.callout p{margin:0}
figure{margin:8px 0 16px}figcaption{color:var(--muted);font-size:13px;margin-top:6px}
.illustration{display:block;width:100%;height:auto;border-radius:8px;border:1px solid var(--rule);margin-bottom:10px}figure.image .illustration{max-width:640px}
.placeholder{border:1px dashed var(--rule);border-radius:8px;height:160px;display:grid;place-items:center;color:var(--muted);background:var(--surface)}
.story iframe{width:100%;height:220px;border:1px solid var(--rule);border-radius:8px;background:var(--bg)}
.theme{font:inherit;font-size:14px;background:none;color:var(--text);border:1px solid var(--rule);border-radius:8px;padding:6px 12px;cursor:pointer;white-space:nowrap}
@media (max-width:600px){.dodont{grid-template-columns:1fr}h1{font-size:30px}}
`;

const js = `
const tabs=[...document.querySelectorAll('.tabs [role=tab]')];
function show(n){tabs.forEach((t,k)=>{t.setAttribute('aria-selected',k===n);t.tabIndex=k===n?0:-1;document.getElementById(t.getAttribute('aria-controls')).hidden=k!==n});}
tabs.forEach((t,n)=>{t.addEventListener('click',()=>show(n));t.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){const k=(n+(e.key==='ArrowRight'?1:tabs.length-1))%tabs.length;show(k);tabs[k].focus();}});});
document.querySelectorAll('.subtabs').forEach(g=>{const bs=[...g.querySelectorAll('button')];bs.forEach(b=>b.addEventListener('click',()=>bs.forEach(x=>{const on=x===b;x.setAttribute('aria-selected',on);document.querySelector('[data-subpanel="'+x.dataset.sub+'"]').hidden=!on;})));});
const root=document.documentElement,btn=document.querySelector('.theme');
function theme(v){root.dataset.theme=v;btn.textContent=v==='dark'?'Light mode':'Dark mode';}
theme(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');btn.addEventListener('click',()=>theme(root.dataset.theme==='dark'?'light':'dark'));
`;

const html = `<!doctype html>
<html lang="en" data-page="${esc(name)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(meta.component || name)}: documentation preview</title>
<style>${css}</style>
</head>
<body>
<main>
<div class="banner">Preview of the documentation text and structure, built from <code>docs/pages/${esc(name)}.md</code>. Click any outlined text to change it, then press "Save edits". Code, token names and measured values are not editable here.</div>
<div class="top"><div><h1>${esc(meta.component || name)}</h1>${meta.summary ? inline(meta.summary, "p", ' class="summary"') : ""}</div><button type="button" class="theme"></button></div>
<div class="tabs" role="tablist" aria-label="${esc(meta.component || name)} documentation">${tabButtons}</div>
${tabPanels}
</main>
<script>${js}</script>
<script src="/__editable.js"></script>
</body>
</html>
`;

const dest = path.join(path.dirname(src), `${name}.preview.html`);
fs.writeFileSync(dest, html);
console.log(`wrote ${dest} (${tabs.length} tabs, ${editCount} editable texts)`);
