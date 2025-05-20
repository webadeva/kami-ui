import { Global } from "@emotion/react";
import { MultiThemeProvider } from "@kami-ui/next-theme";
import { defaultTheme } from "@kami-ui/theme-shop";
import globalStyles from "@styles/global";
import type { AppProps } from "next/app";
import { FC } from "react";

export const GlobalStyles: FC<unknown> = () => <Global styles={globalStyles} />;

const App = ({ Component, pageProps }: AppProps) => (
  <MultiThemeProvider themes={defaultTheme}>
    <GlobalStyles />
    <Component {...pageProps} />
  </MultiThemeProvider>
);

export default App;
