import  { useState } from 'react'
import { useEffect } from 'react'

;
  const useGyro = () => {
    // @ts-ignore
    
  const [gyro,setgyro]=useState([0,0,0])
    
       
    
       
      
  
    useEffect(() => {
          // @ts-ignore
        if (typeof Gyroscope === "function") {
            // run in circles…
             // @ts-ignore
            let gyroscope = new Gyroscope({ frequency: 60 });
    
        gyroscope.addEventListener("reading", () => {
            setgyro([Math.floor(gyroscope.x),Math.floor(gyroscope.y),Math.floor(gyroscope.z)])
         
        });
        gyroscope.start();
          }
       
    }, [])
  
    return {gyro}
  }

export default useGyro