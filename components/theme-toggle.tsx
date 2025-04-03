"use client"
import { Moon, Sun } from "lucide-react"

type ThemeToggleProps = {
  darkMode: boolean
  toggleDarkMode: () => void
}

export function ThemeToggle({ darkMode, toggleDarkMode }: ThemeToggleProps) {
  return (
    <button
      onClick={toggleDarkMode}
      className={`fixed top-4 right-4 z-50 p-2 rounded-full ${
        darkMode ? "bg-gray-700 text-yellow-300" : "bg-white text-gray-700 shadow-md"
      }`}
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  )
}

