import { useEffect, useState } from 'react'
import useOrientation from '../hooks/useOrientation'
import Quaternion from 'quaternion';
import useAcceleration from '../hooks/useAcceleration';

const Sensor = () => {
    const orientation=useOrientation()
    
    const [initialrotation,setInitialRotation]=useState<Quaternion>(Quaternion.ONE)
    const acceleration=useAcceleration()
    const[hallpike,setHallpike]=useState(false)

    var deg = Math.PI / 180;
    useEffect(()=>{
        if(acceleration[2]>10){
            setHallpike(true)
            setInitialRotation(Quaternion.fromEulerLogical(90*deg,0,-0,'ZXY'))
        }

       
    },[acceleration])
    
    //gamma in the horizontal position will be -90
    //then to measure head flexion/ from neutral 
    // you need to from 
    //-90 to 89, that will be intepreted as 1 degree
    //from -90 to 88 will be +ve 2 
    //from -90 to 80 that will be +ve 10
    //from -90 to 50 will be 40 
    // but what if -80 --> 80 will be 20 
    //extension increases in value 
    // flexion will decrease in value 
    // if from -ve to +ve then it means it is a flexion movement 
    // or i can calculate the distance from 90 .

    


  
    function calculaterotation(){
        //inverse of initial position * transformed 
        let q1Inverse = initialrotation.inverse();
        let qDifference =orientation.mul(q1Inverse);
        let angle=qDifference.toEuler("ZXY")
        const magic=180/Math.PI
      
        let angleb=Math.floor(angle[1]*magic)
        let anglec=Math.floor(angle[2]*magic )  
        var flexion=0
       
        var rotation =0
        if(hallpike==true){
            flexion=angleb
        rotation=anglec

        }else{
            flexion=anglec
        rotation=angleb

            
        }
     
        
       
        //in a supie position, 
        //beta transverse rotaiton if the head 
        // and gamma is flexion extension of the head.

        //sign 
        //
     
       
        return [flexion,rotation]
    }

   
  return (
    <div>Sensor
        <div>Please calibrate and set to desired neutral position</div>
        <div>Please rotate screen to landscape and disable autorotate on your phone</div>\
        <div>Readings will be avalibel only when you are in landscape mode</div>
        <button onClick={()=>{
            localStorage.setItem("initial",JSON.stringify(orientation))
            setInitialRotation(orientation)
        }}>Set Iniital position</button>
        <button onClick={()=>{
            // @ts-ignore
            window.screen.orientation['lock']('landscape')
        }}>Lock Screen</button>

      
       {window.screen.orientation.type=="landscape-primary"?
       <div>

       Flexion:{calculaterotation()[0]}
        <br></br>
        Rotation:{calculaterotation()[1]}


       </div>:null}
       
        
       

        <br>
        </br>
       
        <br></br>
        {JSON.stringify(window.screen.orientation.type)}
        
      

    </div>
  )
}

export default Sensor