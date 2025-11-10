import { NavLink, useLocation } from 'react-router-dom'
import './Navigation.css'

function Navigation() {
  const location = useLocation()
  const isListDiffActive = location.pathname === '/' || location.pathname === '/listdiff'
  const isSettingsActive = location.pathname === '/settings'

  return (
    <nav className="navigation">
      <div className="nav-container">
        <h1 className="nav-title">ListTools</h1>
        <ul className="nav-links">
          <li>
            <NavLink 
              to="/listdiff" 
              className={({ isActive }) => (isActive || isListDiffActive) ? 'active' : ''}
            >
              ListDiff
            </NavLink>
          </li>
          <li>
            <NavLink to="/page2" className={({ isActive }) => isActive ? 'active' : ''}>
              ListCleaner
            </NavLink>
          </li>
          <li>
            <NavLink to="/page3" className={({ isActive }) => isActive ? 'active' : ''}>
              Page 3
            </NavLink>
          </li>
          <li>
            <NavLink to="/page4" className={({ isActive }) => isActive ? 'active' : ''}>
              Page 4
            </NavLink>
          </li>
          <li>
            <NavLink to="/page5" className={({ isActive }) => isActive ? 'active' : ''}>
              Page 5
            </NavLink>
          </li>
        </ul>
        <NavLink 
          to="/settings" 
          className={`settings-icon ${isSettingsActive ? 'active' : ''}`}
          title="Settings"
        >
          &#x2699;
        </NavLink>
      </div>
    </nav>
  )
}

export default Navigation

