/** @jsxImportSource @emotion/react */

import { objectKeysArr, shopItemsMapper } from "@stories/theme-shop/mappers";
import { loaderCss } from "@stories/theme-shop/styles";
import { useEffect, useRef, useState } from "react";

const Component = () => {
  const observerRef = useRef<HTMLDivElement>(null);
  const [visibleItems, setVisibleItems] = useState<number>(10);
  useEffect(() => {
    const callback: IntersectionObserverCallback = (entries, obv) => {
      const { isIntersecting } = entries?.[0] ?? ({} as never);
      if (!isIntersecting) return;
      setVisibleItems((prevItems) => {
        const newNum = prevItems + 10;
        if (newNum < objectKeysArr.length) {
          return newNum;
        }
        obv.disconnect();
        return objectKeysArr.length;
      });
    };
    const observer = new IntersectionObserver(callback, {
      threshold: 1,
    });
    if (observerRef.current) {
      observer.observe(observerRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, []);
  return (
    <div
      css={{
        width: "100%",
        fontFamily: `"Nunito Sans", -apple-system, ".SFNSText-Regular", "San Francisco", BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Helvetica, Arial, sans-serif`,
      }}
    >
      {objectKeysArr.slice(0, visibleItems).map(shopItemsMapper)}
      <div css={{ height: "1px", width: "100%" }} ref={observerRef} />
      {visibleItems !== objectKeysArr.length && (
        <div css={{ width: "100%", display: "flex" }}>
          <div className="loader" css={loaderCss} />
        </div>
      )}
    </div>
  );
};

export default Component;
