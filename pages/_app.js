import "../styles/globals.css";
import "../styles/tailwind.css";
import "katex/dist/katex.css";
import router from "next/router";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const handleRouteChange = () => {
      setTimeout(() => {
        if (router.asPath.includes("#")) {
          router.push(router.asPath);
        } else {
          window.scrollTo(0, 0);
        }
      }, 300);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, []);
  return (
    <div className="dark:bg-black">
        <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
