import { LOGOS } from "./logos";
import "./hero.css";

const LINKS: { label: string; note: string; href: string; logo: keyof typeof LOGOS }[] = [
  {
    label: "GitHub repository",
    note: "Code, tokens and Storybook source",
    href: "https://github.com/titox/ds-pipeline-poc",
    logo: "github",
  },
  {
    label: "Figma design file",
    note: "The modified Simple Design System",
    href: "https://www.figma.com/design/huu1as0pMzvGdqqDpQ5JyE/Local-%E2%80%93-Simple-Design-System?node-id=128-10284",
    logo: "figma",
  },
  {
    label: "Supernova workspace",
    note: "Sign-in required",
    href: "https://app.supernova.io/832944-acme-ltd-u7pckvnl/897722-my-design-system/948367-shared-draft",
    logo: "supernova",
  },
  {
    label: "Upstream Figma SDS",
    note: "The open-source starting point",
    href: "https://github.com/figma/sds",
    logo: "github",
  },
];

export function Hero() {
  return (
    <header className="hero">
      <p className="hero-kicker">Start here</p>
      <h1 className="hero-title">Design system pipeline PoC</h1>
      <p className="hero-lead">
        A proof of concept that takes a component from Figma to checked, published code. It uses
        Figma, design tokens, RubyLint, Storybook and Code Connect, with Supernova planned as the
        source of truth.
      </p>
      <ul className="hero-links">
        {LINKS.map((l) => {
          const logo = LOGOS[l.logo];
          return (
            <li key={l.label}>
              <a className="hero-link" href={l.href} target="_blank" rel="noreferrer">
                <svg className="hero-link-icon" viewBox="0 0 24 24" aria-hidden="true">
                  <path d={logo.path} fill="currentColor" />
                </svg>
                <span>
                  <span className="hero-link-label">{l.label}</span>
                  <span className="hero-link-note">{l.note}</span>
                </span>
              </a>
            </li>
          );
        })}
      </ul>
      <p className="hero-next">The flow below shows how a component travels from design to code.</p>
    </header>
  );
}
