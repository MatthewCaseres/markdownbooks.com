import "../styles/globals.css";
import "../styles/tailwind.css";
import "katex/dist/katex.css";
import router from "next/router";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const handleRouteChange = (url) => {
      setTimeout(() => {
        if (url.includes("#")) {
          router.push(router.asPath);
        } else {
          window.scrollTo(0, 0);
        }
      }, 300);
    };
    const handleHashChange = (url) => {
      if (!url.includes("#")) {
        window.scrollTo(0, 0);
      }
    }
    router.events.on("routeChangeComplete", handleRouteChange);
    router.events.on("hashChangeComplete", handleHashChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    router.events.off("hashChangeComplete", handleHashChange);

    };
  }, []);
  return (
    <div className="dark:bg-black">
        <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
