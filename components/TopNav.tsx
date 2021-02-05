import DarkToggle from "./DarkToggle";
import Logo from "./logo/Logo";

export default function TopNav() {
  return (
    <div
      className="flex flex-row justify-center bg-indigo-100 dark:bg-black"
    >
      <div className="ml-2.5">
        <Logo isLink={true} scale="1.2" />
      </div>
      <div className="ml-auto flex flex-col justify-center mr-2">
        <DarkToggle />
      </div>
    </div>
  );
}
