import { themeBuilder } from "@kami-ui/react-theme-common";
import type { ThemeProviderProps } from "@kami-ui/types";
import { useEffect } from "react";
import useAmp from "./use-amp";

export const ThemeProvider = ({
  injectInBody = false,
  disableOnAmp = true,
  theme,
  mode,
  children,
}: ThemeProviderProps) => {
  const isAmp = useAmp();
  const styles = themeBuilder(theme, mode);

  const showElem = !(disableOnAmp && isAmp);

  useEffect(() => {
    if (!showElem || !document) return;
    const styleElem = document.createElement("style");
    styleElem.id = "kami-ui-styles";
    styleElem.innerHTML = styles;
    const parent = injectInBody ? document.body : document.head;
    parent.appendChild(styleElem);
    return () => {
      parent.removeChild(styleElem);
    };
  }, [showElem, injectInBody, styles]);

  return children;
};
