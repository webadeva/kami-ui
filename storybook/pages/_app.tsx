import { Global } from "@emotion/react";
import { MultiThemeProvider } from "@kami-ui/next-theme";
import { defaultTheme } from "@kami-ui/theme-shop";
import globalStyles from "@styles/global";
import type { AppProps } from "next/app";
import { FC } from "react";
import { Slide, ToastContainer } from "react-toastify";

export const GlobalStyles: FC<unknown> = () => <Global styles={globalStyles} />;

export const CustomToastContainer = () => (
  <ToastContainer
    position="bottom-center"
    autoClose={2500}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick={true}
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="dark"
    transition={Slide}
  />
);

const App = ({ Component, pageProps }: AppProps) => (
  <MultiThemeProvider themes={defaultTheme}>
    <GlobalStyles />
    <Component {...pageProps} />
    <CustomToastContainer />
  </MultiThemeProvider>
);

export default App;
