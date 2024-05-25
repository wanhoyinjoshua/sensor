import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Sensor from './components/Sensor'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    
      <div>
        <Sensor></Sensor>
        </div>
       
      
    
  )
}

export default App
