import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const SbThemeInjector = () => {
  const [customRoot, setCustomRoot] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    let rootElem = parent.document.querySelector("body > #custom-globals");
    if (!rootElem) {
      const tempElem = parent.document.createElement("div");
      tempElem.id = "custom-root";
      parent.document.body.appendChild(tempElem);
      rootElem = tempElem;
    }
    setCustomRoot(rootElem as HTMLDivElement);
    return () => {
      parent.document.body.removeChild(rootElem);
      setCustomRoot(null);
    };
  }, []);

  useEffect(() => {
    const callback: MutationCallback = () => {
      const styles = document.querySelector("#kami-ui-styles")?.innerHTML;
      if (!styles) return;
      let newStyleElem = parent.document.head.querySelector("#kami-ui-styles");
      if (!newStyleElem) {
        const tempElem = parent.document.createElement("style");
        tempElem.id = "kami-ui-styles";
        parent.document.head.appendChild(tempElem);
        newStyleElem = tempElem;
      }
      newStyleElem.innerHTML = styles;
    };
    const observer = new MutationObserver(callback);
    observer.observe(document.head, {
      childList: true,
    });
    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const callback: MutationCallback = () => {
      for (const parentBodyClass of parent.document.body.classList) {
        if (parentBodyClass.includes("kami-ui")) {
          parent.document.body.classList.remove(parentBodyClass);
        }
      }
      for (const bodyClass of document.body.classList) {
        if (bodyClass.includes("kami-ui")) {
          parent.document.body.classList.add(bodyClass);
        }
      }
    };
    const observer = new MutationObserver(callback);
    observer.observe(document.body, {
      attributes: true,
    });
    callback([], observer);
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {customRoot &&
        createPortal(
          <link rel="stylesheet" href="/app-styles.css" />,
          customRoot,
          "custom-root",
        )}
    </>
  );
};

export default SbThemeInjector;
