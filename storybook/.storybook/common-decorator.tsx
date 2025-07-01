import { CustomToastContainer, GlobalStyles } from "@common";
import { MultiThemeProvider } from "@kami-ui/react-theme";
import * as allThemes from "@kami-ui/theme-shop";
import { useEffect, useState, type PropsWithChildren } from "react";
import { createPortal } from "react-dom";
import { defaultThemeName } from "./common";
import SbThemeInjector from "./theme-injector";

const objectKeysArr = Object.keys(allThemes).filter(
  (key) => key.includes("DarkTheme") || key.includes("LightTheme"),
);

const themes = objectKeysArr.map((objKey) => ({
  name: objKey,
  theme: allThemes[objKey as keyof typeof allThemes] as allThemes.ThemeObject,
}));

const CommonDecorator = ({
  breakPoint,
  children,
}: PropsWithChildren<{
  breakPoint?: boolean;
}>) => {
  const [toastRoot, setToastRoot] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!document.body || breakPoint) return;
    const el = document.createElement("div");
    el.id = "react-toastify";
    document.body.appendChild(el);
    setToastRoot(el);
    return () => {
      document.body.removeChild(el);
      setToastRoot(null);
    };
  }, [breakPoint]);

  if (breakPoint) return children;

  return (
    <MultiThemeProvider themes={themes} defaultThemeName={defaultThemeName}>
      <SbThemeInjector />
      <GlobalStyles />
      {children}
      {toastRoot && createPortal(<CustomToastContainer />, toastRoot)}
    </MultiThemeProvider>
  );
};

export default CommonDecorator;
