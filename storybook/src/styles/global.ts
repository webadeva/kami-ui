import { css } from "@emotion/react";

const globalStyles = css`
  body {
    color: var(--color-text-900);
    box-sizing: border-box;

    --border-color: var(--color-gray-800);
  }
  .sbdocs-wrapper,
  .sbdocs-preview {
    background-color: var(--color-background-100);
  }
  .sbdocs-preview {
    border: 1px solid var(--border-color);
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  span {
    color: var(--color-text-900) !important;
  }
`;

export default globalStyles;
