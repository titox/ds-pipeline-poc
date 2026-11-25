# Ship log

One row per run of the `ship-component` skill. Used to compare documentation platforms on time, effort, automation and maintenance.

Phases: 1 inputs, 2 build, 3 check, 4 documentation, 5 close. Minutes are working time, without the time spent waiting for the designer.

| Date | Component | Phase minutes (1/2/3/4/5) | Review rounds | Supernova credits | Stops (designer actions) | Done by hand |
|---|---|---|---|---|---|---|
| 2026-11-25 | Input Field | 2 / 10 / 35 / 45 / 10 (approximate; first run, includes building the preview and Supernova converter scripts) | 2 (Fail, then Fail on design contrast only) | 13: one call to create the page with its three tabs (5), one to set four status values (5) and one to mark Code Connect as published (3). A first attempt was refused by the page limit and cost nothing. | 6: exports still current; four design decisions; two Figma changes; documentation text; more do and don't pairs; illustrations and Supernova. | RubyLint exports (reused from 24 November). Freeing pages in Supernova: three older generated component pages were removed in the Supernova app before the page could be created. Publishing the Supernova site: the designer. |

## Notes for the comparison

- **Supernova, 25 November:** creating the Input Field page failed with "Active page limit exceeds 20". One component page with three tabs counts as three pages, so the current plan holds about six documented components next to the Foundations pages. The failed write cost no credits. The page was created once older generated pages had been removed (11 pages before, 14 after).
- **Supernova:** finding the id of a Figma component through the connection means paging through all 2,134 imported components (mostly icons). The live Figma preview blocks were left out of the generated page for that reason.
- **Illustrations:** eleven frames (ten do and don't, one anatomy) are built in Figma from instances of the real components, so they follow design changes. Supernova links to the frames; a static site needs them exported as files again after each change.
