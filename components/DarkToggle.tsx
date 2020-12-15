import React, {
  createContext,
  useContext,
  useEffect,
  Dispatch,
  SetStateAction,
  useState,
} from "react";
import DarkModeToggle from "react-dark-mode-toggle";

const DarkToggleContext = createContext<
  | [boolean | undefined, Dispatch<SetStateAction<boolean | undefined>>]
  | undefined
>(undefined);

export const DarkProvider: React.FC = ({ children }) => {
  const [dark, setDark] = useState<boolean | undefined>(undefined);
  return (
    <DarkToggleContext.Provider value={[dark, setDark]}>
      {children}
    </DarkToggleContext.Provider>
  );
};

export function useDarkToggle() {
  const context = useContext(DarkToggleContext);
  return context;
}

export default function DarkToggle() {
  const [isDarkMode, setIsDarkMode] = useDarkToggle()!
  useEffect(() => {
    if (isDarkMode === undefined) {
      if (
        localStorage.theme === "dark" ||
        (!("theme" in localStorage) &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
      ) {
        setIsDarkMode(true)
      } else {
        setIsDarkMode(false)
      }
    }
    if (isDarkMode) {
      document.querySelector("html")?.classList.add("dark");
    } else {
      document.querySelector("html")?.classList.remove("dark");
    }
    console.log(isDarkMode);
  }, [isDarkMode]);
  return (
    <div className="ml-5">
      <DarkModeToggle onChange={setIsDarkMode} checked={isDarkMode} size={80}/>
      <div className="dark:text-green-700">LOLLLLLLLLLLLLLL</div>
    </div>
  );
}


