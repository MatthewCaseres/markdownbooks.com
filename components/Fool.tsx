import router from "next/router";
import { useEffect } from "react";

const Fool = () => {
  useEffect(() => {
    const handleRouteChange = () => router.push(router.asPath);
    router.events.on("routeChangeComplete", handleRouteChange);
    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, []);
  return <div>LOL</div>;
};
export default Fool;
