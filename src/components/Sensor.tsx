import { useEffect, useState } from 'react'
import useOrientation from '../hooks/useOrientation'
const Sensor = () => {
    const orientation=useOrientation()
    const [initialrotation,setInitialRotation]=useState<any>([0,0,0])
  
    useEffect(()=>{
      

    },[orientation,initialrotation])
  return (
    <div>Sensor
        <div>Please calibrate and set to desired neutral position</div>
        <button onClick={()=>{
            var initial=[orientation[0],orientation[1],orientation[2]]
            setInitialRotation(initial)
        }}>Set Iniital position</button>

        {JSON.stringify(orientation)}
        Initila position: 
        {JSON.stringify(initialrotation)}

        Calculated rotations alpha:
        {orientation[0]-initialrotation[0]}
        <br></br>
        Calculated rotations alpha:
        {orientation[1]-initialrotation[1]}
        <br></br>
        Calculated rotations alpha:
        {orientation[2]-initialrotation[2]}
    </div>
  )
}

export default Sensor