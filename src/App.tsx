
import Sensor from './components/Sensor'
import './App.css'
import { useState } from 'react'
import Welcome from './components/Welcome'

function App() {

  const [calibration,setCalibration]=useState(false)
  const [screen,setScreen]=useState(0)

  return (
    
      <div>
        {screen==0?<div></div>: <button onClick={()=>{setScreen(0)}}>Return to Home screen</button>}
       
        {screen==0&& <Welcome setScreen={setScreen}></Welcome>}

        {screen==1&& <Sensor setScreen={setScreen} sensor={true} calibration={calibration} setCalibration={setCalibration}></Sensor>}
        {screen==2&& <Sensor setScreen={setScreen} sensor={false} calibration={calibration} setCalibration={setCalibration}></Sensor>}
       
        </div>
       
      
    
  )
}

export default App
