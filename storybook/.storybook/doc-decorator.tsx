import CommonDecorator from ".storybook/common-decorator";
import { DocsContainer } from "@storybook/addon-docs/blocks";

const DocDecorator: typeof DocsContainer = ({ children, context }) => {
  return (
    <CommonDecorator>
      <DocsContainer context={context}>{children}</DocsContainer>
    </CommonDecorator>
  );
};

export default DocDecorator;
