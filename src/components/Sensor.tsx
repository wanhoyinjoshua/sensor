import { useEffect, useState } from 'react'
import useOrientation from '../hooks/useOrientation'
const Sensor = () => {
    const orientation=useOrientation()
    const [initialrotation,setInitialRotation]=useState<any>([0,0,0])

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
        var neutral=90
        var d0=initialrotation[2]
        var d1=orientation[2]
        var isFlexion=false

        //sign 
        if (d0<0 && d1<0){
              //if from smaller -ve to bigger -ve then it will be extension 
        // if from bigger _ve to smaller -ve will be flexion
            if(d0<d1){
                isFlexion=false
            }
            else{
                isFlexion=true
            }

        }
        else if (d0>0 && d1>0){
            //if from +ve to smaller ve , then will be flexion 
        //if from smaller +ve to bigger +ve , then will be extension 
                if(d0>d1){
                    isFlexion=true
                }
                else{
                    isFlexion=false
                }

        }else if(d0>=0 &&d1<=0){
             // if from +ve to -ve then will be extension
             isFlexion=false

        }
        else{
             // from -ve to +ve will be flexion 
             isFlexion=true

        }
       
      

        

       
       

        

        var distfrom_90_starting= neutral-Math.abs(orientation[2])
        var distfrom_90_fixed=neutral-Math.abs(initialrotation[2])
        if(distfrom_90_starting==distfrom_90_fixed){
            var total_motion=0
        }else{
            var total_motion=distfrom_90_fixed+distfrom_90_starting

        }
       
        return [total_motion,isFlexion]

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

    </div>
  )
}

export default Sensor