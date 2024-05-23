
import { useEffect, useState } from 'react'

;
  const useAcceleration = () => {
    const [z,setz]=useState(0)

    function handleOrientation(e:any){
        setz(e.acceleration.x)


    }


  
    useEffect(() => {
        if(window.DeviceOrientationEvent){
            window.addEventListener('devicemotion', handleOrientation)
            return () => {
              window.removeEventListener(
                'devicemotion',
                handleOrientation
              )
            }

        }else{
            window.alert("this browser does not support device orientation")
        }
       
    }, [])
  
    return z
  }

export default useAcceleration