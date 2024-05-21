import  { useState } from 'react'
import { useEffect } from 'react'

  
  const useOrientation = () => {
    const [alpha, setAlpha] =useState(0)
    const [beta, setBeta] =useState(0)
    const [gamma, setGamma] =useState(0)
    

  
      function handleOrientation(event:any) {
        const alpha = event.alpha;
        const beta = event.beta;
        const gamma = event.gamma;
       
        // Do stuff...
        setAlpha(Math.floor(alpha))
        setBeta(Math.floor(beta))
        setGamma(Math.floor(gamma))
       
      }
  
    useEffect(() => {
        if(window.DeviceOrientationEvent){
            window.addEventListener('deviceorientation', handleOrientation)
            return () => {
              window.removeEventListener(
                'deviceorientation',
                handleOrientation
              )
            }

        }else{
            window.alert("this browser does not support device orientation")
        }
       
    }, [])
  
    return[alpha, beta,gamma]
  }

export default useOrientation