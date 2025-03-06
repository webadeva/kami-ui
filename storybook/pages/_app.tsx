import { Global } from "@emotion/react";
import {
  MultiThemeProvider,
  MultiThemeProviderProps,
} from "@kami-ui/next-theme";
import globalStyles from "@styles/global";
import type { AppProps } from "next/app";

export const GlobalStyles = () => <Global styles={globalStyles} />;
export const themeObj: MultiThemeProviderProps["themes"] = [
  {
    name: "light",
    theme: {
      colors: {
        black: "#123",
        primary: [
          "#382bf0",
          "#5e43f3",
          "#7a5af5",
          "#9171f8",
          "#a688fa",
          "#bc9ffd",
        ],
        secondary: [],
      },
    },
  },
  {
    name: "dark",
    theme: {
      colors: {
        primary: [
          "#1a1625",
          "#2d2638",
          "#3f3a4b",
          "#51425e",
          "#635571",
          "#756984",
        ],
        secondary: [],
        black: "#fff",
      },
    },
  },
];

const App = ({ Component, pageProps }: AppProps) => (
  <MultiThemeProvider themes={themeObj}>
    <GlobalStyles />
    <Component {...pageProps} />
  </MultiThemeProvider>
);

export default App;
