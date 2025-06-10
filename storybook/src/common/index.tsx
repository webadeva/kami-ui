import { Global } from "@emotion/react";
import globalStyles from "@styles/global";
import type { FC } from "react";
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
