import { useEffect, useState } from "react";

const useAmp = () => {
  const [isAmp, setIsAmp] = useState(() => {
    // SSR Detection - try to detect from various global contexts
    if (typeof window === "undefined") {
      try {
        // Method 1: Check Next.js context (if available)
        if (
          typeof (globalThis as any) !== "undefined" &&
          (globalThis as any)?.__NEXT_DATA__
        ) {
          const nextData = (globalThis as any)?.__NEXT_DATA__;
          if (!!nextData?.query && !!nextData?.query?.amp) {
            return true;
          }
        }

        // Method 2: Check common server request objects
        let requestUrl = "";

        // Express.js style
        if (!!(globalThis as any)?.req && !!(globalThis as any)?.req?.url) {
          requestUrl = (globalThis as any)?.req?.url;
        }
        // Other frameworks might store request differently
        else if (
          !!(globalThis as any)?.request &&
          !!(globalThis as any)?.request.url
        ) {
          requestUrl = (globalThis as any)?.request?.url;
        }
        // Remix style
        else if (
          !!(globalThis as any)?.__remix_request &&
          (globalThis as any)?.__remix_request?.url
        ) {
          requestUrl = (globalThis as any)?.__remix_request?.url;
        }
        // Vite SSR
        else if (
          !!(globalThis as any)?.__vite_ssr_request &&
          !!(globalThis as any)?.__vite_ssr_request?.url
        ) {
          requestUrl = (globalThis as any)?.__vite_ssr_request?.url;
        }

        if (requestUrl) {
          const url = new URL(requestUrl, "http://localhost");
          const hasAmpParam = url.searchParams.get("amp") === "1";
          const hasAmpPath =
            url.pathname.includes("/amp/") || url.pathname.endsWith("/amp");
          return hasAmpParam || hasAmpPath;
        }

        // Method 3: Check environment variables or process context
        if (typeof process !== "undefined" && process.env) {
          // Some frameworks set AMP mode in env
          if (
            process.env.AMP_MODE === "true" ||
            process.env.NEXT_AMP === "true"
          ) {
            return true;
          }
        }

        return false;
      } catch {
        // Fail silently on SSR
        return false;
      }
    }

    return false;
  });

  useEffect(() => {
    // Client-side detection (runs after hydration)
    const checkAmpStatus = () => {
      // Method 1: Check URL parameter (?amp=1 or /amp/)
      const url = new URL(window.location.href);
      const hasAmpParam = url.searchParams.get("amp") === "1";
      const hasAmpPath =
        url.pathname.includes("/amp/") || url.pathname.endsWith("/amp");

      // Method 2: Check for AMP runtime
      const hasAmpRuntime = typeof (window as any)?.AMP !== "undefined";

      // Method 3: Check for AMP-specific elements
      const hasAmpBoilerplate =
        document.querySelector("style[amp-boilerplate]") !== null;
      const hasAmpCustom = document.querySelector("style[amp-custom]") !== null;

      // Method 4: Check document type/attributes
      const hasAmpAttribute =
        document.documentElement.hasAttribute("amp") ||
        document.documentElement.hasAttribute("⚡");

      // Method 5: Check meta tags
      const hasAmpMeta = document.querySelector('meta[name="amp"]') !== null;

      return (
        hasAmpParam ||
        hasAmpPath ||
        hasAmpRuntime ||
        hasAmpBoilerplate ||
        hasAmpCustom ||
        hasAmpAttribute ||
        hasAmpMeta
      );
    };

    // Update state with client-side detection
    setIsAmp(checkAmpStatus());

    // Listen for URL changes (for SPAs)
    const handleLocationChange = () => {
      setIsAmp(checkAmpStatus());
    };

    // Listen for popstate events (back/forward navigation)
    window.addEventListener("popstate", handleLocationChange);

    return () => {
      window.removeEventListener("popstate", handleLocationChange);
    };
  }, []);

  return isAmp;
};
export default useAmp;
