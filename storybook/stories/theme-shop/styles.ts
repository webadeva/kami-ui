import { css } from "@emotion/react";

export const loaderCss = css`
  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: inline-block;
  border-top: 3px solid #3b3b3b;
  border-right: 3px solid transparent;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
  margin: 0 auto;
`;

export const copyBtnCss = css`
  display: flex;
  gap: 0.25em;
  height: fit-content;
  width: fit-content;
  padding: 0.5em 1em;
  background-color: transparent;
  border: 1px solid gray;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background-color: rgba(0, 0, 0, 0.125);
    border: 1px solid rgba(0, 0, 0, 0.125);
    border-radius: 10px;
  }
`;
