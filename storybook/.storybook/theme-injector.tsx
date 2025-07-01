import { useEffect, type PropsWithChildren } from "react";

const SbThemeInjector = ({ children }: PropsWithChildren<unknown>) => {
  useEffect(() => {
    let styleElem = parent.document.querySelector(
      "head > #custom-app-style-link",
    );
    if (styleElem) return;
    styleElem = parent.document.createElement("link");
    styleElem.setAttribute("id", "custom-app-style-link");
    styleElem.setAttribute("rel", "preload stylesheet");
    styleElem.setAttribute("href", "/app-styles.css");
    parent.document.head.appendChild(styleElem);
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
    callback([], observer);
    observer.observe(document.head, {
      childList: true,
    });
    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const callback: MutationCallback = () => {
      if (!document.body.getAttribute("class")?.includes("kami-ui")) return;
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

  return children;
};

export default SbThemeInjector;
