# Design system pipeline PoC

## In one minute

We are testing whether a design system can move from a Figma file to working code without anyone copying things by hand. A designer changes a component in Figma. A check scores it. Developers get a clear specification. The code is built, tested and shown in this Storybook. A tool called Supernova is meant to hold the official version of everything.

The test covers web only, built with React. It uses two brands, each with a light and a dark mode, so four looks in total. It starts from Figma's open Simple Design System, which we have changed to suit the demo.

The demo will be a recorded video, not a live run. Several steps depend on plugins and external tools, and a recording avoids surprises on the day.

## How a component travels

Click a step in the diagram above, or press Play to walk through it. The table has the same information in text.

| Step | What happens | Who does it | What comes out |
|---|---|---|---|
| 1. Planning | Work starts in the backlog: a new component, or a change to an existing one. The backlog can be Jira or any other project management tool. | Product owner | A backlog item |
| 2. Design | A component is created or changed in Figma, using shared colour and size tokens instead of loose values. | Designer | A Figma component with all its states |
| 3. Audit and hand-off | RubyLint audits the component for tokens, states, accessibility and naming, and generates the documentation automatically. | Designer | Markdown documentation, a JSON contract and a Jira ticket |
| 4. Build | The React component is written to match the specification and the existing code style. Tokens come from Figma and Code Connect links the code to the design. | Developer | Code in the GitHub repository |
| 5. Check and review | Automated checks run, then Storybook is rebuilt and published. | Automated | A live Storybook page for the component |
| 6. Source of truth | Supernova keeps the official record of tokens and components. | Design system team | One place everyone can trust |

## Where we are

| Area | Status | In plain words |
|---|---|---|
| Repository and published Storybook | Done | The code lives on GitHub and this Storybook updates automatically. |
| Reading the Figma file | Done | We know what is in it: 347 variables, 78 component sets and 1,772 components, mostly icons. |
| Button and Input Field states | Done | Button now has a Loading state. Input Field now has Hover and Focus. A new focus colour token ties Figma to the code. |
| Code Connect links | Done | All 96 component links point at our Figma file, and each target was checked. They are not published to Figma yet. |
| Storybook 10 with AI support | Done | The upgrade works and an assistant can now read and preview stories. |
| Other components | In progress | The same set of states still has to be added to the rest of the interactive components. |
| RubyLint documentation | Done for Buttons and Inputs | The designer audits each component by hand in the Figma plugin. The exports for all 16 components on the Buttons and Inputs pages are in the repository. |
| Automated checks | Done | A token check, a contract check and code quality rules run on every change and compare the code with the Figma specification. |
| Component review (rubric) | In progress | An independent reviewer scores each coded component against six criteria. Button passed in the third round. The other components are next. |
| Supernova | In progress | Connected. It is linked to the Figma file and to the Storybook, and now holds the Figma variables with their Light and Dark values. Its data is current as of 24 November. It has no documented components yet. Its place in the flow is still undecided. |
| iOS and Android | Out of scope | Not part of this test. |

## What we decided and why

- **React only for now.** One platform is enough to prove the pipeline. Other platforms can follow once it works.
- **Two brands, each with light and dark.** One extra brand shows that theming works without multiplying the effort for every new brand. The second brand uses a made-up colour palette with no real branding.
- **Brand lives in its own Figma collection.** Light and dark are separate from brand, so adding a brand later does not touch the existing modes.
- **Every interactive component gets the same states.** Default, Hover, Focus and Disabled. Form fields also get Error. Buttons also get Loading. Pressed and Active are left out.
- **The code is checked against the Figma contract.** A script in the build will compare what the code offers with what the RubyLint contract says. Without it, "tested" would only mean "it displays".
- **The audit is done by hand.** The designer runs RubyLint in the Figma plugin, looks at the component and reads the result. This gives more judgement and precision than an unattended run.
- **Finished code is scored by someone who did not write it.** A reviewer with no knowledge of the build conversation scores each component against a written rubric. It needs evidence for every pass.
- **The Figma file belongs to the designer.** Nothing is changed in Figma without a clear yes for that specific change.
- **Supernova's place is still open.** It could read from Figma and feed the code, or it could sit at the end as a publishing portal. We have not chosen yet.
- **The repository is public and anonymous.** No client or personal names appear in the code, the history or these pages.

## Risks and open questions

- **Supernova is the least tested link.** It is the final step of the demo and the one we know least about.
- **Tokens and components have to move together.** A new component often needs new tokens, so the token sync needs its own step in the demo.
- **The focus colour is the same red as error states.** A focused field and an invalid field look alike. A separate colour is worth choosing.
- **The token file is out of date.** It contains a third colour mode that the Figma copy does not have. A full export will bring them back in line.
- **Where the RubyLint documents are stored is undecided.** They could sit in the repository or in Storybook pages.
- **Publishing is occasionally flaky.** The deploy step sometimes fails with an "artifact not found" error. Running it again fixes it.

---

## Technical runbook

The rest of this page is for designers and developers who need to repeat or extend the work. Each section says what we did, how to repeat it and how to check it. Placeholders: `<account>` is the GitHub account, `<repo>` the repository name, `<FIGMA_FILE_KEY>` the Figma file key.

## Detailed status

| # | Step | Status |
|---|------|--------|
| 1 | Clone SDS and publish to own GitHub | Done |
| 2 | Publish Storybook on GitHub Pages | Done |
| 3 | Anonymise repo, URLs and history | Done |
| 4 | Update the welcome story | Done |
| 5 | Read the Figma system | Done |
| 6 | Project rules (`CLAUDE.md`) | Done |
| 7 | Token lint | Next |
| 8 | Repoint Code Connect to the modified Figma file | Planned |
| 9 | Fix type errors (`Button.tsx`, `Tag.figma.ts`) | Planned |
| 10 | Multi-theming: Brand collection, `data-brand` + `data-theme`, Storybook switches | Planned |
| 11 | RubyLint documentation export | Planned (destination TODO) |
| 12 | Contract check: RubyLint JSON vs code props and tokens, run in CI | Planned |
| 13 | Demo scenarios: update an existing component and create a new one | Planned |
| 14 | Record the demo as a video (no live demo) | Planned |
| 15 | Supernova as source of truth | In progress: workspace connected and linked to Figma and Storybook; token import incomplete; position in the flow undecided |

| 5b | Improve the Figma file first: audit every component with RubyLint, add missing states, regenerate documentation | In progress |
| 16 | Later, once everything else is done: improve Figma, Storybook, Code Connect and add interactive prototyping | Parked |

## Figma improvement pilot (Button, Input Field)

State standard for interactive components: Default, Hover, Focus, Disabled, plus Error for form fields and Loading for buttons.
Pressed and Active are out of scope. Selected states such as Tab "Active" stay.

Done so far:
- Button: added `State=Loading` (spinner icon before the label, end icon hidden), 6 variants.
- Input Field: added `State=Hover` (`Border/Default/Secondary`) and `State=Focus`, 2 variants each.
- New token `Border/Focus/Default` (Color collection, Light and Dark, stroke scope, code syntax `--sds-color-border-focus-default`).
  Reason: Button Focus used `Icon/Danger/Tertiary`, an icon status token, as a ring colour. Button Focus and Input Focus now use the new token; the look is unchanged.

- `theme.css` regenerated: `border.focus.default` was added to `scripts/tokens/tokens.json` by a targeted edit, then `node app.mjs --skip-rest-api` (run from `scripts/tokens`, with `FIGMA_FILE_KEY` set) produced `--sds-color-border-focus-default`.
  Caveat: the committed `tokens.json` has a third Color mode (`brand_b_light`) that the Figma copy lacks, so it is out of sync. A full re-export with `scripts/tokens/figma-plugin-token-json` is needed to resync.

Still to do for the pilot: re-run RubyLint (manual, in Figma) to regenerate the handoff text, then update Code Connect and Storybook.

## Workflow: a component is created or updated in Figma

Repeat this for every new or changed component. Names in `<>` are placeholders.

1. **Design in Figma.** Use token variables only (no raw colours or sizes). Follow the state standard: Default, Hover, Focus, Disabled, plus Error for form fields and Loading for buttons.
2. **Audit with RubyLint, by hand.** The designer runs the plugin in Figma, reviews the result and fixes what it flags. Export the Markdown spec and the JSON contract for each component into one folder (file names `<component-name>-markdown.md` and `<component-name>-json.json`). They are then copied into `docs/components/` as `<Name>.md` and `<Name>.contract.json` and committed. A terminal runner exists (`npm run rubylint`, see `scripts/rubylint/README.md`) but it is not used for audits: the manual run is the standard.
3. **Sync tokens if any variable changed.** Re-export the tokens with the plugin in `scripts/tokens/figma-plugin-token-json` into `scripts/tokens/tokens.json`, then run `npm run script:tokens` (add `--skip-rest-api` when using the plugin JSON). Review the `src/theme.css` diff.
4. **Build or update the React component** in `src/ui/primitives/<Component>/`, following `src/AGENTS.md`. Props must match the Figma component properties. States map to CSS pseudo-classes, `disabled` and `aria-*`, not to extra components.
5. **Update Code Connect** in `src/figma/primitives/<component>/<Component>.figma.ts`:
   - New component: add a `<FIGMA_..._...>` entry with the Figma URL and node ID in `figma.config.json`, and reference it in the template header (`url=`).
   - Changed component: update the property mappings (`getEnum`, `getBoolean`, `getString`, `getInstanceSwap`) to match renamed, added or removed Figma properties.
   - Point the `source=` header at this repository, not the upstream one (to do: the existing templates still reference upstream).
6. **Update Storybook** in `src/stories/primitives/<Component>.stories.tsx`: one story per variant and state, so the stories are the visual contract.
7. **Check.** `npm run lint:tokens` and `npm run check:contracts` must pass (both run in CI). The contract check compares each `docs/components/*.contract.json` with its Code Connect mapping, the React component props (TypeScript) and `src/theme.css`. Errors: Code Connect maps a Figma property or option that no longer exists, writes a prop the component does not accept, or a Figma token is missing from `theme.css`. Warnings: unmapped Figma properties, no Code Connect file, hard-coded values in Figma.
7b. **Score the component with the rubric** (`eval/rubric.md`). A fresh reviewer that has not seen the build follows `eval/reviewer-brief.md`, measures the six criteria in a real browser (checks, properties, states, visual match, accessibility, themes) and writes `eval/scorecards/<Name>.md` with screenshots. Fix what fails and score again, three rounds at most. If the code matches Figma but the design itself fails, it goes back to the designer.
8. **Publish Code Connect:** `npx figma connect publish` (needs a Figma API token with the Code Connect write scope; set it locally, never commit it). Verify in Figma Dev Mode that the code snippet shows for the component.
9. **Write the component description, only once the component is complete** (all states of the standard, React component, Code Connect). Add a `## <Figma name>` section to `docs/components/DESCRIPTIONS.md`, run `npm run descriptions -- <figma file link>` to write it to Figma, then re-run `npm run rubylint` so the Markdown and Jira specs show it. Incomplete components keep no description. Dev resources: `npm run script:dev-resources` (REST API only).
10. **Commit and push** with the neutral identity (`DS PoC`), then check the Pages deploy. Re-run it if it fails with "No artifacts named github-pages".
11. **Update this runbook** if the process changed, and record the component in the status table.

Remap status: all 97 URLs in `figma.config.json` now point at the local Figma file. Verifying that every node ID exists in that file is pending (needs the Figma bridge).

## Tooling upgrades

- Storybook upgraded from 8.6 to 10.6.8 (`npx storybook@latest upgrade`), with `@storybook/addon-mcp` added. Leftover v8 packages removed. Build passes.
- MCP endpoint: `http://localhost:6006/mcp`, only while `npm run storybook` runs. Not registered in Claude Code yet (`claude mcp add --transport http storybook http://localhost:6006/mcp`).
- Playwright installed (`@playwright/test`, `playwright.config.ts`, example spec in `tests/`). Not used yet. Plan: add `@storybook/addon-vitest` (peer of the MCP addon) and axe checks once Button and Input stories have the new states.
- Registry note: always install with `npm_config_registry=https://registry.npmjs.org/`, otherwise a corporate registry URL ends up in `package-lock.json`.

## Next session

Start: reopen the Desktop Bridge plugin in the Figma file, start Storybook (`npm run storybook`), then `npm run lint` to see the current state. Last commit: `d9769bb`, pushed and deployed.

**Done on 2026-11-25: the workflow skill (`ship-component`) is built and was run on Input Field. See "Done on 2026-11-25 (afternoon)" below. Checkbox Field followed the same evening. Next: run the skill on the rest of the Inputs page, and set up the second documentation platform (Docusaurus) from the same `docs/pages/` sources.**

The shape the skill was planned with:

1. The designer sends the Figma link of the component.
2. The skill asks for the three manual exports: JSON contract, Markdown and Jira request. The audit itself stays manual.
3. It runs the workflow (tokens, component, Code Connect, story, checks, review) and sends short progress notes on what it is doing.
4. It checks Storybook against Figma: properties, options, defaults and states. It fixes the stories and lists what only a design or code change can fix. First run of this check: `docs/consistency-storybook-figma.md`.
5. It writes the documentation from Figma, the code and the review only, and shows it as a local HTML preview. The designer can edit the text in that preview. The edited version is what goes to Supernova. First version of the preview, not yet editable: `docs/supernova/Button.preview.html`.
6. It ends with a summary of every change and links to Storybook, GitHub and Supernova.

Fixed rules inside the skill: a separate yes before any change in Figma; the credit cost stated before any write to Supernova; publishing stays with the designer.

The documentation template the skill should produce, as agreed on the Button page: three tabs (Usage, Design, Code and accessibility); a health bar with the statuses behind it; links as cards with a logo; do and don't with illustrations made in Figma; an anatomy illustration; a changelog with date, version and notes; related reading; a contact card; and a row on the status board.

**Open after today:**

0. Button. Done: aligned with Figma, review passed, documented in Supernova, stories aligned with Figma. Still to do: publish Code Connect (`npx figma connect publish`), then set its status to "Published" in Supernova. Waiting for the stakeholder's feedback on the Button documentation. Open design decisions: how Loading is announced and whether the spinner moves, whether a Button should accept a link (`href`) at all, the faint Subtle hover border (1.4:1), disabled text contrast in light (1.49:1), the stale Figma description (says 24 variants, there are 30), the Focus and Loading variants not connected to the component properties, and Button Danger focus still using `Icon/Danger/Tertiary`.

0a. Button documentation in Supernova, before it counts as final: verify or replace the five related reading links (they were suggested from memory); replace the placeholder Teams link; decide whether the links that contain the GitHub account name may stay; check that the hourly Storybook import has brought in the new stories (at the last check, 25 November, "Textarea States" had not arrived); set up the top bar sections in the Supernova app, which cannot be done from here.

0b. From the Storybook and Figma check, needing a design or code decision: Date Input Field and Date Picker Field have no React component; Destructive Icon Button has no design in Figma; `orientation` on Checkbox Group and Radio Group is not supported by the code; Loading is accepted by Button Danger and Icon Button in code but not designed; four small inconsistencies inside Figma (listed at the end of the report).

0c. To look at: `IconButton.tsx` passes its reference with `{...ref}` instead of `ref={ref}`. It looks like a bug and has not been tested.

0d. Supernova housekeeping: the 16 registered components are not linked to their Figma components; status values on the board are set by hand and must follow each component's progress; two unused illustration frames remain on the Figma page "Docs / Button"; about 740 of 1,000 credits are left.

1. Roll the state standard out to the 11 incomplete components on the Inputs page, lowest score first (Select Field 65%, Search 78%). Per component: design missing states in Figma, update CSS, story, Code Connect, then write its description in `docs/components/DESCRIPTIONS.md` (same labelled format as Input Field: summary, then `PURPOSE:`, `BEHAVIOUR:`, `COMPOSITION:`, `USAGE:`, `CODE GENERATION NOTES:`). When adding variants in Figma, bind their layers to the component properties (copy `componentPropertyReferences` from the Default variant) and run `npm run descriptions` and `npm run rubylint`.

2. Review the 11 contract check warnings (unmapped Has Error / Has Label / Open / Value Type, Date fields without code or Code Connect, hard-coded strokes in Date Picker and Select).

3. Other Figma pages: the designer audits and exports them by hand, as done for Buttons and Inputs. The Jira specifications in `docs/components/` are older than the manual exports and need exporting again.

4. Contrast: 6 Inputs components have a lowest contrast of 1.5:1 (placeholder or disabled text, to check).

5. Distinct focus colour: `Border/Focus/Default` is still the same red as error.

6. Supernova tokens: the variables are in. Still to do: remove the old empty "Dark" theme, and run the plugin again after every variable change in Figma (it is a manual push). Brand collection in Figma for the second brand; Supernova role in the flow; Jira connection to create tickets from the `.jira.md` specs.

Done on 2026-11-25 (evening), second run of the `ship-component` skill, on Checkbox Field:
- Code aligned with the 12 Figma variants: the unchecked border uses `Border/Brand/Tertiary`; the focus ring sits on the edge of the box in `Border/Focus/Default`; no gap between label and description; gap and column tokens corrected; the disabled description is shown at 50% opacity.
- Accessibility fixes from the review: the description is linked with `aria-describedby`, the label is a span inside the one label element, `Icon` now passes `aria-hidden` to its svg (this affects every icon that sets it), and `placeholder` is no longer a prop of CheckboxField.
- Stories: a Has Description control and a new story "Checkbox States" with the twelve variants.
- Decisions by the designer: Checkbox Field has no hover look on purpose; the `errorMessage` prop stays in code and an Error variant will be designed later; the disabled label uses `Text/Disabled/Default`.
- Figma, with the designer's yes: the label of the three Disabled variants is bound to `Text/Disabled/Default`; the six Hover and Focus variants are connected to Label, Description and Has Description; the four Indeterminate description rows use the same gap setup as the others; a new page "Docs / Checkbox Field" holds six do and don't frames and one anatomy frame.
- Review: round 1 passed two of six, round 2 passes four of six. The two that fail are design decisions (Hover, Error). Scorecard in `eval/scorecards/Checkbox-Field.md`.
- Documentation: `docs/pages/Checkbox-Field.md`, agreed in the preview without edits. Supernova page "Components / Checkbox Field" created as an unpublished draft with three tabs and seven Figma illustrations (10 credits with the status values; 17 of 20 pages are now used, so one more three-tab component fits). The Usage tab was read back; Design and Code were confirmed by block count only.
- Code Connect for Checkbox Field published, this file only.

Later on 2026-11-25, to clear the two failing criteria: Figma gained a Hover look (box fill `Background/Default/Default Hover` or `Background/Brand/Hover`) and three Error variants (box border `Border/Danger/Default`, an error line in `Text/Danger/Default`, properties Has Error and Error), made with the designer's yes. The code, the stories and the Code Connect mapping follow. The designer exported the contract again (audit 97%; no new Jira export). Review round 3, the last one: four of six pass. Properties and States now pass; Accessibility and Themes fail on one design value, the Error border on a checked box (1.49:1 in light, 1.25:1 in dark).

Still open for Checkbox Field: the Error border on a checked box (design); the three Error variants are not connected to the component properties in Figma; the Figma description still says 12 variants and four states; Focus with Error and Disabled with Error are not designed; the Supernova page and the published Code Connect mapping are older than these changes; the Jira file is still the old automatic one; publishing the Supernova site.

Done on 2026-11-25 (afternoon), first run of the `ship-component` skill, on Input Field:
- The skill exists and is in the repository under `.claude/skills/ship-component/`. Claude Code loads it from there; start it with `/ship-component` and the Figma link of the component. It runs the workflow in five phases: inputs, build, check, documentation, close. It has three scripts: a preview builder, a preview server that saves text edits, and a converter from the documentation source to Supernova page bodies. Each run adds a row to `docs/ship-log.md`.
- Documentation now has one neutral source per component, `docs/pages/<Name>.md`, with the Supernova ids in `docs/pages/supernova.config.json`. Every platform is produced from that file, so Supernova and a later Docusaurus site show the same text and structure.
- Input Field code aligned with Figma: the input is 40px high with 12px padding; disabled value and placeholder use `Text/Disabled/On Disabled`; the description keeps its colour when the field is disabled (shared field style).
- Line height is now part of the token pipeline. The token script writes each text style as size/line-height (140% for Body, 120% for titles, 100% for Single Line), read from the Figma text styles into `scripts/tokens/styles.json`. This changes the height of text in every component by a few pixels.
- Input Field story starts from the Figma defaults and has controls for Has Label, Has Description, Has Error and Value Type.
- Code Connect for Input Field: Has Error maps to `errorMessage`; a field without a label keeps `InputField` with `aria-label`; the value is written as `defaultValue`. Published on 25 November with the designer's yes, this file only (`npx figma connect publish -f src/figma/primitives/InputField.figma.ts`, after a dry run). Still to check in Figma Dev Mode that the snippet shows.
- Figma, with the designer's yes: the Description layer was moved below the Input in the ten Input Field variants; the CODE GENERATION NOTES paragraph of its description was updated; a new page "Docs / Input Field" holds ten do and don't frames and one anatomy frame.
- Review: round 1 failed four criteria, round 2 passes four of six. The two that fail (accessibility, themes) fail only on contrast values that come from the design: placeholder 2.1:1 in light and 3.78:1 in dark, default border 1.41:1 and 1.71:1. Scorecard in `eval/scorecards/Input-Field.md`.
- Supernova: the first attempt to create the Input Field page was refused, because the plan allows 20 pages and 20 existed (a component with three tabs counts as three). After the generated pages for Tag, Accordion and Avatars were removed, the page "Components / Input Field" was created as an unpublished draft from `docs/pages/Input-Field.md`: three tabs, eleven Figma illustrations, 10 credits including the status values (Status: Known issues, React: Ready, Code Connect: Published after the publish below, Documentation: Draft; 13 credits in total). Read back and confirmed: all sections and all eleven images are stored. Not yet seen: how the page looks in the Supernova app, in particular whether the tables show their first row as a header. Publishing stays with the designer.

Still open for Input Field: the two contrast values and the red-on-red focus on an error field (design); the error message is not a live region (code); the RubyLint exports are from 24 November and older than the Figma changes above, so they need exporting again; publishing the Supernova site.

Done on 2026-11-25:
- Benchmark of eleven design system documentation sites received (made outside this project). It is kept outside the repo, because it holds screenshots of other companies' sites.
- First draft of the Button documentation for Supernova written in `docs/supernova/Button.md`, using the sections the benchmark found on the best sites: Overview with status, Design, Usage, Code and Accessibility. The text comes from the Figma description, the code and the review scorecard. Lines marked "proposed" are new guidance and wait for the designer's yes. Nothing has been written to Supernova yet.
- Visual mock-up of that Button page built as one local HTML file, `docs/supernova/Button.preview.html`, so the draft can be judged before any Supernova credits are spent. It shows the five tabs, live button examples drawn with the token values, a light and dark switch, and a switch to hide the proposed lines. It is a mock-up of the content and structure, not of Supernova's exact look.
- Do and don't illustrations for Button created in Figma, with the designer's yes. New page "Docs / Button" with one section and six frames (640 by 400): one Primary button, two Primary buttons, Loading, Small on a touch screen, same variant across screens, disabled with no reason. They are built from instances of the real Button component and the colour variables, so they follow any change to the component. Nothing existing in the file was changed. To undo, delete the page. The same six scenes are in the HTML mock-up.
- Button page reorganised from five tabs to three, because the Supernova plan in use allows three tabs per page: Usage (status, what it is, when to use, do and don't, related components), Design (anatomy, variants, sizes, states, tokens), and Code and accessibility (example, props, Figma to code, accessibility, changes). Overview and Accessibility are now sections, not tabs. The text draft and the mock-up both follow this. In Supernova it means one tab rename: "Code" becomes "Code and accessibility".
- Button page written to Supernova as an unpublished draft (18 credits: three page writes and one tab rename). Tabs: Usage, Design, Code and accessibility. The do and don't block shows the six Figma frames, linked straight from the Figma file. The existing live blocks were kept: the Figma component previews, the Figma property table and the Storybook playground. The lines of new guidance are in and marked "(Proposed)"; they still wait for the designer's yes. Read back and confirmed: all sections and all six images are stored. Not yet checked: how the page looks in the Supernova editor and preview. Nothing is published.
- The designer decided to drop the lines of new guidance that had no source in Figma, the code or the review (two do and don't pairs, the label writing rules, one accessibility line). They are removed from Supernova (10 more credits, 28 in total today), from the text draft and from the mock-up. The Button page now has four do and don't pairs. The two unused illustration frames stay in Figma on the "Docs / Button" page.
- Nine improvements to the documentation template, asked for by the designer with reference screenshots, applied to the mock-up and the text draft: links as cards with a logo; a changelog with date, version and notes; coloured chips for every status; a related reading list (suggested from memory, each link still to be verified by a person); tabs inside a page (Light and Dark for states, Colour and All variants for tokens); an anatomy illustration; a status board for the 16 audited components; a tip and a contact card for the design system team (placeholder Teams link); a top bar with sections. In Figma, one frame "Anatomy / Button" was added to the "Docs / Button" page, with the designer's yes. Not yet in Supernova.
- Anatomy markers changed to red on the designer's request (Figma frame and mock-up). The contact card uses the real Microsoft Teams icon and the Storybook card the real Storybook logo; the icon files are in `docs/supernova/img/` and are not committed.
- Improved Button page uploaded to Supernova, still an unpublished draft (38 credits: four logo uploads, four page edits; 66 credits in total on 25 November). Now in Supernova: link cards with logos for Figma, Storybook and the source code; the anatomy illustration with a description of each part; the two token tables in tabs inside the page; a changelog with date, version and notes; a related reading list under a warning that the links are unverified; a tip and a contact card with a placeholder Teams link. Not possible or not done in Supernova: coloured status chips (a plain table cannot hold them; they need each component registered in Supernova with status properties), the status board (same reason), Light and Dark tabs for states (there are no dark illustrations), and the top bar with sections (a site setting in the Supernova app).
- Status board and status chips built in Supernova, as unpublished drafts (78 credits; 144 in total on 25 November). The 16 audited components of the Buttons and Inputs pages are now registered as components in Supernova. Five status properties were added: Design audit (%), React, Review, Code Connect and Documentation, the last four with coloured values. Every component has its values set from the audit scores, the code and the contract check. The page "Components / Overview" has a new "Status board" section with a legend and the table of all components. On the Button page the plain status table is replaced by a status block that reads from the Button record, so the board and the page cannot disagree. Confirmed by reading back: 16 components and the board section exist. Not yet seen: how the chips and the table render in the Supernova app. Still open: the components are not linked to their Figma components in Supernova, and status values must be updated by hand or by a later script when a component moves forward.
- After the designer saw the Button page in Supernova (the coloured status values display as intended), three changes, 16 credits (160 in total on 25 November): the vertical status list on the Usage tab is replaced by Supernova's horizontal health bar, with Button set to "Known issues" because the page lists four open accessibility issues, and the five statuses behind its details button; the source code card shows the GitHub logo; at the bottom of "Code and accessibility" the four embedded Storybook players for related components are replaced by link cards with a Figma preview image and a one-sentence excerpt from the Figma description, each opening its Storybook story. Destructive Icon Button has no Figma component set of its own, so its card has no image and no excerpt.
- Consistency check between Storybook and Figma for the 16 components, written up in `docs/consistency-storybook-figma.md`. Figma was read live and Storybook from the local server. Result: 1 consistent, 4 mostly consistent, 9 with differences, 2 in Figma only (Date Input Field, Date Picker Field), 1 in Storybook only (Destructive Icon Button). The main patterns: Loading offered in Storybook for Button Danger and Icon Button but not designed in Figma; Figma properties with no Storybook control; label and description controls that do nothing in Select Field and Switch Field; different defaults. Nothing was changed in Figma, Storybook or the code.
- Storybook side of those differences fixed, in the story files only (8 files in `src/stories/primitives/`). Stories now start from the Figma defaults, every Figma property that the code supports has a working control, controls for states that Figma does not have are hidden, and Textarea Field has a states story. Verified by loading each changed story and trying its controls; lint is clean. The list of what changed, and of what a story cannot fix, is at the top of `docs/consistency-storybook-figma.md`. Follow-up needed after the next deploy: refresh the Storybook source in Supernova, because one story address changed (`story-checkbox-group`) and one story is new.
- Decision: this consistency check between Storybook and Figma, with the story fixes, becomes a step of the workflow skill. It runs after the component is aligned and before the documentation is written.

Done on 2026-11-24 (evening):
- Manual RubyLint exports for all 16 components on the Buttons and Inputs pages imported into `docs/components/` (Markdown and JSON contract). Scores: 82% to 97%, lowest Checkbox Group 82%, Button Group 86%, Search 88%. Contract check: 16 contracts, 0 errors, 13 warnings.
- Rubric (`eval/rubric.md`) and reviewer brief (`eval/reviewer-brief.md`) written. `@axe-core/playwright` installed for the accessibility scan.
- Button aligned with the Figma variants (`button.css`, `Button.tsx`, story): Neutral uses the Neutral tokens, Subtle text and hover follow Figma, Disabled uses the On Disabled tokens, Small uses 16px text and icon, Focus is a 2px ring on the edge, Loading hides other icons.
- Button review round 1: Fail on one item. Subtle text used `Text/Neutral/Default` in Medium and `Text/Default/Default` in Small in Figma. Decision: `Text/Neutral/Default` for both. The three Small variants (Default, Focus, Loading) were rebound in Figma.
- Button review round 2: 5 of 6 criteria pass. Visual match and themes now pass with 0 mismatches in light and dark, and the axe scan finds 0 violations. The one fail: a Button used as a link could still be activated while Loading. Fixed in `Button.tsx` and `button.css` (a loading link is now disabled and keeps the Loading look), with a new story "Button Link Loading".
- Button review round 3: Pass, all six criteria. 0 token mismatches in light and dark across the 30 Figma variants, axe 0 serious or critical violations, keyboard and link behaviour correct. Scorecard and screenshots in `eval/scorecards/`. Measured on the local Storybook server, not on a fresh build. Screen reader output was not tested.
- Supernova connected and read (nothing changed in it). One design system, one brand ("Default"), one theme ("Dark") with no token overrides. Sources: the Figma file (last import 2026-11-23, 29 tokens and 2,134 components, automatic import off) and the Storybook (last import 2026-11-24, 62 stories, without the newest Button story). No canonical components are defined.
- Supernova design system renamed by the designer to "SDS Design PoC" (was "My Design System").
- Why Supernova has only 29 tokens: its normal Figma import reads styles only, not variables. The 29 tokens are exactly the 14 text styles and 15 effect styles of the file. The 347 variables, their collections and the Light and Dark modes need the Supernova Figma Variables Sync plugin, run from inside Figma by the designer. That is also why the Dark theme in Supernova is empty.
- Variables pushed to Supernova by the designer with the Variables Sync plugin (free plan, default settings). Checked from here: a new source for the plugin exists; themes "SDS Light" and "SDS Dark" each carry 137 colour values; sample tokens resolve to different values in dark (for example `Background/Default/Default` is #FFFFFF in light and #1E1E1E in dark), keep their link to the primitive colour and carry the web code name (`var(--sds-color-...)`). The plugin also created themes "Default", "Desktop", "Mobile" and "Tablet". The Supernova app shows all four data sources as healthy (Figma, Figma Variables Sync, Storybook); an error flag reported through the connection did not show in the app. Open point: the old empty "Dark" theme is still there. Token count confirmed in the Supernova app: Color 137, Color Primitives 100, Size 41, Typography 35, Typography Primitives 31, Responsive 4, which is all 348 Figma variables, plus the 29 style tokens.
- Supernova Storybook source refreshed (2026-11-24 21:54 UTC): it now includes the new "Button Link Loading" story. The Figma source was re-imported by the designer at 21:56 UTC: 2,134 components updated, none added or removed. Supernova is now current with Figma components, Figma variables and Storybook.
- Connections checked: Figma bridge, GitHub, Pages and local Storybook work. Supernova still needs a sign-in.

Done on 2026-11-24 (day): Input Hover and Focus (code, story, Code Connect). Headless RubyLint runner (`npm run rubylint`), exports in `docs/components/`. Contract check in CI (`npm run check:contracts`). Description sync (`npm run descriptions`), Input Field described. Search Code Connect and Disabled border variable fixed. ESLint clean and in `npm run lint` and CI (fixed 7 dropped-prop bugs). `npm run lint` exists for the oneds plugin's Stop hook. Input Field description rewritten in RubyLint's labelled format and synced; Input Field Hover and Focus variants bound to the component properties in Figma.

## 1. Clone SDS and publish to own GitHub

Why: start from a maintained React + Code Connect + Storybook reference.

```bash
git clone https://github.com/figma/sds.git sds
cd sds
git remote rename origin upstream          # keep a link to the original
gh repo create <repo> --public --source . --remote origin --push
```

Verify: the repo exists on GitHub and `git remote -v` shows `origin` (yours) and `upstream` (Figma).

Note: clone outside restricted or synced folders if your environment blocks writes to `.git`.

## 2. Publish Storybook on GitHub Pages

The repo already ships a workflow (`.github/workflows/main.yml`) that builds Storybook into `dist/storybook` and deploys `dist/`.

```bash
gh api -X POST repos/<account>/<repo>/pages -f build_type=workflow
```

Verify: the workflow run succeeds and `https://<account>.github.io/<repo>/storybook/` returns 200.

Known issues:
- The first deploy can fail with "No artifacts named github-pages"; re-running the workflow fixed it.
- `npm run build` chains steps with `;`, so Storybook deploys even though the app build fails on type errors (step 9).

## 3. Anonymise

Why: the PoC is public, so it must not expose client or personal details.

- Repo name must be neutral (renamed with `gh repo rename`).
- Commits authored with a neutral identity; amended and force-pushed:
  `git -c user.name="DS PoC" -c user.email="noreply@users.noreply.github.com" commit --amend --reset-author`
- Search the repo for client, company and personal names before every push.
- Limit: GitHub Pages URLs always contain the account name. A neutral org or a private repo is the only way around it.

## 4. Overview page

`src/stories/_welcome/Overview.mdx` is the single front page of the Storybook (SDS/Overview). It replaces the earlier Hello and Process pages and has three parts:
- **Hero** (`Hero.tsx`, `hero.css`): the starting point, with the project links. White text on `--sds-color-red-600`, a contrast of 6.3:1 (the semantic danger token in light mode only reached 3.7:1, below the 4.5:1 needed for body text).
- **Workflow diagram** (`PipelineFlow.tsx`, `pipeline-flow.css`, `logos.ts`): six swim-lane stages with service logos, a dashed design-token line and a dashed Code Connect line. To change a stage, edit `LANES`, `NODES` and `EDGES` in `PipelineFlow.tsx`.
- **This document**, rendered from `docs/PROCESS.md`.

The diagram is user-triggered (Play), animates only `transform`, `opacity` and stroke, and honours `prefers-reduced-motion`.
Logos for Figma, Jira, GitHub, Storybook, React and GitHub Actions come from the Simple Icons set (CC0). RubyLint and Supernova use simple custom marks, because they are not in that set. Replace the Supernova mark with the official SVG when available.

## 5. Read the Figma system

Connection: Figma console MCP with the Desktop Bridge plugin open in the target file.

Findings:
- 347 variables in 6 collections: Color Primitives, Color (SDS Light / SDS Dark), Typography Primitives, Responsive (Desktop / Mobile / Tablet), Size, Typography.
- 1,772 components and 78 component sets (mostly icons).
- Code: `scripts/tokens` generates `src/theme.css` (226 `--sds-color-*` properties). Raw hex values exist only in that generated file.
- Code Connect: 96 `.figma.ts` files; URLs point at the upstream SDS file, not the modified copy.
- Dark mode uses only `prefers-color-scheme`; there is no manual switch.

## 6. Project rules

`CLAUDE.md` holds scope, hard rules (tokens only, never invent props, stay anonymous) and pointers.
Unknowns are explicit `TODO:` lines rather than guesses.

## 7 to 12. Planned

Updated here as each step completes. Open questions:
- Where RubyLint exports live (`docs/components/` or Storybook MDX).
- How Supernova receives tokens (Figma sync, repo JSON, or API/CLI).

## RubyLint in the pipeline

A Figma plugin that audits components (tokens, states, accessibility, naming) and exports Markdown, JSON or an AI prompt.

- The audit and all exports work with no API key.
- Keep the optional design-system knowledge service off: it sends component names to a third party.
- Export from Figma, commit the result to the repo. It cannot run headless in CI.

## Decisions log

| Decision | Choice | Why |
|----------|--------|-----|
| Scope | React only, Light + Dark | Prove the pipeline first |
| Extra theme | Second brand with its own Light and Dark, neutral placeholder palette | Shows brand and mode combine; no real branding |
| Theme structure | Separate Brand collection | Adding brands does not multiply modes |
| Verification | Heavy (rubric + critics) once real screens exist; token lint first | Objective checks before subjective review |
| Ambiguity | Stop and ask | RubyLint and Supernova details are not visible to the assistant |
| Supernova position | Decide later | Build up to Storybook first; keep it an explicit open decision |
| Demo scenarios | Update an existing component and create a new one | Update shows drift and change propagation; create shows the full path |
| Contract check | Script in CI comparing RubyLint JSON to code | Otherwise "tested" only means "it renders" |
| Audit | Manual, in the Figma plugin | The designer sees the component and reads the result; more judgement and precision than an unattended run |
| Component review | Written rubric scored by a fresh reviewer | The builder does not mark its own work; every pass needs evidence |
| Changes in Figma | Only after a clear yes for that change | The file belongs to the designer |
| Subtle button text | `Text/Neutral/Default` in both sizes | Medium and Small differed; with this the label darkens on hover in both |
| Demo format | Recorded video, not live | Avoids dependence on plugin, AI generation, Jira and deploy timing |
