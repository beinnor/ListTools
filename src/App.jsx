import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import Navigation from './components/Navigation'
import ListDiff from './pages/ListDiff'
import ListCleaner from './pages/ListCleaner'
import ListFilter from './pages/ListFilter'
import JsonViewer from './pages/JsonViewer'

import Settings from './pages/Settings'

function App() {
  return (
    <ThemeProvider>
      <div className="app">
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<ListDiff />} />
            <Route path="/listdiff" element={<ListDiff />} />
            <Route path="/listcleaner" element={<ListCleaner />} />
            <Route path="/listfilter" element={<ListFilter />} />
            <Route path="/jsonviewer" element={<JsonViewer />} />
           
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </ThemeProvider>
  )
}

export default App

