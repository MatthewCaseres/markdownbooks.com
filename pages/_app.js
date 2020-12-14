import "../styles/globals.css";
import "../styles/tailwind.css";
import "katex/dist/katex.css";
import { SideBarProvider } from "../components/SideBar/SideBarContext";
import SideBar from "../components/SideBar/SideBar";
import Fool from "../components/Fool";
import router from "next/router";

function MyApp({ Component, pageProps }) {
  return (
    <>
    {/* <Fool /> */}
  <Component {...pageProps} />
    </>
  )
}

export default MyApp;
