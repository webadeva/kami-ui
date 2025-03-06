import { jsx } from "@emotion/react";
import { forwardRef, JSX, Ref } from "react";
import { fullWidthContainerCss, fullWidthWrapperCss } from "./styles";
import { FullWidthWrapperProps } from "./types";

const FullWidthWrapperWithoutRef = (
  {
    containerSize = "90%",
    maxContentWidth = "1800px",
    className,
    children,
    element = "section",
    secondContainer,
    wrapperClassName,
    wrapperCss,
    isContainerCenter = true,
  }: FullWidthWrapperProps,
  ref: Ref<HTMLElement>,
) => {
  const innerElement = jsx(
    "div",
    {
      css: [fullWidthContainerCss(containerSize, maxContentWidth)],
      className,
    },
    children,
  );
  const outerElement = jsx(
    element,
    {
      className: wrapperClassName,
      css: [fullWidthWrapperCss(isContainerCenter), wrapperCss],
      ref,
    },
    innerElement,
    secondContainer,
  );
  return outerElement as JSX.Element;
};

export const FullWidthWrapper = forwardRef(FullWidthWrapperWithoutRef);

export type * from "./types";
