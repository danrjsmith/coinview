import React, { useCallback, useEffect, useState } from "react";
import { createContext, useContextSelector } from "use-context-selector";

export type ThemeMode = "light" | "dark";
type Dispatch = (mode: ThemeMode) => void;
const initialThemeMode = "light";

const ThemeModeContext = createContext<[ThemeMode, Dispatch]>([
  initialThemeMode,
  () => null,
]);

export const useThemeMode = () => {
  const themeMode = useContextSelector(ThemeModeContext, (v) => v[0]);
  const setThemeMode = useContextSelector(ThemeModeContext, (v) => v[1]);

  const cycleThemeMode = useCallback(() => {
    setThemeMode(themeMode === "dark" ? "light" : "dark");
  }, [setThemeMode, themeMode]);

  return { themeMode, setThemeMode, cycleThemeMode };
};

export const ThemeModeProvider = ({ children }: { children: JSX.Element }) => {
  const [themeMode, setThemeMode] = useState<ThemeMode>(initialThemeMode);

  useEffect(() => {
    document.body.dataset.theme = themeMode;
  }, [themeMode]);

  return (
    <ThemeModeContext.Provider value={[themeMode, setThemeMode]}>
      {children}
    </ThemeModeContext.Provider>
  );
};
