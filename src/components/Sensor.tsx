import { useEffect, useState } from 'react'
import useOrientation from '../hooks/useOrientation'
import Quaternion from 'quaternion';
import useAcceleration from '../hooks/useAcceleration';
import useGyro from '../hooks/useGyroscope';
import Stat from './Stat';
import Instructions from './Instructions';
import RotationTracker from './RotationTracker';
const Sensor = () => {
    const {quat,abc}=useOrientation()
    const{gyro} =useGyro()
    
    const [initialrotation,setInitialRotation]=useState<Quaternion>(Quaternion.ONE)
    const acceleration=useAcceleration()
    const[hallpike,setHallpike]=useState(false)

    var deg = Math.PI / 180;

    useEffect(()=>{
        if(acceleration[2]>10){
            setHallpike(true)
            setInitialRotation(Quaternion.fromEulerLogical(90*deg,0,-0,'ZXY'))
        }
        else if(acceleration[2]<2){
            setHallpike(false)
            var cc=localStorage.getItem("initial")
            if(cc!=null){
                var raw= JSON.parse(cc)
                var a=raw[0]
                var b =raw[1]
                var c= raw[2]
                setInitialRotation(Quaternion.fromEulerLogical(a*deg,b*deg,-c*deg,'ZXY'))

            }
           
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
    function reset(){
        setHallpike(false)

    }
    
    function launchIntoFullscreen(element:any) {
        if(element.requestFullscreen) {
          element.requestFullscreen();
        } else if(element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if(element.webkitRequestFullscreen) {
          element.webkitRequestFullscreen();
        } else if(element.msRequestFullscreen) {
          element.msRequestFullscreen();
        }
        // @ts-ignore
        window.screen.orientation.lock('landscape-primary')
      }
      
      // Launch fullscreen for browsers that support it!
    
    function calculatemovement(){
        if(calculaterotation()[0]>0){
            return "Flexion"
        }
        if(calculaterotation()[0]<0){
            return "Extension"

        }
        if(calculaterotation()[0]==0){
            return "Neutral"

        }
    }
  
    function calculaterotation(){
        //inverse of initial position * transformed 
        let q1Inverse = initialrotation.inverse();
        let qDifference =quat.mul(q1Inverse);
        let angle=qDifference.toEuler("ZXY")
        const magic=180/Math.PI
      
        let angleb=Math.floor(angle[1]*magic)
        let anglec=Math.floor(angle[2]*magic )  
        var flexion=0
       
        var rotation =0
        if(hallpike==true){
            flexion=anglec
        rotation=angleb

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
    <div>
     
        <button className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={()=>{
            localStorage.setItem("initial",JSON.stringify(abc))
            setInitialRotation(quat)
        }}>Set Iniital position</button>
        <button className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
         onClick={()=>{
            
            // @ts-ignore
            reset()
        }}>Clear all movements</button>
        <button 
        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={()=>{launchIntoFullscreen(document.documentElement)}}>Full screen</button>

      
       {window.screen.orientation.type=="landscape-primary"?
       <div>
        <Stat stats={[
            { name: calculatemovement(), value:Math.abs(calculaterotation()[0]) },
            { name: 'Rotation', value: Math.abs(calculaterotation()[1]) },
        ]}></Stat>

      


       </div>:<Instructions></Instructions>}
       
        
       

        <br>
        </br>
       
        <br></br>
        {JSON.stringify(window.screen.orientation.type)}
        {JSON.stringify(hallpike)}
        <br></br>
       
        <RotationTracker data={Math.abs(gyro[0])}></RotationTracker>
       
        
       
      

    </div>
  )
}

export default Sensor