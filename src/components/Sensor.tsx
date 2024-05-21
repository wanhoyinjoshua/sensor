import { useEffect, useState } from 'react'
import useOrientation from '../hooks/useOrientation'
const Sensor = () => {
    const orientation=useOrientation()
    const [initialrotation,setInitialRotation]=useState([0,0,0])
    
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


  
    useEffect(()=>{
      

    },[orientation,initialrotation])
  
    function calculaterotation(){
        
        var d0=initialrotation[2]
        var d1=orientation[2]
        var isFlexion=false
        var total_motion=0

        
       
        //in a supie position, 
        //beta transverse rotaiton if the head 
        // and gamma is flexion extension of the head.

        //sign 
        //
        if(d0<=0){
            
            if(d1>=d0){
                //this will be extension
                isFlexion=false
                total_motion=(90-Math.abs(d1))-(90-Math.abs(d0))
            }else{
                //this will be flexion
                isFlexion=true
                total_motion=(90-Math.abs(d0))-(90-Math.abs(d1))

            }


        }
        else if(d0>=0){
            if(Math.abs(d1)>d0){
                //this will be extension
                isFlexion=false
                if(d1>=0){
                    total_motion=(90-d0)-(90-d1)

                }else{
                    total_motion=(90-Math.abs(d1))+(90-Math.abs(d0))

                }
            
            }
            else{
                //this will be flexion up till a certain point 
                isFlexion=true
                total_motion=(90-d1)-(90-d0)
            }

        }
       
       // this only solves the flexion problem
        
        



        //
       
      

        

       
       

        

       if(total_motion>90){
        var total_motion=-1000
       }
       
        return [total_motion,isFlexion]

    }

    function calculatetransrotation(){
        var d0=initialrotation[0]
        var d1=orientation[0]
        var rotation= Math.abs(d0-d1)
        return rotation

    }
  return (
    <div>Sensor
        <div>Please calibrate and set to desired neutral position</div>
        <button onClick={()=>{
            var initial=[orientation[0],orientation[1],orientation[2]]
            setInitialRotation(initial)
        }}>Set Iniital position</button>

        {JSON.stringify(orientation)}
        Initila position: 
        {JSON.stringify(initialrotation)}

        Calculated rotations alpha:
        {orientation[0]-initialrotation[0]}
        <br></br>
        Calculated rotations alpha:
        {orientation[1]-initialrotation[1]}
        <br></br>
        Calculated rotations gamma:
        {orientation[2]-initialrotation[2]}

        <br></br>
        Movemnt:
        {calculaterotation()[1]==true?<div>Flexion</div>:<div>Extension</div>}
        <br></br>
        {calculaterotation()[0]}
        
        <br></br>
        Rotation:
        {calculatetransrotation()}

    </div>
  )
}

export default Sensor