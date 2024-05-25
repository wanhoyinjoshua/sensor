import  { useEffect, useState } from 'react'

const RotationTracker = (props:any) => {
    const [high,setHigh]=useState(0)
    useEffect(()=>{
        if(props.data>high){
            setHigh(props.data)
        }
    },[props.data])
  return (
    <div>RotationTracker
    Highest angular acceleration achieved :
    <br></br>
    {high} degrees per second sqaured
    
    </div>
  )
}

export default RotationTracker