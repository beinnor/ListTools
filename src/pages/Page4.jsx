import { useState } from 'react'
import './Page4.css'

function Page4() {
  const [jsonInput, setJsonInput] = useState('')
  const [jsonData, setJsonData] = useState(null)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [expandedPaths, setExpandedPaths] = useState(new Set(['root']))

  const beautifyJSON = () => {
    try {
      const parsed = JSON.parse(jsonInput)
      const beautified = JSON.stringify(parsed, null, 2)
      setJsonInput(beautified)
      setError('')
    } catch (err) {
      setError('Invalid JSON: ' + err.message)
    }
  }

  const visualizeJSON = () => {
    try {
      const parsed = JSON.parse(jsonInput)
      setJsonData(parsed)
      setError('')
      setExpandedPaths(new Set(['root']))
    } catch (err) {
      setError('Invalid JSON: ' + err.message)
      setJsonData(null)
    }
  }

  const toggleExpand = (path) => {
    const newExpanded = new Set(expandedPaths)
    if (newExpanded.has(path)) {
      newExpanded.delete(path)
    } else {
      newExpanded.add(path)
    }
    setExpandedPaths(newExpanded)
  }

  const expandAll = () => {
    const allPaths = new Set()
    const collectPaths = (obj, path) => {
      allPaths.add(path)
      if (typeof obj === 'object' && obj !== null && !Array.isArray(obj)) {
        Object.keys(obj).forEach(key => {
          collectPaths(obj[key], `${path}.${key}`)
        })
      } else if (Array.isArray(obj)) {
        obj.forEach((item, index) => {
          collectPaths(item, `${path}[${index}]`)
        })
      }
    }
    if (jsonData) {
      collectPaths(jsonData, 'root')
    }
    setExpandedPaths(allPaths)
  }

  const collapseAll = () => {
    setExpandedPaths(new Set(['root']))
  }

  const matchesSearch = (value, path) => {
    if (!searchTerm) return true
    const searchLower = searchTerm.toLowerCase()
    const valueStr = typeof value === 'object' ? JSON.stringify(value) : String(value)
    return valueStr.toLowerCase().includes(searchLower) || path.toLowerCase().includes(searchLower)
  }

  const renderValue = (value, path, key = null) => {
    const displayKey = key !== null ? key : ''
    const fullPath = key !== null ? `${path}.${key}` : path

    if (value === null) {
      return <span className="json-null">null</span>
    }

    if (typeof value === 'boolean') {
      return <span className="json-boolean">{String(value)}</span>
    }

    if (typeof value === 'number') {
      return <span className="json-number">{value}</span>
    }

    if (typeof value === 'string') {
      return <span className="json-string">"{value}"</span>
    }

    if (Array.isArray(value)) {
      const isExpanded = expandedPaths.has(fullPath)
      const hasMatches = value.some((item, idx) => matchesSearch(item, `${fullPath}[${idx}]`))

      if (!hasMatches && searchTerm) return null

      return (
        <div className="json-item">
          <span className="json-key">{displayKey}:</span>
          <span className="json-bracket">[</span>
          <button
            className="json-toggle"
            onClick={() => toggleExpand(fullPath)}
            aria-label={isExpanded ? 'Collapse' : 'Expand'}
          >
            {isExpanded ? '▼' : '▶'}
          </button>
          <span className="json-count">{value.length} items</span>
          {isExpanded && (
            <div className="json-children">
              {value.map((item, index) => {
                const itemPath = `${fullPath}[${index}]`
                if (!matchesSearch(item, itemPath) && searchTerm) return null
                return (
                  <div key={index} className="json-entry">
                    <span className="json-index">{index}:</span>
                    {renderValue(item, itemPath)}
                  </div>
                )
              })}
            </div>
          )}
          <span className="json-bracket">]</span>
        </div>
      )
    }

    if (typeof value === 'object') {
      const isExpanded = expandedPaths.has(fullPath)
      const keys = Object.keys(value)
      const hasMatches = keys.some(k => matchesSearch(value[k], `${fullPath}.${k}`))

      if (!hasMatches && searchTerm) return null

      return (
        <div className="json-item">
          {displayKey && <span className="json-key">{displayKey}:</span>}
          <span className="json-bracket">{'{'}</span>
          <button
            className="json-toggle"
            onClick={() => toggleExpand(fullPath)}
            aria-label={isExpanded ? 'Collapse' : 'Expand'}
          >
            {isExpanded ? '▼' : '▶'}
          </button>
          <span className="json-count">{keys.length} keys</span>
          {isExpanded && (
            <div className="json-children">
              {keys.map((k) => {
                const childPath = `${fullPath}.${k}`
                if (!matchesSearch(value[k], childPath) && searchTerm) return null
                return (
                  <div key={k} className="json-entry">
                    {renderValue(value[k], fullPath, k)}
                  </div>
                )
              })}
            </div>
          )}
          <span className="json-bracket">{'}'}</span>
        </div>
      )
    }

    return <span>{String(value)}</span>
  }

  return (
    <div className="json-viewer-container">
      <div className="json-viewer-header">
        <h2>JSON Viewer</h2>
        <p>Paste your JSON content and visualize it as a collapsible tree</p>
      </div>

      <div className="json-input-section">
        <div className="input-group">
          <label htmlFor="jsonInput">JSON Input</label>
          <textarea
            id="jsonInput"
            value={jsonInput}
            onChange={(e) => {
              setJsonInput(e.target.value)
              setError('')
              setJsonData(null)
            }}
            placeholder='Paste your JSON here... Example: {"name": "John", "age": 30}'
            rows="10"
            className={error ? 'error' : ''}
          />
          {error && <div className="error-message">{error}</div>}
        </div>
      </div>

      <div className="json-actions">
        <button onClick={beautifyJSON} className="action-button" disabled={!jsonInput.trim()}>
          Beautiful
        </button>
        <button onClick={visualizeJSON} className="action-button" disabled={!jsonInput.trim()}>
          Visualize
        </button>
      </div>

      {jsonData && (
        <div className="json-viewer-section">
          <div className="json-viewer-controls">
            <div className="search-control">
              <input
                type="text"
                placeholder="Search in JSON..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            <div className="expand-controls">
              <button onClick={expandAll} className="control-button">
                Expand All
              </button>
              <button onClick={collapseAll} className="control-button">
                Collapse All
              </button>
            </div>
          </div>
          <div className="json-tree">
            {renderValue(jsonData, 'root')}
          </div>
        </div>
      )}
    </div>
  )
}

export default Page4
