import Component from "@stories/theme-shop/component";
import type { Meta, StoryObj } from "@storybook/nextjs";

const meta = {
  component: Component,
  tags: ["!dev"],
  title: "Introduction/Theme Shop",
  args: {},
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ThemeShopStory: Story = {
  args: {},
};
