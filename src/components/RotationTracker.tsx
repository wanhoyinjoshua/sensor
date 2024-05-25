import  { useEffect } from 'react'

const RotationTracker = (props:any) => {
    
    useEffect(()=>{
        if(props.data>props.high){
            props.setHigh(props.data)
        }
    },[props.data])
  return (
    <div>RotationTracker
    Highest angular acceleration achieved :
    <br></br>
    {props.high} degrees per second sqaured
    
    </div>
  )
}

export default RotationTracker