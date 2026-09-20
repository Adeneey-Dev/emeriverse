import { useEffect, useState, type ReactNode } from "react";
import { ThemeContext, type Theme } from "./theme-context";

const STORAGE_KEY = "theme";

/**
 * Reads the theme already applied to <html> by the inline script in
 * index.html (which runs before React mounts, avoiding a flash of the
 * wrong theme).
 */
function getInitialTheme(): Theme {
  if (typeof document === "undefined") return "light";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

/**
 * Light is always the starting point for a brand-new visit (new tab,
 * new browser session). Switching to dark is a live choice via the
 * toggle, and it's remembered across refreshes within that same
 * session (via sessionStorage) - but a fresh session always resets
 * back to light, since sessionStorage clears when the tab/browser
 * closes.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    try {
      window.sessionStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // sessionStorage can throw in private browsing / restricted
      // contexts - theme still works for the current page view, it
      // just won't survive a refresh in that case.
    }
  }, [theme]);

  const toggleTheme = () => setTheme((current) => (current === "dark" ? "light" : "dark"));

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}