import  { useState } from 'react'
import { useEffect } from 'react'
import Quaternion from 'quaternion';
;
  const useOrientation = () => {

    const[quat,setQ]=useState<Quaternion>(Quaternion.ONE)
    const [abc,setAbc]=useState([0,0,0])
    

  
      function handleOrientation(event:any) {
        const alpha = event.alpha;
        const beta = event.beta;
        const gamma = event.gamma;
        setAbc([event.alpha,event.beta,event.gamma

        ])
       
        // Do stuff...
       
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
  
    return {quat,abc}
  }

export default useOrientation