export const getThemeName = (str: string) =>
  str
    .replace(/Theme$/, "")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/^./, (c) => c.toUpperCase());

export const copyToClipboard = async (text: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      const textArea = parent.document.createElement("textarea");
      textArea.value = text;

      textArea.style.position = "fixed";
      textArea.style.top = "0";
      textArea.style.left = "-9999px";
      textArea.setAttribute("readonly", "true");

      parent.document.body.appendChild(textArea);
      textArea.select();

      const successful = parent.document.execCommand("copy");
      parent.document.body.removeChild(textArea);

      return successful ? resolve() : reject(new Error("Copy failed!"));
    } catch (err) {
      reject(new Error((err as string) ?? ""));
    }
  });
};
