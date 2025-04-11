"use client";

import { useState } from "react";
import { ThemeContext } from './ThemeContext'; 

export const ThemeContextProvider = ({ children }) => {
    const [theme, setTheme] = useState("light");

    const toggle = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    return (
      <ThemeContext.Provider value={{ theme, toggle }}>
        {children}
      </ThemeContext.Provider>
    );
}