// url=<FIGMA_SECTIONS_HERO_BASIC>
// source=https://github.com/titox/ds-pipeline-poc/blob/main/src/ui/compositions/Sections/Heroes.tsx
// component=Hero

import figma from "figma"

const children = figma.properties.children(["Text Content Title"])

export default {
  id: "Hero",
  imports: ['import { Hero } from "compositions";'],
  example: figma.code`<Hero variant="subtle">${children}</Hero>`,
  metadata: { nestable: true },
}
