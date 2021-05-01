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
  | [boolean, Dispatch<SetStateAction<boolean>>]
  | undefined
>(undefined);

export const DarkProvider: React.FC = ({ children }) => {
  const [dark, setDark] = useState<boolean>(false);
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
  const [isDarkMode, setIsDarkMode] = useDarkToggle()!;
  useEffect(() => {
    if (isDarkMode) {
      document.querySelector("html")?.classList.add("dark");
    } else {
      document.querySelector("html")?.classList.remove("dark");
    }
  }, [isDarkMode]);
  return (
    <div className="flex flex-col justify-center">
      <DarkModeToggle onChange={setIsDarkMode} checked={isDarkMode} size={60} />
    </div>
  );
}
