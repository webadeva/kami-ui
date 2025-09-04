import { SerializedStyles } from "@emotion/react";
import type React from "react";
import type { PropsWithChildren, ReactNode } from "react";

export interface FullWidthWrapperProps extends PropsWithChildren {
  className?: string | undefined;
  element?: keyof React.JSX.IntrinsicElements;
  secondContainer?: ReactNode;
  wrapperCss?: SerializedStyles;
  wrapperClassName?: string;
  isContainerCenter?: boolean;
  containerSize?: string;
  maxContentWidth?: string;
}
