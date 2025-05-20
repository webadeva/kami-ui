import {
  detectColorScheme,
  stringTrimmer,
  themeBuilder,
  themeValidator,
  useIsomorphicLayoutEffect,
} from "@kami-ui/react-theme-common";
import type { MultiThemeProviderProps } from "@kami-ui/types";
import { useAmp } from "next/amp";
import Head from "next/head";
import { ThemeContext } from "./context";

const PreChildren = ({ themes }: Pick<MultiThemeProviderProps, "themes">) => {
  useIsomorphicLayoutEffect(() => {
    if (!document?.body) return;
    const savedScheme = detectColorScheme();
    let notHasBodyClass = true;
    for (const bodyClass of Array.from(document.body.classList)) {
      if (bodyClass.startsWith("kami-ui-")) {
        notHasBodyClass = false;
        break;
      }
    }
    const themeIndexRaw = themes.findIndex(({ name }) =>
      name.includes(savedScheme),
    );
    const themeIndex = themeIndexRaw === -1 ? 0 : themeIndexRaw;
    if (notHasBodyClass && themes[themeIndex]?.name) {
      document.body.classList.add(
        `kami-ui-${stringTrimmer(themes[themeIndex].name)}`,
      );
    }
  }, []);

  return <></>;
};

const MultiThemeProvider = ({
  themes = [],
  injectInBody = false,
  disableConsole = false,
  disableOnAmp = true,
  autoMaintainTheme = true,
  children,
}: MultiThemeProviderProps) => {
  const isAmp = useAmp();
  themeValidator(themes);
  const styles = themes
    .map(({ name, theme }) => themeBuilder(theme, name))
    .join("");
  const styleElem = (
    <style id="kami-ui-styles" dangerouslySetInnerHTML={{ __html: styles }} />
  );
  const elem = injectInBody ? styleElem : <Head>{styleElem}</Head>;
  const value = { themes, disableConsole };

  return (
    <ThemeContext.Provider value={value}>
      {autoMaintainTheme && <PreChildren themes={themes} />}
      {!(disableOnAmp && isAmp) && elem}
      {children}
    </ThemeContext.Provider>
  );
};

export { MultiThemeProvider };
