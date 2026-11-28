## Switch on a toolset

- For one session: the assistant calls `figma_enable_toolsets` with the names it needs.
- Always: set `FIGMA_TOOLSETS`, for example `FIGMA_TOOLSETS=docs,parity`, or `all`.
- If the new tools do not appear in the list, `figma_call` runs one by name. It refuses core tools and tools that can delete or overwrite, so the per-tool permissions still apply.

## How to read the tables

- **Effect** is the safety label the server gives each tool. "Reads" changes nothing. "Can delete or overwrite" covers deletes, resets and `figma_execute`, which runs any plugin code.
- **Token** says whether the tool needs the Figma token and `FIGMA_ALLOW_REST=1`. This column follows the repository README. We have not tested each tool.

## Dashboards

With `ENABLE_MCP_APPS=true` the server adds two views that open inside the assistant:

| View | Tool | Shows |
| --- | --- | --- |
| Token browser | `figma_browse_tokens` | Variables by collection, with search, filters and mode switching |
| Design system dashboard | `figma_audit_design_system` | Scores for naming, token architecture, component metadata, accessibility, consistency and coverage |

## All toolsets

