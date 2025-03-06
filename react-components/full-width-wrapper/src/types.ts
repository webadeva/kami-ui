import { SerializedStyles } from "@emotion/react";
import { PropsWithChildren, ReactNode } from "react";

export interface FullWidthWrapperProps extends PropsWithChildren {
  className?: string | undefined;
  element?: "div" | "section" | "article" | "main" | "header" | "footer";
  secondContainer?: ReactNode;
  wrapperCss?: SerializedStyles;
  wrapperClassName?: string;
  isContainerCenter?: boolean;
  containerSize?: string;
  maxContentWidth?: string;
}
