import DarkToggle from "../DarkToggle";
import Logo from "../logo/Logo";

export default function TopNav() {
  return (
    <div className="flex flex-row justify-center">
      <div className="ml-2.5">
        <Logo scale="1.2" />
      </div>
      <div className="ml-auto flex flex-col justify-center mr-2">
        <DarkToggle />
      </div>
    </div>
  );
}
