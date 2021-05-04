import DarkToggle from "./DarkToggle";
import Logo from "./logo/Logo";
import SvgGithub from "./SideBar/SvgGithub";

export default function TopNav() {
  return (
    <div className="flex flex-row justify-center items-center border-b border-black border-opacity-10 bg-gray-50 dark:bg-black h-14">
      
        <div className="ml-2.5">
        
          <Logo isLink={true} scale="1" />

        </div>
      <div className="ml-auto flex justify-center mr-2">
        <a
        href="https://github.com/MatthewCaseres"
        target="_blank"
        rel="noopener noreferrer"
      >
        <SvgGithub className="mr-5 w-7 h-7" />
      </a>

        <DarkToggle />
      </div>
    </div>
  );
}
