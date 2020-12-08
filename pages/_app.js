import "../styles/globals.css";
import "../styles/tailwind.css";
import "katex/dist/katex.css";
import { SideBarProvider } from "../components/SideBar/SideBarContext";
import SideBar from "../components/SideBar/SideBar";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
