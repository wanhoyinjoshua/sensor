import  { useState } from 'react'
import { useEffect } from 'react'
import Quaternion from 'quaternion';
;
  const useOrientation = () => {
    const [alpha, setAlpha] =useState(0)
    const [beta, setBeta] =useState(0)
    const [gamma, setGamma] =useState(0)
    const[quat,setQ]=useState<Quaternion>(Quaternion.ONE)
    
    

  
      function handleOrientation(event:any) {
        const alpha = event.alpha;
        const beta = event.beta;
        const gamma = event.gamma;
       
        // Do stuff...
        setAlpha(Math.floor(alpha))
        setBeta(Math.floor(beta))
        setGamma(Math.floor(gamma))
        var deg = Math.PI / 180;
        var q = Quaternion.fromEulerLogical(alpha * deg, beta * deg, -gamma * deg, 'ZXY');
        q.inverse()
        setQ(q)
       
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
  
    return quat
  }

export default useOrientation