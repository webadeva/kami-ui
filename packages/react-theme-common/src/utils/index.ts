import { MultiThemeProviderProps } from "@kami-ui/types";

export const stringTrimmer = (str: string) => {
  return str.trim().replace(/\s/gm, "-");
};

export const themeValidator = (themes: MultiThemeProviderProps["themes"]) => {
  const checkedNames: string[] = [];
  const colorKeys: string[] = [];
  for (const {
    name,
    theme: { colors },
  } of themes) {
    type ColorKey = keyof typeof colors;
    const currColorKeys = JSON.stringify(Object.keys(colors).sort());
    const keyCheck =
      colorKeys.length === 0
        ? colorKeys.push(currColorKeys)
        : colorKeys[0] !== currColorKeys;
    if (keyCheck === true) {
      throw new Error(
        `Invalid theme config: Themes have different color keys;`,
      );
    }
    if (checkedNames.includes(name)) {
      throw new Error(`Theme name ${name} is duplicated`);
    }
    checkedNames.push(name);
    for (const color in colors) {
      const length = colors[color as ColorKey]?.length;
      for (const checked of checkedNames) {
        const checkedLen = themes.find(({ name: checkedName }) => {
          return checkedName === checked;
        })?.theme?.colors[color as ColorKey]?.length;
        if (checkedLen !== length) {
          throw new Error(
            `Invalid theme config: Themes have different lengths of color ${color};`,
          );
        }
      }
    }
  }
};

const themeModeLocalStorageKey = "preferred-color-scheme";

export const saveColorScheme = (themeMode: string) => {
  localStorage.setItem(themeModeLocalStorageKey, themeMode);
};

export const getSavedThemeScheme = () => {
  return localStorage.getItem(themeModeLocalStorageKey);
};

export const detectColorScheme = (
  defaultScheme: "dark" | "light" = "light",
): "dark" | "light" => {
  try {
    if (!window) return defaultScheme;
    const savedScheme = getSavedThemeScheme();
    if (savedScheme) {
      return savedScheme as "dark" | "light";
    }
    if (!window.matchMedia) {
      saveColorScheme(defaultScheme);
      return defaultScheme;
    }
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      saveColorScheme("dark");
      return "dark";
    }
    saveColorScheme("light");
    return "light";
  } catch {
    return defaultScheme;
  }
};
