import { useState } from 'react'
import './Page2.css'

function Page2() {
  const [inputList, setInputList] = useState('')
  const [outputList, setOutputList] = useState('')
  const [duplicates, setDuplicates] = useState([])
  const [sortDirection, setSortDirection] = useState('asc') // 'asc' or 'desc'

  const parseList = (text) => {
    return text
      .split(/[,\n]/)
      .map(item => item.trim())
      .filter(item => item.length > 0)
  }

  const formatList = (items) => {
    return items.join('\n')
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
    <div className="page2-container">
      <div className="page2-header">
        <h2>ListCleaner</h2>
        <p>Remove duplicates and sort your list</p>
      </div>

      <div className="page2-input-section">
        <div className="input-group">
          <label htmlFor="inputList">Input List</label>
          <textarea
            id="inputList"
            value={inputList}
            onChange={(e) => {
              setInputList(e.target.value)
              setDuplicates([])
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

      <div className="page2-actions">
        <button onClick={removeDuplicates} className="action-button">
          Remove Duplicates
        </button>
        <button onClick={sortList} className="action-button" disabled={!outputList}>
          Sort {sortDirection === 'asc' ? '↑' : '↓'}
        </button>
      </div>

      {outputList && (
        <div className="page2-output-section">
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

export default Page2
