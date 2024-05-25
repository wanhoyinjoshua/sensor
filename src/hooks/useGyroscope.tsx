import  { useState } from 'react'
import { useEffect } from 'react'

;
  const useGyro = () => {
    // @ts-ignore
    
  const [gyro,setgyro]=useState([0,0,0])
  const magic=180/Math.PI
       
    
       
      
  
    useEffect(() => {
          // @ts-ignore
        if (typeof Gyroscope === "function") {
            // run in circles…
             // @ts-ignore
            let gyroscope = new Gyroscope({ frequency: 60 });
    
        gyroscope.addEventListener("reading", () => {
            setgyro([Math.floor(gyroscope.x*magic),Math.floor(gyroscope.y*magic),Math.floor(gyroscope.z*magic)])
         
        });
        gyroscope.start();
          }
       
    }, [])
  
    return {gyro}
  }

export default useGyro