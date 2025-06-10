export const getThemeName = (str: string) =>
  str
    .replace(/Theme$/, "")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/^./, (c) => c.toUpperCase());

export const copyToClipboard = async (text: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      parent.navigator.clipboard.writeText(text).then(resolve).catch(reject);
    } catch (err) {
      reject(new Error((err as string) ?? ""));
    }
  });
};
