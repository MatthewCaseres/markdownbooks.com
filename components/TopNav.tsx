import DarkToggle from "./DarkToggle";
import Logo from "./logo/Logo";
import Padlock from "./logo/Padlock";
import { GiSecretBook } from "react-icons/gi";
import SvgGithub from "./SideBar/SvgGithub"

export default function TopNav() {
  return (
    <div
      className=" flex flex-row justify-center items-center border-b border-black border-opacity-10 bg-gray-50 dark:bg-black h-14"
    >
      <div className="ml-2.5">
        <Logo isLink={true} scale="1" />
      </div>
      <div className="ml-8 mx-3 font-semibold text-gray-700">Docs</div>
      <div className="mx-3 font-semibold text-gray-700">Learn AWS</div>
      <div className="ml-auto flex justify-center mr-2">
        <SvgGithub className="mr-5 w-7 h-7"/>
        <DarkToggle />
      </div>
    </div>
  );
}
