import { useTheme } from "@kami-ui/react-theme";
import { copyBtnCss } from "@stories/introduction/theme-shop/styles";
import { copyToClipboard } from "@stories/introduction/theme-shop/utils";
import type { EmotionJSX } from "node_modules/@emotion/react/dist/declarations/src/jsx-namespace";
import { type MouseEventHandler } from "react";
import { toast } from "react-toastify";

const ThemeCard = ({
  title,
  themeName,
  items,
}: {
  title: string;
  themeName: string;
  items: (EmotionJSX.Element | null)[];
}) => {
  const { updateTheme } = useTheme();
  const changeHandler = (mode: "light" | "dark") => () => {
    const theme = themeName.replace("Theme", "");
    switch (mode) {
      case "dark":
        updateTheme(`${theme}DarkTheme`);
        break;
      case "light":
        updateTheme(`${theme}LightTheme`);
        break;
    }
  };
  const copyNameClickHandler: MouseEventHandler<HTMLButtonElement> = () => {
    const fn = async () => {
      try {
        await copyToClipboard(themeName);
        toast.success("Successfully copied theme name");
      } catch (err) {
        toast.error("Copy failed");
        console.error("Copy failed:", err);
      }
    };
    void fn();
  };
  return (
    <div css={{ width: "100%" }}>
      <div
        css={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <h2 css={{ marginRight: "auto" }}>{title}</h2>
        <button css={copyBtnCss} type="button" onClick={changeHandler("dark")}>
          <span>Try this theme in dark</span>
        </button>
        <button css={copyBtnCss} type="button" onClick={changeHandler("light")}>
          <span>Try this theme in light</span>
        </button>
        <button css={copyBtnCss} type="button" onClick={copyNameClickHandler}>
          <span>Copy Theme Name</span>
          <span>📋</span>
        </button>
      </div>
      <div
        css={{
          padding: "0 1rem",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1rem",
        }}
      >
        {items}
      </div>
    </div>
  );
};

export default ThemeCard;
