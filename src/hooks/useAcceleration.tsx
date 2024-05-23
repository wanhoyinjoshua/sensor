
import { useEffect, useState } from 'react'

;
  const useAcceleration = () => {
    const [x,setx]=useState(0)
    const [y,sety]=useState(0)
    const [z,setz]=useState(0)

    function handleOrientation(e:any){
        setx(Math.floor(e.accelerationIncludingGravity.x))
        sety(Math.floor(e.accelerationIncludingGravity.y))
        setz(Math.floor(e.accelerationIncludingGravity.z))


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
  
    return [x,y,z]
  }

export default useAcceleration