import { useState } from 'react'
import './ListDiff.css'

function ListDiff() {
  const [listA, setListA] = useState('')
  const [listB, setListB] = useState('')
  const [results, setResults] = useState(null)

  const parseList = (text) => {
    return text
      .split(/[,\n]/)
      .map(item => item.trim())
      .filter(item => item.length > 0)
  }

  const compareLists = () => {
    const itemsA = parseList(listA)
    const itemsB = parseList(listB)

    const setA = new Set(itemsA)
    const setB = new Set(itemsB)

    const onlyInA = itemsA.filter(item => !setB.has(item))
    const onlyInB = itemsB.filter(item => !setA.has(item))
    const common = itemsA.filter(item => setB.has(item))
    const union = [...new Set([...itemsA, ...itemsB])]

    // Remove duplicates while preserving order
    const uniqueOnlyInA = Array.from(new Set(onlyInA))
    const uniqueOnlyInB = Array.from(new Set(onlyInB))
    const uniqueCommon = Array.from(new Set(common))

    setResults({
      onlyInA: uniqueOnlyInA,
      onlyInB: uniqueOnlyInB,
      common: uniqueCommon,
      union: union
    })
  }

  return (
    <div className="listdiff-container">
      <div className="listdiff-header">
        <h2>ListDiff Tool</h2>
        <p>Compare two lists and see the differences</p>
      </div>

      <div className="listdiff-inputs">
        <div className="input-group">
          <label htmlFor="listA">List A{(() => { const count = parseList(listA).length; return count > 0 ? ` (${count} items)` : ''; })()}</label>
          <textarea
            id="listA"
            value={listA}
            onChange={(e) => setListA(e.target.value)}
            placeholder="Enter items separated by commas or newlines..."
            rows="8"
          />
        </div>

        <div className="input-group">
          <label htmlFor="listB">List B{(() => { const count = parseList(listB).length; return count > 0 ? ` (${count} items)` : ''; })()}</label>
          <textarea
            id="listB"
            value={listB}
            onChange={(e) => setListB(e.target.value)}
            placeholder="Enter items separated by commas or newlines..."
            rows="8"
          />
        </div>
      </div>

      <div className="listdiff-actions">
        <button onClick={compareLists} className="compare-button">
          Compare Lists
        </button>
      </div>

      {results && (
        <div className="listdiff-results">
          <div className="result-section">
            <div className="result-header">
              <h3>Only in A ({results.onlyInA.length} items)</h3>
              <p className="result-subtitle">(but not in B)</p>
            </div>
            <div className="result-content">
              {results.onlyInA.length > 0 ? (
                <ul>
                  {results.onlyInA.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p className="empty-result">None</p>
              )}
            </div>
          </div>
          
          <div className="result-section">
            <div className="result-header">
              <h3>Only in B ({results.onlyInB.length} items)</h3>
              <p className="result-subtitle">(but not in A)</p>
            </div>
            <div className="result-content">
              {results.onlyInB.length > 0 ? (
                <ul>
                  {results.onlyInB.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p className="empty-result">None</p>
              )}
            </div>
          </div>

          <div className="result-section">
            <div className="result-header">
              <h3>A ∩ B ({results.common.length} items)</h3>
              <p className="result-subtitle">(A AND B)</p>
            </div>
            <div className="result-content">
              {results.common.length > 0 ? (
                <ul>
                  {results.common.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p className="empty-result">None</p>
              )}
            </div>
          </div>

    

          <div className="result-section">
            <div className="result-header">
              <h3>A ∪ B ({results.union.length} items)</h3>
              <p className="result-subtitle">(A OR B)</p>
            </div>
            <div className="result-content">
              {results.union.length > 0 ? (
                <ul>
                  {results.union.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p className="empty-result">None</p>
              )}
            </div>
          </div>

        </div>
      )}
    </div>
  )
}

export default ListDiff

