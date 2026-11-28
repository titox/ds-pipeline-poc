# In our workflow

Where the bridge fits in the ship-component steps. "Today" is what the runs so far did. "Could use" is a proposal and has not been tried.

| Step | Today | Could use |
| --- | --- | --- |
| Synchronise the tokens | Export plugin and `scripts/tokens/app.mjs`; variables compared through `figma_execute` | `figma_export_tokens` (DTCG, CSS variables and other formats) from the `variables` toolset |
| Build the component | Component read through `figma_execute` | `figma_get_component_for_development` for specs and CSS |
| Storybook against Figma | Values compared by hand through the bridge | `figma_check_design_parity` and `figma_audit_code_adherence` from the `parity` toolset |
| Rubric review | Six checks, two of them Figma comparisons | `figma_lint_design` and `figma_audit_component_accessibility` as extra evidence |
| Illustrations on "Docs / Component" | Frames drawn with `figma_execute`, checked with `figma_capture_screenshot` | The same, plus `figma_set_annotations` to mark anatomy parts |
| Documentation preview | Written from the component and the stories | `figma_generate_component_doc` as a first draft |

Start of every session: open the plugin in the target file and run `figma_get_status`. Node ids change between sessions, so search for components again each time.

## Rules the server asks the assistant to follow

1. After any visual change, take a screenshot, check alignment and spacing, fix, and repeat up to three times.
2. Put new components inside a Section or Frame, never on the bare canvas.
3. Check a page exists before creating it.
4. Create or update many variables with the batch tools, up to 100 in one call.

## Skills in the repository

`server/skills/` has seven instruction files the assistant can follow.

| Skill | Use it to | Toolsets |
| --- | --- | --- |
| `accessibility-review` | Review a design, a component or code against WCAG 2.2 | `parity`, `docs` |
| `design-code-parity` | Compare the Figma library with the code library and sort each difference | `inspect`, `parity`, `components`, `variables` |
| `design-tokens-sync` | Move tokens between Figma variables and code, dry run first | `variables`, `inspect` |
| `generate-with-design-system` | Build a screen in Figma from existing components only | `inspect`, `docs` |
| `generate-code-with-design-system` | Write UI code from the design system only | `inspect`, `parity` |
| `grade-generation` | Have a separate grader give a pass or fail on a generated design or code | `parity`, `inspect` |
| `troubleshoot-connection` | Find and fix connection problems | `debug` |

## Not used in this test

Motion and shaders, Slides, FigJam, extracting a design system from app code, and library analytics (Enterprise plan only).
