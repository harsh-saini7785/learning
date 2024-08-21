import { useState } from 'react'
import './App.css'
import FormBuilder from './components/FormBuilder/FormBuilder'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <FormBuilder />
    </div>
  )
}

export default App
