import { createContext, useState, useEffect } from "react"

type Theme = "light" | "dark"

type ThemeContextType = {
  theme: Theme
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {},
  setTheme: () => {}
})

export function ThemeProvider({ children }: any) {

  const [theme, setThemeState] = useState<Theme>("light")

  useEffect(() => {

    const savedTheme = localStorage.getItem("theme") as Theme

    if (savedTheme) {
      setThemeState(savedTheme)
      document.documentElement.setAttribute("data-bs-theme", savedTheme)
    }

  }, [])

  function setTheme(theme: Theme) {

    setThemeState(theme)

    localStorage.setItem("theme", theme)

    document.documentElement.setAttribute("data-bs-theme", theme)

  }

  function toggleTheme() {

    const newTheme = theme === "light" ? "dark" : "light"

    setTheme(newTheme)

  }

  return (

    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        setTheme
      }}
    >

      {children}

    </ThemeContext.Provider>

  )

}