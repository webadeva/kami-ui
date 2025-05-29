/** @jsxImportSource @emotion/react */

import * as shop from "@kami-ui/theme-shop";
import { Fragment } from "react";

const getThemeName = (str: string) =>
  str
    .replace(/Theme$/, "")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/^./, (c) => c.toUpperCase());

const colorBlockMapper = (color: string, index: number) => {
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

const colorMapper =
  // eslint-disable-next-line react/display-name -- not a component
  (colorObject: shop.ColorsObject) => (colorObjKey: string, index: number) => {
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

const mapper = (key: string, index: number) => {
  if (
    key.includes("DarkColors") ||
    key.includes("DarkTheme") ||
    key.includes("LightColors") ||
    key.includes("LightTheme") ||
    key.includes("Spacing") ||
    key.includes("Typography")
  )
    return;

  const theme = shop[key as keyof typeof shop];

  if (!Array.isArray(theme)) return null;

  const [darkThemeObj] = theme;

  if (!darkThemeObj) return null;

  const {
    theme: { colors: darkThemeColors },
  } = darkThemeObj;

  return (
    <Fragment key={`shop-item-${index}`}>
      <div css={{ width: "100%" }}>
        <h2>{getThemeName(key)}</h2>
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
      <hr css={{ margin: "3rem 0 1.5rem 0" }} />
    </Fragment>
  );
};

const Component = () => {
  return (
    <div
      css={{
        width: "100%",
        fontFamily: `"Nunito Sans", -apple-system, ".SFNSText-Regular", "San Francisco", BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Helvetica, Arial, sans-serif`,
      }}
    >
      {Object.keys(shop).map(mapper)}
    </div>
  );
};

export default Component;
