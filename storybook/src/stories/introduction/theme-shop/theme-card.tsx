import { Button } from "@kami-ui/react-components";
import { useTheme } from "@kami-ui/react-theme";
import { copyToClipboard } from "@stories/introduction/theme-shop/utils";
import { type MouseEventHandler, type ReactNode } from "react";
import { toast } from "react-toastify";

const ThemeCard = ({
  title,
  themeName,
  items,
}: {
  title: string;
  themeName: string;
  items: (ReactNode | null)[];
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
        <Button onClick={changeHandler("dark")}>Try this theme in dark</Button>
        <Button onClick={changeHandler("light")}>
          Try this theme in light
        </Button>
        <Button onClick={copyNameClickHandler}>
          <span>Copy Theme Name</span>
          <span>📋</span>
        </Button>
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
