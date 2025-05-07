import React from "react";
import { useTheme } from "@/hooks/useTheme";
import { Sun, Moon } from "lucide-react";

interface ThemeToggleProps {
  className?: string;
}

export default function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  
  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-full transition-colors duration-300 ${
        isDark 
          ? "bg-wizardLight/50 hover:bg-wizardLight" 
          : "bg-wizardDark/10 hover:bg-wizardDark/20"
      } ${className}`}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {isDark ? (
        <Sun className="text-hufflepuff" size={18} />
      ) : (
        <Moon className="text-ravenclaw" size={18} />
      )}
    </button>
  );
}
