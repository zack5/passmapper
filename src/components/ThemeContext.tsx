import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

// Define types for the context value
interface ThemeContextType {
  colors: { accent: string };
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
}

// Create the context with an initial value of null
const ThemeContext = createContext<ThemeContextType | null>(null);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<string>(() => localStorage.getItem("theme") || "light");
  const [colors, setColors] = useState<{ accent: string }>({ accent: "" });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);

    requestAnimationFrame(() => {
      const getColor = (name: string) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();
      setColors({ accent: getColor("--color-accent") });
    });
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ colors, theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  
  return context;
}
