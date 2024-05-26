import  { useEffect } from 'react'

const RotationTracker = (props:any) => {
    
    useEffect(()=>{
        if(props.data>props.high){
            props.setHigh(props.data)
        }
    },[props.data])
  return (
   <div>
     {props.high} 

   </div>
   
    
  
  )
}

export default RotationTracker