import { useState } from 'react'
import './ListFilter.css'

function ListFilter() {
  const [inputList, setInputList] = useState('')
  const [filterType, setFilterType] = useState('contains')
  const [filterValue, setFilterValue] = useState('')
  const [caseSensitive, setCaseSensitive] = useState(false)
  const [invertFilter, setInvertFilter] = useState(false)
  const [filteredList, setFilteredList] = useState('')
  const [stats, setStats] = useState(null)

  const parseList = (text) => {
    return text
      .split(/[,\n]/)
      .map(item => item.trim())
      .filter(item => item.length > 0)
  }

  const formatList = (items) => {
    return items.join('\n')
  }

  const applyFilter = () => {
    const items = parseList(inputList)
    if (items.length === 0) {
      setFilteredList('')
      setStats(null)
      return
    }

    if (!filterValue.trim()) {
      setFilteredList('')
      setStats({ total: items.length, matched: 0, filtered: items.length })
      return
    }

    const searchValue = caseSensitive ? filterValue : filterValue.toLowerCase()
    let matchedItems = []

    switch (filterType) {
      case 'contains':
        matchedItems = items.filter(item => {
          const itemToCheck = caseSensitive ? item : item.toLowerCase()
          return itemToCheck.includes(searchValue)
        })
        break
      
      case 'startsWith':
        matchedItems = items.filter(item => {
          const itemToCheck = caseSensitive ? item : item.toLowerCase()
          return itemToCheck.startsWith(searchValue)
        })
        break
      
      case 'endsWith':
        matchedItems = items.filter(item => {
          const itemToCheck = caseSensitive ? item : item.toLowerCase()
          return itemToCheck.endsWith(searchValue)
        })
        break
      
      case 'exact':
        matchedItems = items.filter(item => {
          const itemToCheck = caseSensitive ? item : item.toLowerCase()
          return itemToCheck === searchValue
        })
        break
      
      case 'regex':
        try {
          const regex = new RegExp(filterValue, caseSensitive ? 'g' : 'gi')
          matchedItems = items.filter(item => regex.test(item))
        } catch (error) {
          setFilteredList('')
          setStats({ total: items.length, matched: 0, filtered: 0, error: 'Invalid regex pattern' })
          return
        }
        break
      
      case 'length':
        const lengthValue = parseInt(filterValue)
        if (isNaN(lengthValue)) {
          setFilteredList('')
          setStats({ total: items.length, matched: 0, filtered: 0, error: 'Invalid length value' })
          return
        }
        matchedItems = items.filter(item => item.length === lengthValue)
        break
      
      case 'lengthGreater':
        const lengthGreater = parseInt(filterValue)
        if (isNaN(lengthGreater)) {
          setFilteredList('')
          setStats({ total: items.length, matched: 0, filtered: 0, error: 'Invalid length value' })
          return
        }
        matchedItems = items.filter(item => item.length > lengthGreater)
        break
      
      case 'lengthLess':
        const lengthLess = parseInt(filterValue)
        if (isNaN(lengthLess)) {
          setFilteredList('')
          setStats({ total: items.length, matched: 0, filtered: 0, error: 'Invalid length value' })
          return
        }
        matchedItems = items.filter(item => item.length < lengthLess)
        break
      
      default:
        matchedItems = []
    }

    const finalItems = invertFilter 
      ? items.filter(item => !matchedItems.includes(item))
      : matchedItems

    setFilteredList(formatList(finalItems))
    setStats({
      total: items.length,
      matched: matchedItems.length,
      filtered: finalItems.length
    })
  }

  return (
    <div className="page3-container">
      <div className="page3-header">
        <h2>List Filter</h2>
        <p>Filter your list based on various criteria</p>
      </div>

      <div className="page3-input-section">
        <div className="input-group">
          <label htmlFor="inputList">Input List</label>
          <textarea
            id="inputList"
            value={inputList}
            onChange={(e) => {
              setInputList(e.target.value)
              setFilteredList('')
              setStats(null)
            }}
            placeholder="Enter items separated by commas or newlines..."
            rows="10"
          />
        </div>
      </div>

      <div className="page3-filter-controls">
        <div className="filter-row">
          <div className="input-group">
            <label htmlFor="filterType">Filter Type</label>
            <select
              id="filterType"
              value={filterType}
              onChange={(e) => {
                setFilterType(e.target.value)
                setFilteredList('')
                setStats(null)
              }}
            >
              <option value="contains">Contains</option>
              <option value="startsWith">Starts With</option>
              <option value="endsWith">Ends With</option>
              <option value="exact">Exact Match</option>
              <option value="regex">Regex Pattern</option>
              <option value="length">Length Equals</option>
              <option value="lengthGreater">Length Greater Than</option>
              <option value="lengthLess">Length Less Than</option>
            </select>
          </div>

          <div className="input-group">
            <label htmlFor="filterValue">Filter Value</label>
            <input
              id="filterValue"
              type="text"
              value={filterValue}
              onChange={(e) => {
                setFilterValue(e.target.value)
                setFilteredList('')
                setStats(null)
              }}
              placeholder={filterType.includes('length') ? 'Enter number...' : 'Enter text...'}
            />
          </div>
        </div>

        <div className="filter-options">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={caseSensitive}
              onChange={(e) => {
                setCaseSensitive(e.target.checked)
                setFilteredList('')
                setStats(null)
              }}
            />
            <span>Case Sensitive</span>
          </label>

          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={invertFilter}
              onChange={(e) => {
                setInvertFilter(e.target.checked)
                setFilteredList('')
                setStats(null)
              }}
            />
            <span>Invert Filter (exclude matches)</span>
          </label>
        </div>
      </div>

      <div className="page3-actions">
        <button onClick={applyFilter} className="filter-button">
          Apply Filter
        </button>
      </div>

      {stats && (
        <div className="page3-stats">
          {stats.error ? (
            <div className="error-message">{stats.error}</div>
          ) : (
            <>
              <div className="stat-item">
                <span className="stat-label">Total Items:</span>
                <span className="stat-value">{stats.total}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">{invertFilter ? 'Excluded' : 'Matched'}:</span>
                <span className="stat-value">{stats.matched}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Filtered Result:</span>
                <span className="stat-value">{stats.filtered}</span>
              </div>
            </>
          )}
        </div>
      )}

      {filteredList && (
        <div className="page3-output-section">
          <div className="input-group">
            <label htmlFor="filteredList">Filtered List</label>
            <textarea
              id="filteredList"
              value={filteredList}
              readOnly
              rows="10"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default ListFilter
