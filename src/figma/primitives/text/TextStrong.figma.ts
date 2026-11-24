// url=<FIGMA_TEXT_TEXT_STRONG>
// source=https://github.com/titox/ds-pipeline-poc/blob/main/src/ui/primitives/Text/Text.tsx
// component=TextStrong

import figma from "figma"

const text = figma.selectedInstance.getString("Text")

export default {
  id: "TextStrong",
  imports: ['import { TextStrong } from "primitives";'],
  example: figma.code`<TextStrong>${text}</TextStrong>`,
  metadata: { nestable: true },
}
