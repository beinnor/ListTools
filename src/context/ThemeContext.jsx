import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

const colorPalettes = {
  default: {
    primary: '#3498db',
    primaryHover: '#2980b9',
    primaryActive: '#21618c',
    background: '#ecf0f1',
    navBg: '#2c3e50',
    text: '#2c3e50',
    textSecondary: '#7f8c8d',
    border: '#bdc3c7',
    cardBg: '#f8f9fa',
    cardBorder: '#e9ecef'
  },
  dark: {
    primary: '#5dade2',
    primaryHover: '#3498db',
    primaryActive: '#2980b9',
    background: '#1a1a1a',
    navBg: '#0d0d0d',
    text: '#e0e0e0',
    textSecondary: '#b0b0b0',
    border: '#404040',
    cardBg: '#2a2a2a',
    cardBorder: '#404040'
  },
  green: {
    primary: '#27ae60',
    primaryHover: '#229954',
    primaryActive: '#1e8449',
    background: '#e8f8f5',
    navBg: '#1b4332',
    text: '#1b4332',
    textSecondary: '#52b788',
    border: '#95d5b2',
    cardBg: '#d1f2eb',
    cardBorder: '#95d5b2'
  },
  purple: {
    primary: '#9b59b6',
    primaryHover: '#8e44ad',
    primaryActive: '#7d3c98',
    background: '#f4ecf7',
    navBg: '#512e5f',
    text: '#512e5f',
    textSecondary: '#a569bd',
    border: '#bb8fce',
    cardBg: '#ebdef0',
    cardBorder: '#bb8fce'
  },
  lett: {
    primary: '#DD2322',
    primaryHover: '#DD2322',
    primaryActive: '#003d7a',
    background: '#ffffff',
    navBg: '#525D64',
    text: '#525D64',
    textSecondary: '#DD2322',
    border: '#e0e0e0',
    cardBg: '#fafafa',
    cardBorder: '#e8e8e8'
  }
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('listtools-theme')
    return savedTheme || 'default'
  })

  useEffect(() => {
    const palette = colorPalettes[theme] || colorPalettes.default
    const root = document.documentElement
    
    root.style.setProperty('--primary-color', palette.primary)
    root.style.setProperty('--primary-hover', palette.primaryHover)
    root.style.setProperty('--primary-active', palette.primaryActive)
    root.style.setProperty('--background-color', palette.background)
    root.style.setProperty('--nav-bg', palette.navBg)
    root.style.setProperty('--text-color', palette.text)
    root.style.setProperty('--text-secondary', palette.textSecondary)
    root.style.setProperty('--border-color', palette.border)
    root.style.setProperty('--card-bg', palette.cardBg)
    root.style.setProperty('--card-border', palette.cardBorder)
    
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('listtools-theme', theme)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}

