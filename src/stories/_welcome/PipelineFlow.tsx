import React from "react";
import { LOGOS } from "./logos";
import "./pipeline-flow.css";

type Status = "done" | "progress" | "planned";

type Lane = {
  id: string;
  title: string;
  status: Status;
  what: string;
  output: string;
  note: string;
};

type Node = {
  id: string;
  lane: number;
  x: number;
  y: number;
  logo: keyof typeof LOGOS;
  label: string;
  sub: string[];
  status: Status;
};

type Edge = {
  id: string;
  d: string;
  /** Lane at which this connection becomes active. */
  lane: number;
  kind?: "token" | "code" | "undecided";
};

const STATUS_LABEL: Record<Status, string> = {
  done: "Done",
  progress: "In progress",
  planned: "Planned",
};

const LANES: Lane[] = [
  {
    id: "planning",
    title: "Planning",
    status: "planned",
    what: "Work starts in the backlog as a request: a new component, or a change to one that exists. The backlog can live in Jira or in any other project management tool.",
    output: "A backlog item",
    note: "No backlog tool is connected yet. The backlog is kept by hand for the demo.",
  },
  {
    id: "design",
    title: "Design",
    status: "progress",
    what: "The component is created or changed in Figma. It uses shared colour and size tokens, and every interactive state is drawn.",
    output: "A Figma component with all its states",
    note: "Button and Input Field are finished. The other interactive components are next.",
  },
  {
    id: "audit",
    title: "Audit and hand-off",
    status: "progress",
    what: "RubyLint audits the component for tokens, states, accessibility and naming, then generates the documentation automatically: Markdown, a JSON contract and a Jira ticket for the developers.",
    output: "Markdown documentation, a JSON contract and a Jira ticket",
    note: "RubyLint runs by hand in Figma and has to be run again after the new states. The ticket is pasted into Jira by hand.",
  },
  {
    id: "build",
    title: "Build",
    status: "progress",
    what: "The React component is written to match the specification and the code already in the repository. Tokens come from Figma, and Code Connect links the code back to the design.",
    output: "Code in the GitHub repository",
    note: "Button now has a Loading state. All Code Connect links point at our Figma file.",
  },
  {
    id: "check",
    title: "Check and review",
    status: "progress",
    what: "Automated checks run on every change, then Storybook is rebuilt with one story for each state of the component.",
    output: "A live Storybook page for the component",
    note: "Storybook publishes on every change. The token check and the contract check still have to be written.",
  },
  {
    id: "truth",
    title: "Source of truth",
    status: "planned",
    what: "Supernova keeps the official record of tokens and components and shares it with everyone who needs it.",
    output: "One trusted place for the design system",
    note: "Our account is connected, but it is not linked to the Figma file yet. Its exact role is still to be decided.",
  },
];

const NODES: Node[] = [
  { id: "backlog", lane: 0, x: 100, y: 300, logo: "backlog", label: "Backlog", sub: ["Jira or any other", "project tool"], status: "planned" },
  { id: "figma", lane: 1, x: 300, y: 300, logo: "figma", label: "Figma", sub: ["Design file"], status: "progress" },
  { id: "rubylint", lane: 2, x: 500, y: 170, logo: "rubylint", label: "RubyLint", sub: ["Component audit and", "automatic docs", "Markdown, JSON, ticket"], status: "progress" },
  { id: "ticket", lane: 2, x: 500, y: 430, logo: "jira", label: "Jira ticket", sub: ["Specification"], status: "planned" },
  { id: "react", lane: 3, x: 700, y: 170, logo: "react", label: "React", sub: ["Component code"], status: "progress" },
  { id: "github", lane: 3, x: 700, y: 430, logo: "github", label: "GitHub", sub: ["Repository"], status: "done" },
  { id: "storybook", lane: 4, x: 900, y: 170, logo: "storybook", label: "Storybook", sub: ["Live docs"], status: "done" },
  { id: "actions", lane: 4, x: 900, y: 430, logo: "actions", label: "GitHub Actions", sub: ["Checks"], status: "done" },
  { id: "supernova", lane: 5, x: 1100, y: 300, logo: "supernova", label: "Supernova", sub: ["Source of truth"], status: "planned" },
];

// Vertical arrows start below the label of the tile above (or stop below it), so no arrow crosses text.
const EDGES: Edge[] = [
  { id: "e1", d: "M148 300 H250", lane: 1 },
  { id: "e2", d: "M348 290 C420 290 410 170 452 170", lane: 2 },
  { id: "e3", d: "M500 306 V378", lane: 2 },
  { id: "e4", d: "M548 424 C612 424 604 176 652 172", lane: 3 },
  { id: "e5", d: "M700 270 V378", lane: 3 },
  { id: "e6", d: "M748 430 H852", lane: 4 },
  { id: "e7", d: "M900 378 V272", lane: 4 },
  { id: "e8", d: "M948 170 C1020 170 1010 300 1052 300", lane: 5, kind: "undecided" },
  { id: "tokens", d: "M300 252 V84 H700 V122", lane: 3, kind: "token" },
  { id: "code", d: "M300 404 V580 H620 V440 H652", lane: 3, kind: "code" },
];

const HALF = 46;

function LogoMark({ node }: { node: Node }) {
  const logo = LOGOS[node.logo];
  const size = 48;
  const scale = size / 24;
  const fill = logo.color;
  return (
    <path
      d={logo.path}
      fill={fill}
      transform={`translate(${-size / 2} ${-size / 2 - 4}) scale(${scale})`}
    />
  );
}

export function PipelineFlow() {
  const [active, setActive] = React.useState(0);
  const [playing, setPlaying] = React.useState(false);
  const timer = React.useRef<number | undefined>(undefined);

  const stop = React.useCallback(() => {
    window.clearTimeout(timer.current);
    setPlaying(false);
  }, []);

  React.useEffect(() => () => window.clearTimeout(timer.current), []);

  const play = () => {
    stop();
    setPlaying(true);
    let i = 0;
    setActive(0);
    const tick = () => {
      i += 1;
      if (i >= LANES.length) {
        setPlaying(false);
        return;
      }
      setActive(i);
      timer.current = window.setTimeout(tick, 1700);
    };
    timer.current = window.setTimeout(tick, 1700);
  };

  const select = (index: number) => {
    stop();
    setActive(index);
  };

  const lane = LANES[active];

  return (
    <section className="pf" aria-label="Design system workflow">
      <div className="pf-bar">
        <p className="pf-hint">Select a stage to see what happens there, or press Play.</p>
        <button
          type="button"
          className="pf-play"
          onClick={playing ? stop : play}
          aria-pressed={playing}
        >
          {playing ? "Pause" : "Play"}
        </button>
      </div>

      <div className="pf-scroll">
        <div className="pf-canvas">
          <div className="pf-heads" role="tablist" aria-label="Workflow stages">
            {LANES.map((l, i) => (
              <button
                key={l.id}
                type="button"
                role="tab"
                aria-selected={i === active}
                className="pf-head"
                data-active={i === active}
                data-reached={i <= active}
                onClick={() => select(i)}
              >
                <span className="pf-head-num">{i + 1}</span>
                {l.title}
              </button>
            ))}
          </div>

          <svg
            className="pf-svg"
            viewBox="0 0 1200 640"
            role="img"
            aria-label="Workflow from the backlog and Figma, through RubyLint, React and GitHub, to Storybook and Supernova"
          >
            <defs>
              {(["default", "active", "token", "muted"] as const).map((k) => (
                <marker
                  key={k}
                  id={`pf-arrow-${k}`}
                  viewBox="0 0 10 10"
                  refX="8"
                  refY="5"
                  markerWidth="7"
                  markerHeight="7"
                  orient="auto-start-reverse"
                >
                  <path d="M1 1 L9 5 L1 9 z" className={`pf-arrow pf-arrow-${k}`} />
                </marker>
              ))}
            </defs>

            {LANES.map((l, i) => (
              <rect
                key={l.id}
                className="pf-lane"
                data-active={i === active}
                x={i * 200 + 6}
                y={8}
                width={188}
                height={624}
                rx={18}
              />
            ))}

            {EDGES.map((e) => {
              const reached = e.lane <= active;
              const marker =
                e.kind === "token"
                  ? reached
                    ? "token"
                    : "muted"
                  : e.kind === "undecided" || e.kind === "code"
                    ? "muted"
                    : reached
                      ? "active"
                      : "default";
              return (
                <path
                  key={e.id}
                  d={e.d}
                  pathLength={e.kind ? undefined : 1}
                  className="pf-edge"
                  data-kind={e.kind ?? "flow"}
                  data-reached={reached}
                  markerEnd={`url(#pf-arrow-${marker})`}
                />
              );
            })}

            <text className="pf-edge-label pf-edge-label-token" x={500} y={72} textAnchor="middle" data-reached={3 <= active}>
              DESIGN TOKENS
            </text>
            <text className="pf-edge-label" x={460} y={604} textAnchor="middle" data-reached={3 <= active}>
              CODE CONNECT
            </text>
            <text className="pf-edge-label" x={1100} y={232} textAnchor="middle" data-reached={5 <= active}>
              ROLE TO BE DECIDED
            </text>

            {NODES.map((n) => (
              <g
                key={n.id}
                transform={`translate(${n.x} ${n.y})`}
                className="pf-node"
                data-lane-active={n.lane === active}
                data-reached={n.lane <= active}
              >
                <title>{`${n.label}: ${n.sub.join(" ")} (${STATUS_LABEL[n.status]})`}</title>
                <g className="pf-node-inner">
                  <rect
                    className="pf-tile"
                    x={-HALF}
                    y={-HALF}
                    width={HALF * 2}
                    height={HALF * 2}
                    rx={18}
                  />
                  <LogoMark node={n} />
                  <circle className="pf-dot" data-status={n.status} cx={HALF - 8} cy={-HALF + 8} r={7} />
                </g>
                <text className="pf-label" y={HALF + 22} textAnchor="middle">
                  {n.label}
                </text>
                {n.sub.map((line, i) => (
                  <text key={line} className="pf-sub" y={HALF + 40 + i * 18} textAnchor="middle">
                    {line}
                  </text>
                ))}
              </g>
            ))}
          </svg>
        </div>
      </div>

      <ul className="pf-legend" aria-label="Status key">
        {(["done", "progress", "planned"] as Status[]).map((s) => (
          <li key={s}>
            <span className="pf-legend-dot" data-status={s} />
            {STATUS_LABEL[s]}
          </li>
        ))}
      </ul>

      <div className="pf-detail" key={lane.id} aria-live="polite">
        <h3 className="pf-detail-title">
          {active + 1}. {lane.title}
          <span className="pf-chip" data-status={lane.status}>
            {STATUS_LABEL[lane.status]}
          </span>
        </h3>
        <dl className="pf-facts">
          <div>
            <dt>What happens</dt>
            <dd>{lane.what}</dd>
          </div>
          <div>
            <dt>What comes out</dt>
            <dd>{lane.output}</dd>
          </div>
          <div>
            <dt>Where we are</dt>
            <dd>{lane.note}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
