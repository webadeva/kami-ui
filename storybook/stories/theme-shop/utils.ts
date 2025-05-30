export const getThemeName = (str: string) =>
  str
    .replace(/Theme$/, "")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/^./, (c) => c.toUpperCase());
