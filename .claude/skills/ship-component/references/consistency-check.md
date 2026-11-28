# Storybook against Figma: consistency check

Purpose: the stories are the visual contract of a component. If a story offers something Figma does not have (or hides something it has), designers and developers stop trusting Storybook. This check compares the two for one component and fixes the Storybook side.

The first full run, with the report format to follow, is `docs/consistency-storybook-figma.md`.

## Read both sides live

**Figma** (read only, through the Desktop Bridge, `figma_execute` or `figma_get_component_details`). Since figma-console 2.0.0 `figma_get_component_details` is hidden by default: call `figma_enable_toolsets` with `["inspect"]` first, and if the tool still does not appear, run it through `figma_call`. `figma_execute` needs no toolset. For the component set:

- each component property: name, type (variant, boolean, text, instance swap), options, default value;
- the list of variants, which gives the states.

**Storybook** (the local server, port 6006; start it with the `storybook` launch configuration). For each story of the component:

- open `iframe.html?id=<story-id>` and evaluate `await window.__STORYBOOK_PREVIEW__.extract()` in the page; it returns every story with its `args`, `initialArgs` and `argTypes` (controls, options, defaults);
- story ids are in `http://localhost:6006/index.json`;
- read the story source where the controls alone do not explain a result.

Do not compare from the contract alone. The contract is an export and can be older than the file.

## Compare

| Aspect | Consistent when |
|---|---|
| Properties | Every Figma property has a control, or is a state the browser handles (Hover, Focus), or has a written reason. |
| Options | The option lists match, in the same order. |
| Defaults | The story starts from the Figma default values. |
| States | Every Figma state has a story; no story shows a state Figma does not have. |
| Counterpart | The component exists on both sides. |

Colours, spacing and other token values are not part of this check. The rubric review measures those.

## Fix, in story files only

- Start stories from the Figma defaults.
- Add a working control for each Figma property the code supports.
- Hide controls for states Figma does not have (do not remove the code).
- Add a missing state story.

After each change, load the story and try its controls. A control that does nothing is worse than no control.

Do not change the component code or Figma here. What a story cannot fix goes in the list below.

## Report

Add or replace the component's part of `docs/consistency-storybook-figma.md`:

- one summary row: component, result (Consistent, Mostly consistent, Differences, Figma only, Storybook only), main difference;
- what changed in its story;
- what is still different and needs a design or code decision, one line each.

Tell the designer the same three things in the progress note.
