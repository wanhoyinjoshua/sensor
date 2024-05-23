
import { useEffect, useState } from 'react'

;
  const useDeviceOrientation = () => {
    const [x,setx]=useState("hi")
   

    function handleOrientation(e:any){
        setx(e.orientation)
       


    }


  
    useEffect(() => {
        if(window.DeviceOrientationEvent){
            window.addEventListener('orientationchange', handleOrientation)
            return () => {
              window.removeEventListener(
                'orientationchange',
                handleOrientation
              )
            }

        }else{
            window.alert("this browser does not support device orientation")
        }
       
    }, [])
  
    return x
  }

export default useDeviceOrientation