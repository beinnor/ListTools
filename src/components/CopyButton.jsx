import { useState, useEffect, useRef } from 'react'
import './CopyButton.css'

function CopyButton({ getText, title = 'Copy to clipboard' }) {
  const [copied, setCopied] = useState(false)
  const timeoutRef = useRef(null)

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const handleCopy = async () => {
    const text = getText()
    if (!text) return

    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      timeoutRef.current = setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      // Fallback for browsers without clipboard API or non-HTTPS
      try {
        const textArea = document.createElement('textarea')
        textArea.value = text
        textArea.style.position = 'fixed'
        textArea.style.left = '-9999px'
        document.body.appendChild(textArea)
        textArea.select()
        document.execCommand('copy')
        document.body.removeChild(textArea)
        setCopied(true)
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }
        timeoutRef.current = setTimeout(() => setCopied(false), 2000)
      } catch (fallbackErr) {
        console.error('Failed to copy:', fallbackErr)
      }
    }
  }

  return (
    <button
      className={`copy-button ${copied ? 'copied' : ''}`}
      onClick={handleCopy}
      title={title}
      aria-label={title}
    >
      {copied ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
      )}
      <span className="copy-button-text">{copied ? 'Copied!' : 'Copy'}</span>
    </button>
  )
}

export default CopyButton
