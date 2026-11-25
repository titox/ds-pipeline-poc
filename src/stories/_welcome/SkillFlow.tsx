import React from "react";
import { IconLink, IconMoon, IconRefreshCw, IconSun } from "icons";
import { LOGOS } from "./logos";
import "./skill-flow.css";

type ToolId = "figma" | "claude" | "storybook" | "supernova" | "github";
type PluginId = "rubylint" | "bridge" | "varsync";

/** "in": the tool adds to the design system. "out": the design system is published to the tool. */
type Dir = "in" | "out";

type Tool = {
  id: ToolId;
  label: string;
  /** Centre of the pill in the 1000 by 460 drawing. */
  x: number;
  y: number;
  /** Connector from the pill to the hub. */
  d: string;
  about: string;
};

type Plugin = { id: PluginId; label: string; about: string };

/** One stop of the walk. Stops that share a step number are parts of that step. */
type Frame = {
  id: string;
  /** Index into STEPS. */
  step: number;
  /** Set on the parts inside a step, for example "4.1". */
  part?: string;
  title: string;
  tools: Partial<Record<ToolId, Dir>>;
  plugins?: PluginId[];
  text: string;
  lists?: { heading: string; items: string[] }[];
};

const TOOLS: Tool[] = [
  {
    id: "storybook",
    label: "Storybook",
    x: 500,
    y: 48,
    d: "M500 48 V150",
    about: "The live component pages. The component is measured here, and the site is rebuilt on every change.",
  },
  {
    id: "claude",
    label: "Claude",
    x: 190,
    y: 110,
    d: "M190 110 V190 Q190 202 202 202 H425",
    about: "Runs the ship-component skill: it builds, checks and documents the component, and stops when it needs the designer.",
  },
  {
    id: "figma",
    label: "Figma",
    x: 810,
    y: 110,
    d: "M810 110 V190 Q810 202 798 202 H575",
    about: "Where the component is designed. It is the source of the tokens, the variants and the states.",
  },
  {
    id: "supernova",
    label: "Supernova",
    x: 190,
    y: 350,
    d: "M190 350 V270 Q190 258 202 258 H425",
    about: "Holds the tokens and the documentation site. Component pages arrive as unpublished drafts; the designer publishes.",
  },
  {
    id: "github",
    label: "GitHub",
    x: 500,
    y: 412,
    d: "M500 412 V310",
    about: "The repository: tokens, React components, stories, scorecards and the documentation source.",
  },
];

const PLUGINS: Plugin[] = [
  {
    id: "rubylint",
    label: "RubyLint",
    about: "The linter. The designer runs it by hand in Figma. It audits the component and creates its documentation and exports.",
  },
  {
    id: "varsync",
    label: "Supernova variables",
    about: "The Supernova plugin for Figma. The designer pushes the variables from it, so Supernova holds the same tokens as Figma.",
  },
  {
    id: "bridge",
    label: "Desktop Bridge",
    about: "Connects Claude to the open Figma file, so the skill can read every variant and make the fixes the designer approves.",
  },
];

const STEPS = ["Design in Figma", "Run the linter", "Synchronise the tokens", "Run the skill in Claude", "Publish"];

const FRAMES: Frame[] = [
  {
    id: "design",
    step: 0,
    title: "Design in Figma",
    tools: { figma: "in" },
    text: "The component is created or changed in Figma, with shared tokens and every state drawn.",
  },
  {
    id: "lint",
    step: 1,
    title: "Run the linter",
    tools: { figma: "in" },
    plugins: ["rubylint"],
    text: "The designer runs RubyLint on the component in Figma. The plugin audits it, the designer fixes what it finds, and the plugin then creates the documentation.",
  },
  {
    id: "lint-audit",
    step: 1,
    part: "2.1",
    title: "Audit",
    tools: { figma: "in" },
    plugins: ["rubylint"],
    text: "RubyLint checks the component against the design system rules and gives it a readiness score.",
    lists: [
      {
        heading: "It checks",
        items: [
          "States",
          "Design tokens",
          "Accessibility",
          "Platform guidelines",
          "Naming",
          "Properties and description",
          "Detached instances",
        ],
      },
      { heading: "It scores", items: ["Readiness", "Design system adoption"] },
    ],
  },
  {
    id: "lint-fix",
    step: 1,
    part: "2.2",
    title: "Fix the component",
    tools: { figma: "in" },
    plugins: ["rubylint"],
    text: "The designer fixes in Figma what the audit found, then runs the audit again until the component is ready.",
  },
  {
    id: "lint-create",
    step: 1,
    part: "2.3",
    title: "Create the documentation",
    tools: { figma: "in" },
    plugins: ["rubylint"],
    text: "RubyLint writes the documentation and the spec in Figma, and exports the files that the skill reads.",
    lists: [
      { heading: "In Figma", items: ["Figma documentation", "Figma spec"] },
      { heading: "Exported files", items: ["JSON contract", "Markdown", "Jira request"] },
    ],
  },
  {
    id: "tokens",
    step: 2,
    title: "Synchronise the tokens",
    tools: { figma: "in", supernova: "out" },
    plugins: ["varsync"],
    text: "The designer pushes the Figma variables to Supernova with the Supernova plugin for Figma.",
  },
  {
    id: "skill",
    step: 3,
    title: "Run the skill in Claude",
    tools: { claude: "in", figma: "in" },
    plugins: ["bridge"],
    text: "The designer sends the Figma link and the exports. The skill reads the component through Desktop Bridge, checks that the exports are current, and then does three things.",
  },
  {
    id: "build",
    step: 3,
    part: "4.1",
    title: "Build",
    tools: { claude: "in", github: "in" },
    plugins: ["bridge"],
    text: "The skill writes the code so that it matches every Figma variant.",
    lists: [{ heading: "It writes", items: ["Tokens", "React component", "Code Connect mapping", "Stories"] }],
  },
  {
    id: "check",
    step: 3,
    part: "4.2",
    title: "Check and score",
    tools: { claude: "in", storybook: "in", figma: "in" },
    plugins: ["bridge"],
    text: "Automated checks run, Storybook is compared with Figma, and an independent reviewer scores the component.",
    lists: [
      {
        heading: "If the scorecard fails",
        items: [
          "Nothing is documented",
          "A failure report says what to fix",
          "The design is fixed in Figma",
          "The skill goes back to Build",
        ],
      },
    ],
  },
  {
    id: "document",
    step: 3,
    part: "4.3",
    title: "Document",
    tools: { claude: "in", github: "in", supernova: "out" },
    text: "The skill writes the documentation text. The designer agrees it in a preview, and it goes to Supernova as a draft.",
  },
  {
    id: "publish",
    step: 4,
    title: "Publish",
    tools: { github: "in", storybook: "out", figma: "out", supernova: "out" },
    text: "The change is committed and Storybook is rebuilt. Code Connect shows the real code in Figma. The designer publishes the Supernova site.",
  },
];

function ToolMark({ id }: { id: ToolId | PluginId }) {
  if (id === "bridge") return <IconLink size="16" aria-hidden />;
  if (id === "varsync") return <IconRefreshCw size="16" aria-hidden />;
  const logo = LOGOS[id];
  const size = id === "rubylint" ? 16 : 20;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path d={logo.path} fill={id === "github" ? "currentColor" : logo.color} />
    </svg>
  );
}

export function SkillFlow() {
  const [index, setIndex] = React.useState(0);
  const [picked, setPicked] = React.useState<ToolId | PluginId | null>(null);
  // The diagram starts in the mode of the system and can be switched on its own.
  const [mode, setMode] = React.useState<"light" | "dark">(() =>
    typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light",
  );

  const go = (next: number) => {
    setPicked(null);
    setIndex(Math.max(0, Math.min(FRAMES.length - 1, next)));
  };

  const pick = (id: ToolId | PluginId) => {
    setPicked(picked === id ? null : id);
  };

  const frame = FRAMES[index];
  const parts = FRAMES.map((f, i) => ({ f, i })).filter(({ f }) => f.step === frame.step && f.part);
  const uses = (stepIndex: number, id: ToolId | PluginId) =>
    FRAMES.some((f) => f.step === stepIndex && (id in f.tools || Boolean(f.plugins?.includes(id as PluginId))));
  // A selected tool is explained on its own: the lines and the other pills go quiet.
  const toolPicked = TOOLS.some((t) => t.id === picked);
  const pluginPicked = PLUGINS.some((p) => p.id === picked);
  const about = picked ? [...TOOLS, ...PLUGINS].find((t) => t.id === picked) : undefined;

  return (
    <section className="sf" data-mode={mode} aria-label="How a component reaches the design system">
      <header className="sf-top">
        <div>
          <h2 className="sf-title">How a component reaches the design system</h2>
          <p className="sf-lede">Select a step, or select a tool to see where it is used.</p>
        </div>
        <button
          type="button"
          className="sf-mode"
          onClick={() => setMode(mode === "light" ? "dark" : "light")}
        >
          {mode === "light" ? <IconMoon size="16" aria-hidden /> : <IconSun size="16" aria-hidden />}
          {mode === "light" ? "Dark mode" : "Light mode"}
        </button>
      </header>

      <div className="sf-stage">
        <div className="sf-scroll">
          <div className="sf-canvas">
            <svg className="sf-svg" viewBox="0 0 1000 460" aria-hidden="true">
              {/* Tether from Figma to its plugins. */}
              <path
                className="sf-tether"
                d="M810 110 H928 Q940 110 940 122 V236"
                data-on={!toolPicked && (Boolean(frame.plugins?.length) || pluginPicked)}
              />
              {TOOLS.map((t) => (
                <path key={t.id} d={t.d} className="sf-edge" data-dir={toolPicked ? "off" : (frame.tools[t.id] ?? "off")} />
              ))}
            </svg>

            <div className="sf-hub" aria-hidden="true">
              <span className="sf-hub-ring" key={frame.id} />
              <span className="sf-hub-label">
                Design
                <br />
                System
              </span>
            </div>

            {TOOLS.map((t) => (
              <button
                key={t.id}
                type="button"
                className="sf-pill"
                data-on={!toolPicked && t.id in frame.tools}
                aria-pressed={picked === t.id}
                style={{ left: `${t.x / 10}%`, top: `${(t.y / 460) * 100}%` }}
                onClick={() => pick(t.id)}
              >
                <ToolMark id={t.id} />
                {t.label}
              </button>
            ))}

            <div className="sf-plugins" role="group" aria-label="Figma plugins">
              <span className="sf-plugins-label">Figma plugins</span>
              {PLUGINS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  className="sf-pill sf-plugin"
                  data-on={!toolPicked && Boolean(frame.plugins?.includes(p.id))}
                  aria-pressed={picked === p.id}
                  onClick={() => pick(p.id)}
                >
                  <ToolMark id={p.id} />
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>

      <ol className="sf-steps">
        {STEPS.map((title, i) => (
          <li
            key={title}
            className="sf-step"
            data-active={i === frame.step}
            data-done={i < frame.step}
            data-used={picked ? uses(i, picked) : undefined}
          >
            <button
              type="button"
              className="sf-step-head"
              aria-current={i === frame.step ? "step" : undefined}
              onClick={() => go(FRAMES.findIndex((f) => f.step === i))}
            >
              <span className="sf-step-num">{i + 1}</span>
              <span className="sf-step-title">{title}</span>
            </button>
          </li>
        ))}
      </ol>

      <div className="sf-detail" aria-live="polite">
        {about ? (
          <div className="sf-detail-body" key={about.id}>
            <h3 className="sf-detail-title">{about.label}</h3>
            <p>{about.about}</p>
          </div>
        ) : (
          <>
            {parts.length > 0 && (
              <div className="sf-parts" role="group" aria-label={`Parts of step ${frame.step + 1}`}>
                {parts.map(({ f, i }) => (
                  <button key={f.id} type="button" className="sf-part" aria-pressed={i === index} onClick={() => go(i)}>
                    {f.part} {f.title}
                  </button>
                ))}
              </div>
            )}
            <div className="sf-detail-body" key={frame.id}>
              <h3 className="sf-detail-title">
                {frame.part ? `${frame.part} ` : `${frame.step + 1}. `}
                {frame.title}
              </h3>
              <p>{frame.text}</p>
              {frame.lists?.map((list) => (
                <div className="sf-list" key={list.heading}>
                  <span className="sf-list-heading">{list.heading}</span>
                  <ul>
                    {list.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
