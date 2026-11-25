# Documentation: one source, several destinations

The PoC compares documentation platforms (Supernova now, Docusaurus next). The designer's requirement: what a reader sees must be as close as possible on every platform. So the page is written once, in a neutral file in the repository, and each destination is produced from that file. Nothing is written straight into a platform.

Contents: 1. The neutral source file. 2. Page template. 3. Blocks. 4. Editable preview. 5. Destination: Supernova. 6. Destination: Docusaurus. 7. Status values.

## 1. The neutral source file

`docs/pages/<Name>.md`. Markdown, with a small header and block markers.

```markdown
---
component: Input Field
figmaNode: "2136:2263"
storybook: sds-primitives-inputs--input-field
source: src/ui/primitives/Input/Input.tsx
summary: One sentence shown under the page title.
updated: 2026-11-25
---

## Tab: Usage

### What it is

<!-- block: text -->
Paragraph text.
```

- `## Tab: <title>` starts a tab. Three tabs, always: Usage, Design, Code and accessibility. (The Supernova plan in use allows three tabs per page, and the other destinations follow the same split so the pages match.)
- `### <title>` starts a section inside a tab.
- `<!-- block: <type> -->` on the line before a piece of content says how it must be shown. Plain paragraphs and lists need no marker.

The Button page was written before this format existed and lives in `docs/supernova/Button.md` with the same sections in looser notation. Use it as the model for content and tone. Move it to `docs/pages/` only when the designer asks.

## 2. Page template

Keep the section order. Leave a section out only if there is nothing true to say; do not fill it from general knowledge.

**Tab: Usage**
1. Status (`status` block)
2. What it is: two or three sentences from the Figma description
3. Links (`cards`): Figma component, Storybook story, source file
4. When to use it: "Use it for" and "Not for this" lists, from the Figma description's PURPOSE and USAGE parts
5. Comparison with the nearest component, as a table, if the description supports one
6. Do and don't (`do-dont`), illustrated with Figma frames
7. Related components (`cards`)
8. Related reading: only links a person has verified; otherwise leave the section out and tell the designer
9. Need help? (`callout` and `contact`)

**Tab: Design**
1. Anatomy (`image` plus a numbered list of parts)
2. Variants (table)
3. Sizes (table), if the component has sizes
4. States (table: state, what changes), from the Figma variants and the CSS
5. Tokens (`tabs-in-page`: Colour, All variants), from the contract's token list

**Tab: Code and accessibility**
1. Import and example (`code`)
2. Storybook playground (`storybook`)
3. Props (table), read from the `.tsx`, never from memory
4. From Figma to code (table), read from the Code Connect file
5. Notes
6. Accessibility: "The component handles" and "You must do", from the code and the scorecard
7. Accessibility test results (table), copied from the scorecard with its date
8. Known accessibility issues, from the scorecard's design issues
9. Changelog (`changelog`): date, version, notes

Where each fact comes from: properties, variants and description from Figma; props, defaults and behaviour from the component source; mappings from the Code Connect file; measured values (contrast, sizes, axe result) from `eval/scorecards/<Name>.md`; token names from `docs/components/<Name>.contract.json`.

Illustrations for do and don't and anatomy are frames in Figma on a page `Docs / <Component name>`, built from instances of the real component so they follow design changes. They are mandatory: a page never ships without them (SKILL.md, rule "No illustrations, no documentation" and step 12a). Creating them is a change in Figma: say what will be created, ask, and wait for the yes; the run does not go on until they exist.

How to build them (model: the pages `Docs / Checkbox Field` and `Docs / Radio Field`; read one live before building):

- One section named `<Component name>: do and don't illustrations`, 1400 wide, white fill, at 0,0 on the new page. Check first that the page does not exist. Do not switch the designer's current page.
- One frame per do and one per don't, 640 by 400, fill `Background/Default/Secondary`, content centred, in two columns (x 40 and 720, rows 440 apart from y 40). Name them `Do / <what it shows>` and `Don't / <what it shows>`.
- Inside each, a "Card" frame 360 wide: vertical auto layout, gap 12, padding 24, fill `Background/Default/Default`, 1px stroke `Border/Default/Default`, radius 12. It holds instances of the real component with realistic labels set through the instance properties. All fills and strokes are bound to variables.
- One frame `Anatomy / <Component name>`, same size and fill: one instance scaled three times, with every optional part switched on, and numbered markers (28px circles in `Background/Danger/Default`, numbers in `Text/Danger/On Danger`, Inter Semi Bold 14) joined to each part by a 1.5px line. Place the lines from the measured positions of the layers, not by eye.
- Take a screenshot of the section and check it: nothing clipped, markers on the right parts, every example reads as the sentence it illustrates.
- Each example shows only what its do or don't sentence says. The sentences come from the Figma description; the example labels are neutral placeholders (delivery options, sizes, notification channels).

## 3. Blocks

| Marker | Content that follows | Meaning |
|---|---|---|
| `status` | Table: Area, Status, Detail | Health of the component. Statuses use the fixed values in section 7. |
| `cards` | Table: Logo, Title, Subtitle, Target | Link cards with a logo, shown in a row. |
| `do-dont` | Table: Do, Don't, plus a `Figma frame` column with node ids | Paired guidance with illustrations. |
| `image` | One line: alt text, Figma node id, optional exported file path | An illustration that lives in Figma. |
| `tabs-in-page` | `#### <tab title>` subsections | Tabs inside a section. |
| `code` | Fenced code | A code sample. |
| `storybook` | One line: story id | An embedded live story with controls. |
| `callout` | One paragraph | A highlighted tip. |
| `contact` | One line: title, subtitle, link | The team contact card. |
| `changelog` | Table: Date, Version, Notes | Newest first. |

Tables without a marker are plain tables.

## 4. Editable preview

The designer reviews and edits the text before it goes anywhere. The preview is a mock-up of content and structure, not of any platform's exact look.

1. Build the preview from the source file with the bundled script. It renders the tabs, sections and blocks, embeds the live Storybook story, and marks the text that can be edited:

   ```bash
   node .claude/skills/ship-component/scripts/build-preview.mjs docs/pages/<Name>.md
   ```

   It writes `docs/pages/<Name>.preview.html`. Do not write this file by hand: it is regenerated after every change to the source. Plain text is editable; code, token names and bold labels are not, because those come from the code and Figma.
2. Start the server with the `docs-preview` launch configuration. It must run `scripts/preview-server.mjs` from this skill with the repository's `docs` folder as root, on port 6100. If the configuration still points at a plain static server, change it in `.claude/launch.json` of the workspace. The page is then at `http://localhost:6100/pages/<Name>.preview.html`. Storybook must be running too, for the embedded story.
3. Check the page yourself first: every tab opens, no console errors, text is readable in light and dark.
4. Tell the designer: click any text to change it, then press "Save edits". Saving writes `docs/pages/<Name>.edits.json`, a list of `{ key, before, after }`.
5. When they say they are done, apply each edit to `docs/pages/<Name>.md` by finding the `before` text and replacing it with `after`. If a `before` text is not found, or appears twice, ask rather than guess. Rebuild the preview from the updated source, show the list of changes, delete the edits file.

The designer's edits are their wording and need no source. If an edit changes a fact (a value, a prop name, a test result), say so and ask, because the page would then disagree with the code.

## 5. Destination: Supernova

Before any write, read `supernova://skills/use-supernova/SKILL.md` and `references/writing.md` through the Supernova tools, state the credit cost, and offer the app route. Writes are drafts; the designer publishes.

Build the page bodies with the bundled converter, never by hand, so the page is exactly the agreed source:

```bash
node .claude/skills/ship-component/scripts/to-supernova.mjs docs/pages/<Name>.md docs/pages/supernova.config.json <scratch>/<Name>.supernova.json
```

It needs the component's ids under `components` in `docs/pages/supernova.config.json`: `componentId` from `sn_get_component_list`, `storybookEntityId` (the `entityId`) from `sn_get_storybook_story_list` with a `query`. A new component page is one `CREATE_DOC_TABBED_PAGE` call with the three tabs (5 credits); an existing one is one `WRITE_DOC_PAGE_CONTENT` per changed tab (5 each). The status values are one `SET_COMPONENT_PROPERTY_VALUES` call (5).

Check these before stating the cost, because they stop a write:

- **Page limit.** The plan in use allows 20 pages, and each tab counts as a page. Count the pages in `sn_get_documentation_page_list` first. If the new page does not fit, say so and ask the designer what to do (remove older pages, which needs their explicit yes, or change the plan). A refused write costs nothing, but do not retry it.
- **Figma images.** A write can resolve at most 20 Figma frames. The frames must already exist in the Figma file.
- **Do not list Figma components** (`sn_get_figma_component_list`): there are more than two thousand, mostly icons, in pages of 318, and the answer floods the conversation. The generated page has no live Figma preview blocks for that reason; the designer can add them in the app.
- After creating a page, save its `tabGroupId` and tab page ids under the component in `supernova.config.json`; later updates need them.
- `DELETE_DOC_TAB_GROUP` refused a three-tab page ("must contain exactly one child"). To remove a whole tabbed page, after the designer's explicit yes, `DELETE_DOC_GROUP` with `deleteSubtree: true` is the action to try.
- Re-read the page list immediately before any delete: the designer may have changed pages in the app since the last read.
- The Review status only has "Passed" and "Not reviewed". A review that fails on design issues is shown through Status = "Known issues".

Facts learned on the Button page:
Facts learned on the Button page:

- Workspace has one design system and one brand. `sn_admin_get_entity_url` needs the brand id; read it with `sn_get_brand_list`.
- One page per component under Components, with three tabs. A typical first write is three page writes plus any tab rename.
- Block mapping: `cards` to SNShortcuts (set `columns` explicitly, or it stores 1); `image` and `do-dont` illustrations to SNImage with `figmaUrl` (no upload, no extra credits); `do-dont` text to SNGuidelines; tables to SNTable in multi-line cell form; `tabs-in-page` to a Tabs section inside SNColumn; `status` to SNComponentHealth reading the component record; `storybook` to the Storybook embed block already on the generated page; the status board to SNComponentTable on "Components / Overview".
- Keep the live blocks Supernova generated (Figma previews, property table, Storybook playground) unless the designer asks to remove them.
- Patch writes need two or more lines of unique context on both sides, and a patch that removes lines up to the very end of a page fails: keep trailing context or split it.
- Never read the component property list with values included; the response is huge. Read ids only.
- After the page: set the component's status properties (React, Review, Code Connect, Documentation, Design audit %) so the board and the page agree.
- After a deploy that added or renamed stories, the Storybook source in Supernova needs a refresh; it imports hourly, or the designer can trigger it in the app.

After writing, read the page back and confirm every section is stored. Report credits spent and credits left.

## 6. Destination: Docusaurus

Not set up yet. When it exists, it reads the same `docs/pages/<Name>.md` and renders each block with a matching component, so the two sites show the same structure and text. Until then, skip this destination and say so in the summary. Do not invent a setup during a component run; that is its own task.

Note for the comparison in `docs/ship-log.md`: anything a platform needs done by hand (exporting an image, refreshing a source, setting a status) goes in the "Done by hand" column.

## 7. Status values

Use only these, so chips have the same colour everywhere: Ready and Passed (green), Pending (amber), Not tested (grey), Missing (red), Known issues (amber, for the health bar when the page lists open accessibility issues).
