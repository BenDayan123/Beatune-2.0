import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useLayoutEffect,
} from "react";
// import useLocalStorage from "./useLocalStorage";
import { useLocalStorage } from "usehooks-ts";
import { ISettings } from "../components/Pages/Settings/routes";

type Theme = "light" | "dark";

interface IContext {
  theme: Theme;
  // setTheme: React.Dispatch<React.SetStateAction<Theme>>;
  setTheme(theme: Theme): void;
  toggleTheme(): void;
}

const ThemeContext = createContext<IContext>({} as IContext);

export function useTheme() {
  return React.useContext(ThemeContext);
}

export const ThemeProvider: React.FC<PropsWithChildren<any>> = ({
  children,
}) => {
  // const [theme, setTheme] = useLocalStorage<Theme>("theme", "light");
  const [settings, setSettings] = useLocalStorage<ISettings>(
    "settings",
    {} as ISettings
  );
  const { theme } = settings;

  // function getSystemTheme(): Theme {
  //   const isPreferDark = window.matchMedia(
  //     "(prefers-color-scheme: dark)"
  //   ).matches;
  //   return isPreferDark ? "dark" : "light";
  // }

  function setTheme(theme: Theme) {
    setSettings({ ...settings, theme });
  }

  useLayoutEffect(() => {
    function handleChange(e: MediaQueryListEvent) {
      setTheme(e.matches ? "dark" : "light");
    }
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", handleChange);
    return () =>
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", handleChange);
  }, []);

  function toggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  useEffect(() => {
    if (theme !== "dark" && theme !== "light") setTheme("dark");
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{ theme: settings.theme, toggleTheme, setTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
