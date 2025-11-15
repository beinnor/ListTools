import { useState } from 'react'
import './ListCleaner.css'

function ListCleaner() {
  const [inputList, setInputList] = useState('')
  const [outputList, setOutputList] = useState('')
  const [duplicates, setDuplicates] = useState([])
  const [sortDirection, setSortDirection] = useState('asc') // 'asc' or 'desc'
  const [markedDuplicates, setMarkedDuplicates] = useState(null) // { item: color } mapping
  const [duplicateColors, setDuplicateColors] = useState({}) // { item: color } mapping

  const parseList = (text) => {
    return text
      .split(/[,\n]/)
      .map(item => item.trim())
      .filter(item => item.length > 0)
  }

  const formatList = (items) => {
    return items.join('\n')
  }

  // Color palette for marking duplicates
  const duplicateColorPalette = [
    '#ffebee', '#e3f2fd', '#f3e5f5', '#e8f5e9', 
    '#fff3e0', '#fce4ec', '#e0f2f1', '#fff9c4',
    '#f1f8e9', '#e8eaf6', '#fef5e7', '#fce4ec'
  ]

  const markDuplicates = () => {
    const items = parseList(inputList)
    if (items.length === 0) {
      setMarkedDuplicates(null)
      setDuplicateColors({})
      return
    }

    // Find all duplicates
    const itemCounts = new Map()
    items.forEach(item => {
      itemCounts.set(item, (itemCounts.get(item) || 0) + 1)
    })

    // Group duplicates by their value
    const duplicateGroups = new Map()
    let colorIndex = 0

    itemCounts.forEach((count, item) => {
      if (count > 1) {
        if (!duplicateGroups.has(item)) {
          duplicateGroups.set(item, duplicateColorPalette[colorIndex % duplicateColorPalette.length])
          colorIndex++
        }
      }
    })

    setDuplicateColors(Object.fromEntries(duplicateGroups))
    setMarkedDuplicates(true)
  }

  const removeDuplicates = () => {
    const items = parseList(inputList)
    const seen = new Map()
    const duplicateItems = []
    
    items.forEach((item, index) => {
      if (seen.has(item)) {
        duplicateItems.push({ item, index })
        seen.get(item).push(index)
      } else {
        seen.set(item, [index])
      }
    })
    
    // Get all duplicate items (items that appear more than once)
    const duplicateSet = new Set()
    seen.forEach((indices, item) => {
      if (indices.length > 1) {
        duplicateSet.add(item)
      }
    })
    
    setDuplicates(Array.from(duplicateSet))
    const uniqueItems = Array.from(new Set(items))
    setOutputList(formatList(uniqueItems))
  }

  const sortList = () => {
    if (!outputList) return
    
    const items = parseList(outputList)
    const sortedItems = [...items].sort((a, b) => {
      if (sortDirection === 'asc') {
        return a.localeCompare(b)
      } else {
        return b.localeCompare(a)
      }
    })
    setOutputList(formatList(sortedItems))
    // Toggle sort direction for next click
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
  }

  return (
    <div className="listcleaner-container">
      <div className="listcleaner-header">
        <h2>ListCleaner</h2>
        <p>Remove duplicates and sort your list</p>
      </div>

      <div className="listcleaner-input-section">
        <div className="input-group">
          <label htmlFor="inputList">Input List</label>
          <textarea
            id="inputList"
            value={inputList}
            onChange={(e) => {
              setInputList(e.target.value)
              setDuplicates([])
              setMarkedDuplicates(null)
              setDuplicateColors({})
            }}
            placeholder="Enter items separated by commas or newlines..."
            rows="10"
          />
        </div>
        {duplicates.length > 0 && (
          <div className="duplicates-section">
            <p className="duplicates-label">Duplicates found:</p>
            <div className="duplicates-list">
              {duplicates.map((item, index) => (
                <span key={index} className="duplicate-item">{item}</span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="listcleaner-actions">
        <button onClick={markDuplicates} className="action-button">
          Mark Duplicates
        </button>
        <button onClick={removeDuplicates} className="action-button">
          Remove Duplicates
        </button>
        <button onClick={sortList} className="action-button" disabled={!outputList}>
          Sort {sortDirection === 'asc' ? '↑' : '↓'}
        </button>
      </div>

      {markedDuplicates && inputList && (
        <div className="marked-duplicates-display">
          <div className="input-group">
            <label>Marked Input (duplicates highlighted)</label>
            <div className="marked-lines-container">
              {parseList(inputList).map((item, index) => {
                const color = duplicateColors[item]
                const isDuplicate = color !== undefined
                return (
                  <div
                    key={index}
                    className={`marked-line ${isDuplicate ? 'duplicate-line' : ''}`}
                    style={isDuplicate ? { backgroundColor: color, borderLeftColor: color } : {}}
                  >
                    {item}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {outputList && (
        <div className="listcleaner-output-section">
          <div className="input-group">
            <label htmlFor="outputList">Output List</label>
            <textarea
              id="outputList"
              value={outputList}
              readOnly
              rows="10"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default ListCleaner
