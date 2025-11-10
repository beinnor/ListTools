import { useTheme } from '../context/ThemeContext'
import './Settings.css'

const colorPalettes = [
  {
    id: 'default',
    name: 'Default',
    colors: {
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
    }
  },
  {
    id: 'dark',
    name: 'Dark',
    colors: {
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
    }
  },
  {
    id: 'green',
    name: 'Green',
    colors: {
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
    }
  },
  {
    id: 'purple',
    name: 'Purple',
    colors: {
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
    }
  },
  {
    id: 'lett',
    name: 'Lett',
    colors: {
      primary: '#0066cc',
      primaryHover: '#0052a3',
      primaryActive: '#003d7a',
      background: '#ffffff',
      navBg: '#f5f5f5',
      text: '#1a1a1a',
      textSecondary: '#666666',
      border: '#e0e0e0',
      cardBg: '#fafafa',
      cardBorder: '#e8e8e8'
    }
  }
]

function Settings() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="settings-container">
      <div className="settings-header">
        <h2>Settings</h2>
        <p>Choose your preferred color palette</p>
      </div>

      <div className="palettes-grid">
        {colorPalettes.map((palette) => (
          <div
            key={palette.id}
            className={`palette-card ${theme === palette.id ? 'active' : ''}`}
            onClick={() => setTheme(palette.id)}
          >
            <div className="palette-preview">
              <div 
                className="preview-color" 
                style={{ backgroundColor: palette.colors.primary }}
              />
              <div 
                className="preview-color" 
                style={{ backgroundColor: palette.colors.navBg }}
              />
              <div 
                className="preview-color" 
                style={{ backgroundColor: palette.colors.cardBg }}
              />
              <div 
                className="preview-color" 
                style={{ backgroundColor: palette.colors.background }}
              />
            </div>
            <h3>{palette.name}</h3>
            {theme === palette.id && (
              <span className="selected-badge">Selected</span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Settings

