import React from "react";
import { IconChevronDown, IconLink, IconMoon, IconRefreshCw, IconSun } from "icons";
import { LOGOS } from "./logos";
import "./skill-flow.css";

type ToolId = "figma" | "claude" | "storybook" | "supernova" | "github";
type PluginId = "rubylint" | "bridge" | "varsync";

/** "in": the tool adds to the design system. "out": the design system is published to the tool. */
type Dir = "in" | "out";

type OwnerId = "designer" | "ds-team" | "dev-team" | "ds-lead";

/** Each owner has its own chip colour (see skill-flow.css). */
const OWNERS: Record<OwnerId, string> = {
  designer: "Designer",
  "ds-team": "Design system team",
  "dev-team": "Development team",
  "ds-lead": "Design system lead",
};

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
  /** Who owns this step in the real process. */
  owners: OwnerId[];
  /** What the PoC does differently in this step, if anything. */
  poc?: string;
  /** The quality check that happens in this step, if any. */
  check?: string;
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
    about: "Runs the ship-component skill: it generates the illustrations, builds, checks and documents the component, and stops when it needs a person. The build belongs to the development team; the skill does it here for the demo.",
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
    about: "Holds the tokens and the documentation site. Component pages arrive as unpublished drafts and are published after the design system lead approves them.",
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
    about: "Connects Claude to the open Figma file, so the skill can read every variant, draw the illustrations and make the fixes the designer approves.",
  },
];

const STEPS = ["Design in Figma", "Run the linter", "Synchronise the tokens", "Build and document", "Publish"];

const FRAMES: Frame[] = [
  {
    id: "design",
    step: 0,
    title: "Design in Figma",
    tools: { figma: "in" },
    owners: ["designer"],
    text: "The component is created or changed in Figma, with shared tokens and every state drawn.",
  },
  {
    id: "lint",
    step: 1,
    title: "Run the linter",
    tools: { figma: "in" },
    plugins: ["rubylint"],
    owners: ["designer"],
    text: "The designer runs RubyLint on the component in Figma. The plugin audits it, the designer fixes what it finds, and the plugin then creates the documentation. The illustrations are generated from that documentation, and everything goes to the developers on a Jira story.",
  },
  {
    id: "lint-audit",
    step: 1,
    part: "2.1",
    title: "Audit",
    tools: { figma: "in" },
    plugins: ["rubylint"],
    owners: ["designer"],
    check: "Design audit, done by the plugin",
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
    owners: ["designer"],
    text: "The designer fixes in Figma what the audit found, then runs the audit again until the component is ready.",
  },
  {
    id: "lint-create",
    step: 1,
    part: "2.3",
    title: "Create the documentation",
    tools: { figma: "in" },
    plugins: ["rubylint"],
    owners: ["designer"],
    text: "RubyLint writes the documentation and the spec in Figma, and exports the files that the skill reads.",
    lists: [
      { heading: "In Figma", items: ["Figma documentation", "Figma spec"] },
      { heading: "Exported files", items: ["JSON contract", "Markdown"] },
    ],
  },
  {
    id: "lint-illustrations",
    step: 1,
    part: "2.4",
    title: "Generate the illustrations",
    tools: { claude: "in", figma: "out" },
    plugins: ["bridge"],
    owners: ["designer"],
    text: "The do and don't pairs are only known once the documentation exists. They are drawn automatically from it, with the anatomy diagram, on a documentation page in Figma, and exported as images.",
    lists: [{ heading: "It creates", items: ["Do and don't frames", "Anatomy diagram", "Image files"] }],
  },
  {
    id: "lint-review",
    step: 1,
    part: "2.5",
    title: "Review the draft and the images",
    tools: { figma: "in" },
    owners: ["designer"],
    check: "Review by the designer who made the component, before the hand-off",
    text: "The designer reads the first draft and looks at every image. Nothing goes to the developers before this.",
  },
  {
    id: "lint-handoff",
    step: 1,
    part: "2.6",
    title: "Hand off in Jira",
    tools: { claude: "in" },
    owners: ["ds-team", "dev-team"],
    text: "A Jira story is created for the development team. It carries the whole specification. In the real process a daily job creates it; in this PoC the files are put in one folder and attached by hand.",
    lists: [{ heading: "Attached to the story", items: ["JSON contract", "Markdown", "Images"] }],
  },
  {
    id: "tokens",
    step: 2,
    title: "Synchronise the tokens",
    tools: { figma: "in", supernova: "out" },
    plugins: ["varsync"],
    owners: ["designer"],
    text: "The designer pushes the Figma variables to Supernova with the Supernova plugin for Figma.",
  },
  {
    id: "skill",
    step: 3,
    title: "Build and document",
    tools: { claude: "in", figma: "in" },
    plugins: ["bridge"],
    owners: ["dev-team", "ds-team"],
    text: "In the real process the development team builds the component from the Jira story, with its own coding and code review agents. In this PoC the skill in Claude does it, so the demo shows the whole path: the designer sends the Figma link and the skill builds, checks and documents.",
  },
  {
    id: "build",
    step: 3,
    part: "4.1",
    title: "Build",
    tools: { claude: "in", github: "in" },
    plugins: ["bridge"],
    owners: ["dev-team"],
    poc: "The skill does it, for the demo only.",
    text: "The code is written so that it matches every Figma variant.",
    lists: [{ heading: "It writes", items: ["Tokens", "React component", "Code Connect mapping", "Stories"] }],
  },
  {
    id: "check",
    step: 3,
    part: "4.2",
    title: "Check and score",
    tools: { claude: "in", storybook: "in", figma: "in" },
    plugins: ["bridge"],
    owners: ["dev-team"],
    poc: "The skill does it, for the demo only.",
    check: "Automated checks and code review. In the PoC an independent reviewer scores the component.",
    text: "Automated checks run, Storybook is compared with Figma, and the code is reviewed.",
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
    id: "design-check",
    step: 3,
    part: "4.3",
    title: "Design check",
    tools: { storybook: "in", figma: "in" },
    owners: ["designer"],
    check: "The designer compares the built component in Storybook with Figma. Required before the merge.",
    text: "The designer looks at the built component next to the design and says whether it matches. In the real process this is an approval on the library pull request, beside the developer's code review.",
  },
  {
    id: "document",
    step: 3,
    part: "4.4",
    title: "Document",
    tools: { claude: "in", github: "in", supernova: "out" },
    owners: ["ds-team"],
    check: "The designer agrees the text in a preview",
    text: "The documentation is written in two parts. Usage and design come from Figma and can be drafted before the build. The code part needs the released library and Storybook, so it is added after the merge. The page goes to Supernova as an unpublished draft.",
    lists: [
      { heading: "Before the build", items: ["Usage", "Design", "Illustrations"] },
      { heading: "After the merge", items: ["Code and accessibility"] },
    ],
  },
  {
    id: "publish",
    step: 4,
    title: "Publish",
    tools: { github: "in", storybook: "out", figma: "out", supernova: "out" },
    owners: ["dev-team", "ds-lead"],
    check: "The design system lead approves the documentation draft before it is published",
    text: "The merge releases a new library version and rebuilds Storybook. Code Connect shows the real code in Figma. The documentation is published once the design system lead has approved it.",
  },
];

/** Owner chips, one colour for each owner, and a quality check chip when the step has a check. */
function Chips({ frame }: { frame: Frame }) {
  return (
    <span className="sf-chips">
      {frame.owners.map((o) => (
        <span key={o} className="sf-chip" data-owner={o}>
          {OWNERS[o]}
        </span>
      ))}
      {frame.check && (
        <span className="sf-chip" data-kind="check">
          Quality check
        </span>
      )}
    </span>
  );
}

/** The facts of one step or part: its text, then the quality check, the PoC note and the lists as rows. */
function Facts({ frame }: { frame: Frame }) {
  const rows = [
    ...(frame.check ? [{ heading: "Quality check", text: frame.check }] : []),
    ...(frame.poc ? [{ heading: "In this PoC", text: frame.poc }] : []),
    ...(frame.lists ?? []).map((list) => ({ heading: list.heading, text: list.items.join(", ") })),
  ];
  return (
    <>
      <p>{frame.text}</p>
      {rows.length > 0 && (
        <dl className="sf-rows">
          {rows.map((row) => (
            <React.Fragment key={row.heading}>
              <dt>{row.heading}</dt>
              <dd>{row.text}</dd>
            </React.Fragment>
          ))}
        </dl>
      )}
    </>
  );
}

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
  const stepIndex = FRAMES.findIndex((f) => f.step === frame.step);
  const stepFrame = FRAMES[stepIndex];
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
            {/* The step on top, then one row for each part; one part is open at a time. */}
            <div className="sf-detail-body" key={frame.step}>
              <h3 className="sf-detail-title">
                <span>
                  {frame.step + 1}. {stepFrame.title}
                </span>
                <Chips frame={stepFrame} />
              </h3>
              <Facts frame={stepFrame} />
              {parts.length > 0 && (
                <div className="sf-acc">
                  {parts.map(({ f, i }) => (
                    <div className="sf-acc-item" key={f.id} data-open={i === index}>
                      <button
                        type="button"
                        className="sf-acc-head"
                        aria-expanded={i === index}
                        onClick={() => go(i === index ? stepIndex : i)}
                      >
                        <span className="sf-acc-num">{f.part}</span>
                        <span className="sf-acc-title">{f.title}</span>
                        <Chips frame={f} />
                        <IconChevronDown size="16" aria-hidden />
                      </button>
                      {i === index && (
                        <div className="sf-acc-panel">
                          <Facts frame={f} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
