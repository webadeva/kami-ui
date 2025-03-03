import type { BorderRadiusArray, BreakpointSize, FontSizeArray, ThemeObject } from "@kami-ui/types";
import { stringTrimmer } from "../utils";

const colorBuilder = (colorsProp: ThemeObject["colors"]) => {
  let vars = "";
  if (!colorsProp) return vars;
  const colors: ThemeObject["colors"] = {
    white: "#fff",
    black: "#000",
    ...colorsProp,
  };
  for (const colorKey in colors) {
    const colorArr = colors[colorKey as keyof ThemeObject["colors"]];
    if (!colorArr) continue;
    if (typeof colorArr === "string") {
      vars += `--color-${colorKey}:${colorArr};`;
      continue;
    }
    for (let i = 0; i < (colorArr?.length ?? 0); i++) {
      vars += `--color-${colorKey}-${(i + 1) * 100}:${colorArr[i]};`;
    }
  }
  return vars;
};

const typographyBuilder = (typography: ThemeObject["typography"]) => {
  let vars = "";
  let outsideVars = "";
  if (!typography) return { vars, outsideVars };
  const { fontSizes, fontFamilies } = typography;
  if (fontFamilies) {
    for (const fontFamily in fontFamilies) {
      vars += `--font-${fontFamily}:${fontFamilies[fontFamily as keyof typeof fontFamilies]};`;
    }
  }
  const len = fontSizes?.length;
  if (!len && typeof fontSizes === "object") return { vars, outsideVars };
  const sizeArr = ["4xs", "3xs", "2xs", "1xs", "s", "m", "l", "1xl", "2xl", "3xl", "4xl"];
  const getSizeArStart = (fontSizeLength: number): number => {
    switch (fontSizeLength) {
      case 7:
        return 2;
      case 9:
        return 1;
      case 11:
        return 0;
      default:
        return 0;
    }
  };
  switch (typeof fontSizes[0]) {
    case "string":
      try {
        for (let i = 0; i < len; i++) {
          vars += `--fs-${sizeArr[i + getSizeArStart(len)]}:${fontSizes[i] as string};`;
        }
      } catch {
        // todo
      }
      break;
    case "object":
      try {
        for (const { breakpoint, size } of fontSizes as BreakpointSize<FontSizeArray>[]) {
          outsideVars += "@media ";
          const conditions = [];
          if (breakpoint?.min) {
            conditions.push(`(min-width:${breakpoint.min})`);
          }
          if (breakpoint?.max) {
            conditions.push(`(max-width:${breakpoint.max})`);
          }
          if (breakpoint?.orientation) {
            conditions.push(`(orientation:${breakpoint.orientation})`);
          }
          outsideVars += conditions.join(" and ");
          outsideVars += "{ <START>";
          try {
            for (let i = 0; i < size.length; i++) {
              outsideVars += `--fs-${sizeArr[i + getSizeArStart(size.length)]}:${size[i]};`;
            }
          } catch {
            // todo
          }
          outsideVars += "}}";
        }
      } catch {
        // todo
      }
      break;
    default:
      // todo
      break;
  }
  return { vars, outsideVars };
};

const spacingBuilder = (spacing: ThemeObject["spacing"]) => {
  let vars = "";
  let outsideVars = "";
  if (!spacing) return { vars, outsideVars };
  if (spacing?.borderRadius) {
    const sizeArr = ["2xs", "1xs", "s", "m", "l", "1xl", "2xl"];
    const br = spacing.borderRadius;
    const getSizeArStart = (fontSizeLength: number): number => {
      switch (fontSizeLength) {
        case 3:
          return 2;
        case 5:
          return 1;
        case 7:
          return 0;
        default:
          return 0;
      }
    };
    const len = br.length;
    switch (br[0]) {
      case "string":
        try {
          for (let i = 0; i < len; i++) {
            vars += `--br-${sizeArr[i + getSizeArStart(len)]}:${br[i] as string};`;
          }
        } catch {
          // todo
        }
        break;
      case "object":
        try {
          for (const { breakpoint, size } of br as BreakpointSize<BorderRadiusArray>[]) {
            vars += "@media ";
            if (breakpoint?.min) {
              vars += `and (min-width:${breakpoint.min}) `;
            }
            if (breakpoint?.max) {
              vars += `and (max-width:${breakpoint.max}) `;
            }
            if (breakpoint?.orientation) {
              vars += `and (orientation:${breakpoint.orientation}) `;
            }
            vars += "{";
            try {
              for (let i = 0; i < size.length; i++) {
                vars += `--br-${sizeArr[i + getSizeArStart(size.length)]}:${size[i]};`;
              }
            } catch {
              // todo
            }
            vars += "}";
          }
        } catch {
          // todo
        }
        break;
      default:
        // todo
        break;
    }
  }
  const defaultSpacing = [
    "0px",
    "2px",
    "4px",
    "8px",
    "12px",
    "16px",
    "20px",
    "24px",
    "28px",
    "32px",
    "36px",
    "40px",
    "44px",
    "48px",
    "52px",
    "64px",
    "72px",
    "80px",
    "88px",
    "96px",
  ];
  const { space = defaultSpacing } = spacing;
  switch (typeof space[0]) {
    case "string":
      try {
        for (let i = 0; i < space.length; i++) {
          vars += `--space-${i}:${space[i] as string};`;
        }
      } catch {
        // todo
      }
      break;
    case "object":
      try {
        for (const { breakpoint, size } of space as BreakpointSize<string[]>[]) {
          outsideVars += "@media ";
          if (breakpoint?.min) {
            outsideVars += `and (min-width:${breakpoint.min}) `;
          }
          if (breakpoint?.max) {
            outsideVars += `and (max-width:${breakpoint.max}) `;
          }
          if (breakpoint?.orientation) {
            outsideVars += `and (orientation:${breakpoint.orientation}) `;
          }
          outsideVars += "{ <START>";
          try {
            for (let i = 0; i < size.length; i++) {
              outsideVars += `--space-${i}:${size[i]};`;
            }
          } catch {
            // todo
          }
          outsideVars += "}}";
        }
      } catch {
        // todo
      }
      break;
    default:
      // todo
      break;
  }
  return { vars, outsideVars };
};

const themeBuilder = (theme: ThemeObject, mode?: string): string => {
  if (!theme) return "";
  const { colors: c, typography: t, spacing: s } = theme;
  const colors = colorBuilder(c);
  const { vars: spacingVars, outsideVars: spacingOutsideVars } = spacingBuilder(s);
  const { vars: typographyVars, outsideVars: typographyOutsideVars } = typographyBuilder(t);
  const start = mode ? `body.kami-ui-${stringTrimmer(mode)}` : `:root`;
  let formattedVars = `${start}{${colors}${typographyVars}${spacingVars}}`;
  formattedVars += typographyOutsideVars.replace("<START>", `${start}{`);
  formattedVars += spacingOutsideVars.replace("<START>", `${start}{`);
  return formattedVars;
};

export default themeBuilder;
