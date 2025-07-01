import CommonDecorator from ".storybook/common-decorator";
import type { Preview } from "@storybook/react-vite";

const StoryDecorator: Preview["decorators"] = (Story) => {
  return (
    <CommonDecorator>
      <Story />
    </CommonDecorator>
  );
};

export default StoryDecorator;
