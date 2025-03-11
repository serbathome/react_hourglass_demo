import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SandTimer from './SandTimer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>React Hourglass Demo</h1>
      
      {/* Sand Timer Component */}
      <SandTimer />
      
    </>
  )
}

export default App
