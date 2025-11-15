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
              List Diff
            </NavLink>
          </li>
          <li>
            <NavLink to="/listcleaner" className={({ isActive }) => isActive ? 'active' : ''}>
              List Cleaner
            </NavLink>
          </li>
          <li>
            <NavLink to="/listfilter" className={({ isActive }) => isActive ? 'active' : ''}>
              List Filter
            </NavLink>
          </li>
          <li>
            <NavLink to="/jsonviewer" className={({ isActive }) => isActive ? 'active' : ''}>
              JSON Viewer
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

