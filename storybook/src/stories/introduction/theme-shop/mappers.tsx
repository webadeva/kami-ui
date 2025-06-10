import * as shop from "@kami-ui/theme-shop";
import { copyBtnCss } from "@stories/introduction/theme-shop/styles";
import {
  copyToClipboard,
  getThemeName,
} from "@stories/introduction/theme-shop/utils";
import { Fragment, type MouseEventHandler } from "react";
import { toast } from "react-toastify";

export const objectKeysArr = Object.keys(shop).filter(
  (key) =>
    !(
      key.includes("DarkColors") ||
      key.includes("DarkTheme") ||
      key.includes("LightColors") ||
      key.includes("LightTheme") ||
      key.includes("Spacing") ||
      key.includes("Typography") ||
      key.includes("defaultCommonColors")
    ),
);

export const colorBlockMapper = (color: string, index: number) => {
  const size = 30;
  return (
    <div
      css={{
        height: `${size}px`,
        width: `${size}px`,
        backgroundColor: color,
      }}
      key={`${index}-${color}`}
    />
  );
};

export const colorMapper = (colorObject: shop.ColorsObject) => {
  const mapperFn = (colorObjKey: string, index: number) => {
    if (
      colorObjKey.includes("text") ||
      colorObjKey.includes("background") ||
      colorObjKey.includes("gray") ||
      colorObjKey.includes("success") ||
      colorObjKey.includes("warning") ||
      colorObjKey.includes("info") ||
      colorObjKey.includes("error") ||
      colorObjKey.includes("neutral")
    )
      return null;
    const colorArr = colorObject[colorObjKey as keyof typeof colorObject] ?? [];
    if (!Array.isArray(colorArr)) return null;
    return (
      <div key={`${colorObjKey}-${index}`}>
        <h4>{colorObjKey}</h4>
        <div css={{ width: "100%", display: "flex", gap: "0.5rem" }}>
          {colorArr.map(colorBlockMapper)}
        </div>
      </div>
    );
  };
  return mapperFn;
};

export const shopItemsMapper = (key: string, index: number) => {
  const theme = shop[key as keyof typeof shop];

  if (!Array.isArray(theme)) return null;

  const [darkThemeObj] = theme;

  if (!darkThemeObj) return null;

  const {
    theme: { colors: darkThemeColors },
  } = darkThemeObj;

  const copyNameClickHandler: MouseEventHandler<HTMLButtonElement> = () => {
    const fn = async () => {
      try {
        await copyToClipboard(key);
        toast.success("Successfully copied theme name");
      } catch (err) {
        toast.error("Copy failed");
        console.error("Copy failed:", err);
      }
    };
    void fn();
  };

  return (
    <Fragment key={`shop-item-${index}`}>
      <div css={{ width: "100%" }}>
        <div
          css={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <h2>{`${index + 1}. ${getThemeName(key)}`}</h2>
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
          {Object.keys(darkThemeColors).map(colorMapper(darkThemeColors))}
        </div>
      </div>
      {objectKeysArr.length - 1 !== index && (
        <hr css={{ margin: "3rem 0 1.5rem 0" }} />
      )}
    </Fragment>
  );
};
