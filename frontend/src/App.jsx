import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [apiMessage, setApiMessage] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Test connection to Django API
    fetch('/api/hello/')
      .then(response => response.json())
      .then(data => {
        setApiMessage(data.message)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error fetching from API:', error)
        setApiMessage('Failed to connect to Django backend')
        setLoading(false)
      })
  }, [])

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Reactango</h1>
      <h2>Django + React Framework</h2>
      <div className="card">
        <p>
          {loading ? 'Connecting to Django backend...' : apiMessage}
        </p>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Django backend running on port 8000 | React frontend on port 5173
      </p>
    </>
  )
}

export default App
