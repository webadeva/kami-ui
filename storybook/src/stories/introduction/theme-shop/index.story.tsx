import Component from "@stories/introduction/theme-shop/component";
import type { Meta, StoryObj } from "@storybook/react-vite";

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
