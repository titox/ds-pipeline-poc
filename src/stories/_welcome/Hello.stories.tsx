import { Meta, StoryObj } from "@storybook/react";
import { Flex, FlexItem, Section } from "layout";
import {
  Logo,
  Text,
  TextHeading,
  TextLink,
  TextLinkList,
  TextListItem,
} from "primitives";

const meta: Meta<typeof HTMLIFrameElement> = {
  title: "SDS/Hello",
  parameters: { layout: "centered" },
};
export default meta;

const redSurface: React.CSSProperties = {
  background: "var(--sds-color-background-danger-default)",
  color: "var(--sds-color-text-danger-on-danger)",
  minHeight: "100vh",
};

export const StoryHello: StoryObj<{}> = {
  name: "Hello",
  render: () => (
    <div style={redSurface} className="poc-welcome">
      <style>{`
        .poc-welcome, .poc-welcome * { color: var(--sds-color-text-danger-on-danger) !important; }
        .poc-welcome svg, .poc-welcome svg path { fill: var(--sds-color-text-danger-on-danger) !important; }
      `}</style>
      <Section>
        <Flex container type="third" alignPrimary="center">
          <FlexItem size="major">
            <Flex direction="column" gap="300">
              <Logo />
              <TextHeading>Design System Pipeline PoC</TextHeading>
              <Text>
                This proof of concept demonstrates an end-to-end design system
                pipeline: Figma as the design source, design tokens, documentation
                generated with our RubyLint plugin, Storybook, Code Connect, and
                Supernova as the source of truth.
              </Text>

              <Text>
                The target design system covers Web (React), iOS and Android, and
                other devices, with multi-theming. For this PoC, only React is in
                scope, with Light and Dark themes.
              </Text>

              <Text>
                The PoC is built on a modified version of Figma’s Simple Design
                System (SDS) with Code Connect.
              </Text>

              <TextLinkList density="tight">
                <TextListItem>
                  <TextLink href="https://github.com/titox/ds-pipeline-poc">
                    PoC GitHub Repo
                  </TextLink>
                </TextListItem>
                <TextListItem>
                  <TextLink href="https://www.figma.com/design/huu1as0pMzvGdqqDpQ5JyE/Local-%E2%80%93-Simple-Design-System?node-id=128-10284">
                    Figma Design File
                  </TextLink>
                </TextListItem>
                <TextListItem>
                  <TextLink href="https://github.com/figma/sds">
                    Upstream Figma SDS Repo
                  </TextLink>
                </TextListItem>
                <TextListItem>
                  <TextLink href="https://www.figma.com/community/file/1380235722331273046">
                    Figma SDS Community File
                  </TextLink>
                </TextListItem>
              </TextLinkList>
            </Flex>
          </FlexItem>
        </Flex>
      </Section>
    </div>
  ),
};
