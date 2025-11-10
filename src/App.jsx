import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import Navigation from './components/Navigation'
import ListDiff from './pages/ListDiff'
import Page2 from './pages/Page2'
import Page3 from './pages/Page3'
import Page4 from './pages/Page4'
import Page5 from './pages/Page5'
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
            <Route path="/page2" element={<Page2 />} />
            <Route path="/page3" element={<Page3 />} />
            <Route path="/page4" element={<Page4 />} />
            <Route path="/page5" element={<Page5 />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </ThemeProvider>
  )
}

export default App

