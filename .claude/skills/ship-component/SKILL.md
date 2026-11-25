---
name: ship-component
description: Takes a design system component from its Figma link to checked, published code and documentation in this repository (tokens, React component, Code Connect, Storybook stories, automated checks, Storybook-versus-Figma consistency, rubric review, documentation preview, Supernova draft, commit and deploy). Use it whenever the designer sends a Figma link to a component or to a page of components and wants it shipped, built, aligned, updated, documented or "run through the workflow", and for requests such as "ship Input Field", "pasa este componente por el pipeline", "do the same for the Inputs page" or "the component changed in Figma, update everything". Also use it to resume a run that stopped part way.
---

# Ship a component

This skill packages the workflow in `docs/PROCESS.md` ("Workflow: a component is created or updated in Figma") so every component goes through the same steps, in the same order, with the same stops. The designer is not a developer: they judge the result in Storybook and in the documentation preview, not in the code.

Before starting, read `CLAUDE.md` and `src/AGENTS.md`. They hold the project rules (tokens only, never invent a prop, anonymity). This file does not repeat them.

The repository is the folder that holds `package.json`, `src/` and `docs/` (named `sds` inside the designer's workspace). Every path and command in this skill is relative to it, so change into that folder first if the session started one level above.

Talk to the designer in the language they write in. Everything written to the repository, Figma or Supernova is in British English.

## Names used below

- `<Name>`: the Figma component name with hyphens, as used in `docs/components/` (for example `Input-Field`).
- `<Component>`: the folder in `src/ui/primitives/` (for example `Input`). One folder can hold several Figma components; find it from the Code Connect file or the contract, do not guess.

## Rules that hold for the whole run

These exist because each one was a decision the designer made. Breaking one costs trust, credits or work that cannot be undone from here.

- **Figma is changed only after a separate yes.** Say exactly what will change and where, then wait. Reading Figma needs no permission. One yes covers one change.
- **Supernova writes cost credits.** Every `sn_admin_write` costs 3 or 5. State the estimated cost and offer the route through the Supernova app before the first write of a run. Publishing the site stays with the designer.
- **The audit is manual.** The designer runs RubyLint in the Figma plugin and exports by hand. Do not run `npm run rubylint`.
- **Documentation text has a source.** Every sentence comes from Figma (description, properties, variables), the code, or the review scorecard. No guidance from general knowledge. If something useful has no source, list it for the designer as a suggestion; do not put it in the page.
- **Design problems go back to design.** If the code matches Figma and Figma itself is wrong (low contrast, a missing state), report it. Do not change the look in code.
- **No pass, no documentation.** If the scorecard does not pass, nothing is written to Storybook documentation, Supernova, Docusaurus or the documentation source, and the run does not go on to Phase 4. The designer gets a failure report that says what is failing and the steps to fix it. The run waits until every error is fixed, design errors in Figma included, and a new review round passes. No exceptions. See the gate after step 11.
- **No illustrations, no documentation.** Every documentation page has its do and don't illustrations and its anatomy illustration, as frames on the Figma page `Docs / <Component name>`. This step is never skipped, never postponed to "later" and never offered as optional. The designer decided this on 25 November 2026, after a run published a page without them. Creating the frames is a change in Figma, so the run stops for the yes (step 12a); it does not go on to the preview or to any destination until the frames exist and their node ids are in the source file. If the designer says no, the run waits there: remind them of this rule instead of shipping without images.
- **Anonymous repository.** Commit with `git -c user.name="DS PoC" -c user.email="noreply@users.noreply.github.com"` and no co-author line. No personal or client names anywhere.
- **Unknowns stop the run.** If a fact is missing or two sources disagree, ask one question instead of choosing.

## Progress notes

A run takes a while and the designer cannot see the work. At the start of each phase and whenever something worth knowing happens, send one or two plain sentences: what is being done and what was found ("Hover uses the Secondary border in Figma but the Default one in code; fixing the code"). Do not narrate commands. Keep a task list with the five phases.

Record the time each phase starts and ends. The run log at the end needs it.

## Reminder at the start and at the end

A run is long, and a session that already holds other work gives worse results: earlier details crowd out the ones that matter and the run gets slower. The designer may not know this, so tell them, once at each end. Use their language; the wording below is a model, not a script.

- **At the start, before Phase 1:** "For the best results, run this in a clean session. If this conversation already has other work in it, type `/clear` and send the link again. Otherwise I will start now." Then start. Do not wait for an answer and do not clear anything yourself: it is their conversation. Skip the reminder only if the session is clearly new (nothing before this request).
- **At the end, as the last line of the final summary:** "Before the next component, type `/clear` to start from a clean conversation. Everything from this run is saved in the repository, so nothing is lost."

On a page of components, give the end reminder after each component's summary as well. The run can be picked up again from the files (see Resuming), so clearing between components is safe.

## Input: one component or a page

The designer sends a Figma link.

- **A component or component set:** run the five phases for it.
- **A page or a frame holding several components:** read the node, list the component sets found, and for each say whether its exports exist in `docs/components/`. Propose an order (highest audit score first, because those need the least design work), give a rough total (time, and Supernova credits from `docs/ship-log.md` averages if there are any) and wait for a yes. Then run the components **one at a time**, each through all five phases, with a short summary between them. They share `src/theme.css`, the Storybook build and the Supernova status board, so parallel runs would overwrite each other.

If the Figma Desktop Bridge is not connected (`figma_get_status`), ask the designer to open the plugin in the file. Without it the consistency check and the visual comparison cannot be done.

The designer often has other Figma files open with the plugin running, and the active one may not be the design system. Take the file key from the link and pass it as `fileKey` on every Figma call, so nothing is read from (or written to) the wrong file. The screenshot tool has no `fileKey`: before taking screenshots, pin the design system file with `figma_navigate` (its URL, `lock: true`). That only changes which file the tools talk to, not what the designer sees.

## Phase 1: Inputs

1. Read the node from the link: name, type, properties, variants, description.
2. Ask for the three manual RubyLint exports of this component: the JSON contract, the Markdown and the Jira request. If `docs/components/<Name>.contract.json` already exists, say when it was exported (`exportedAt`) and ask whether it is still current or a new export is coming. A stale contract makes every later check compare against the wrong design.
3. Copy new exports into `docs/components/` as `<Name>.contract.json`, `<Name>.md` and `<Name>.jira.md`.
4. Compare the contract with what Figma says now (property names, options, defaults, state list). If they differ, the export is stale: stop and ask for a new one.

## Phase 2: Build

5. **Tokens.** Only if a variable changed in Figma since the last sync: `npm run script:tokens` (see `scripts/tokens/README.md`), then read the `src/theme.css` diff. Never edit `theme.css` by hand.
6. **React component** in `src/ui/primitives/<Component>/`. Props match the Figma properties. States map to pseudo-classes, `disabled` and `aria-*`, not to extra components. State standard: Default, Hover, Focus, Disabled, plus Error for fields and Loading for buttons; there is no Pressed. Read every variant live from Figma, hidden layers included: layer order, bound variables for fill, border, text, padding, gap and radius, border width, text style and its line height. Compare them with the CSS and with what the browser computes in the story (`getComputedStyle`), in light and dark, and change only what differs. The contract lists token names but not which state uses them or the order of the layers, and a token that resolves to the same grey in light can differ in dark.
7. **Code Connect** in `src/figma/primitives/`. Update the property mappings to the current Figma properties. A new component also needs its entry in `figma.config.json`.
8. **Stories** in `src/stories/primitives/<Component>.stories.tsx`. One story per variant and state, starting from the Figma defaults. Before writing or editing stories call the Storybook tool `get-storybook-story-instructions`, and afterwards `stories-preview`.

If a component is already aligned, this phase can be short. Say so rather than inventing changes.

## Phase 3: Check

9. **Automated checks:** `npm run lint` (ESLint, token lint, contract check). Errors must be fixed. For warnings, say which belong to this component and whether they can be fixed now.
10. **Storybook against Figma.** Compare properties, options, defaults and states on both sides. Fix what a story can fix, in story files only. List what needs a design or code decision. Method and report format: `references/consistency-check.md`.
11. **Rubric review.** Start a fresh general-purpose subagent for each round, with no build context, told to follow `eval/reviewer-brief.md` for `<Name>` and `<Component>`, and not to read the previous scorecard before measuring. Give it what it cannot know: the story ids, the address of the running Storybook (it may measure there instead of building), a scratch folder outside the repository for its scripts, the Figma node and file key (with the reminder to pass `fileKey`), and that the live Figma file wins over the contract where they differ. Do not tell it what you changed or what you expect. It writes `eval/scorecards/<Name>.md`. A round takes about six minutes; use the time to draft the documentation source. Sort its findings before fixing: (a) plain code errors, fix them; (b) code and Figma disagree, or Figma disagrees with itself (layer data against the written description), ask the designer which side is right, all such questions together in one go, with a recommendation each; (c) the design itself fails a criterion, report it. Starting another round while (b) is open wastes it, because the same findings come back. Then run the next round. Three rounds in a row is the limit for code fixes: if code errors are still there after three, stop and report.

**Gate: the scorecard must pass before Phase 4.** The designer decided this on 25 November 2026, after a run went on to documentation, Supernova and Code Connect with a failing scorecard and all three had to be redone when the design changed. There is no exception and no waiver: if the designer asks to go on anyway, remind them of this rule and offer the fix steps instead.

While the verdict is not Pass, never write documentation anywhere:

- not in Storybook (no documentation pages, no descriptive text written for readers; the stories the reviewer measures are part of the build and stay),
- not in Supernova (no page, no status values, no draft),
- not in Docusaurus or any later destination,
- and not the neutral source `docs/pages/<Name>.md` or its preview either, because every destination is produced from it.

Code Connect is not published and the run log is not written. Code and stories that already match Figma may be committed, so work is not lost.

**Failure report.** Each time a round does not pass, send the designer this, in their language, before anything else. One block per failing criterion, worst first:

```markdown
## Scorecard: <n> of 6 pass. The run stops here until these are fixed.

### <Criterion name>: Fail
- **What is failing:** one plain sentence, no jargon.
- **Where:** the Figma variant and layer, with its node id (or the file and line, for code).
- **Measured:** the value now, and the minimum or rule it misses.
- **Who fixes it:** design (in Figma) or code (I fix it now).
- **Steps to fix:**
  1. The exact change, naming variables that exist in the file (check before naming one).
  2. A second way, if there is one.
- **After the fix:** new RubyLint export needed, yes or no; then a new review round.
```

Close the report with one line saying what happens next and what is needed from the designer (a yes for a named Figma change, or "tell me when you have changed it"). Give a recommendation when there are two ways. Do not bury the report in a longer summary, and do not list passing criteria in detail.

Then:

- Code errors: fix them and run the next round, without asking.
- Design errors: the fix is made in Figma, by the designer or by you after their yes (one yes, one change). Do not make a failing criterion pass by changing the look in code, by editing the rubric or by asking the reviewer to ignore it.
- After a Figma fix: if a property, a variant or a token binding changed, ask for a new RubyLint export first (the contract check fails on an old one). Then bring the code in line and run a new review round with a fresh reviewer. Rounds after a Figma fix do not count towards the limit of three.
- Repeat until the verdict is Pass. Only then start Phase 4.

The reviewer is separate on purpose: whoever built the component should not mark it.

## Phase 4: Documentation

Read `references/documentation.md` before this phase. It defines the neutral source file, the page template, the editable preview and how each block is written to each destination.

Before any step of this phase, read the verdict line of `eval/scorecards/<Name>.md`. If it is not Pass, stop: go back to the gate after step 11.

12. **Write the neutral source** `docs/pages/<Name>.md` from Figma, the code and the scorecard, following the template.
12a. **Illustrations (mandatory, see the rule above).** Check whether the Figma page `Docs / <Component name>` exists. If it does not, or it lacks a frame for a do and don't pair or for the anatomy, say exactly what will be created (page name, one frame per do and one per don't, one anatomy frame, the example texts) and wait for the yes. Then build them as `references/documentation.md` describes, look at a screenshot of the section, fix what is off, and put the node ids in the `do-dont` table, the anatomy `image` block and the `## Images` table of alternative texts. A source file that still says `none yet`, or has no anatomy `image` block, is not finished: do not start step 13.
13. **Preview.** Build `docs/pages/<Name>.preview.html`, start the `docs-preview` server and give the designer the link. They read it and edit the text directly in the page, then press Save.
14. **Apply the edits** from `docs/pages/<Name>.edits.json` to the neutral source, show the designer the list of changes, and delete the edits file. The source file is now the agreed text. **Stop here until the designer says the text is right.**
15. **Publish to the destinations** from the neutral source, never from memory of the conversation. Before the first write, check the source once more: no `none yet` in a `do-dont` table and an anatomy `image` block with a node id. If either is missing, go back to step 12a. Today: Supernova, as an unpublished draft, after stating the credit cost. Then update the component's row on the Supernova status board. The second destination (Docusaurus) reads the same file; if it is not set up yet, say that it was skipped.

## Phase 5: Close

16. **Code Connect publish:** ask first, because it changes what developers see in Figma Dev Mode. Publish only this component's file, never the whole project: load the token from `.env` without printing it (`set -a; . ./.env; set +a`), run `npx --no-install figma connect publish --dry-run -f <file>` and check that the list names only this component, then run it again without `--dry-run`. Afterwards set the component's Code Connect status in Supernova to Published (3 credits) and the status row in `docs/pages/<Name>.md`.
17. **Commit and push** with the neutral identity. Commit only the files of this run; leave unrelated changes alone. The push to `main` deploys Storybook through GitHub Pages: watch the run to the end (`gh run watch`, with `-R` and the repository) and confirm it succeeded.
18. **Run log.** Add one row to `docs/ship-log.md` (create it with the header below if missing). The PoC compares documentation platforms on time, effort, automation and maintenance, and this is where those numbers come from.

    ```markdown
    | Date | Component | Phase minutes (1/2/3/4/5) | Review rounds | Supernova credits | Stops (designer actions) | Done by hand |
    ```

19. **Update `docs/PROCESS.md`**: the component's status, and anything new under "Next session".
20. **Final summary** for the designer, short:
    - What changed, grouped as Design, Code, Stories, Documentation.
    - What is still open and who it waits for.
    - Links: the Storybook story (local and published), the commit on GitHub, the Supernova page (`sn_admin_get_entity_url`), the scorecard and the neutral source file.
    - Last line: the reminder to clear the conversation before the next component (see "Reminder at the start and at the end").

## Where the run stops for the designer

| Stop | Why |
|---|---|
| Exports current? (Phase 1) | Only the designer knows if the design changed since the export. |
| Any change in Figma | Their file. |
| Scorecard not Pass (after any round) | The run does not go on until the errors are fixed in Figma and a new round passes. |
| Illustrations in Figma (Phase 4, step 12a) | Their file. The run waits here; it never goes on without them. |
| Text agreed in the preview (Phase 4) | They own the wording. |
| Before the first Supernova write | It spends credits. |
| Code Connect publish | It is visible to developers. |

Between stops, keep going. Do not ask for permission for things the workflow already covers (editing code, stories, running checks, committing).

## Resuming

A run can stop for hours at a designer step. When asked to continue, work out where it is from the files, not from memory: exports present, `git status`, scorecard date and verdict (if it is not Pass, the run is at the gate after step 11, whatever else exists), `docs/pages/<Name>.md` (if it still says `none yet` or has no anatomy image, the run is at step 12a), a pending `.edits.json`, the row in `docs/ship-log.md`. Say which step is next and carry on.
