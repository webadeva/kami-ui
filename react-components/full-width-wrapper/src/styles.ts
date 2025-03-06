import { css } from "@emotion/react";

export const fullWidthWrapperCss = (isCenter: boolean) => css`
  width: 100%;
  display: flex;
  ${isCenter ? "justify-content: center;" : ""}
  ${isCenter ? "align-items: center;" : ""}
`;

export const fullWidthContainerCss = (
  containerSize: string,
  maxContentWidth: string,
) => css`
  max-width: var(--max-content-width, ${maxContentWidth});
  width: ${containerSize};
`;
