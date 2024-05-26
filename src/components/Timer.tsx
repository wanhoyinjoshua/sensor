import { useState, useEffect } from 'react';

const Timer = (props:any) => {
  const [seconds, setSeconds] = useState(props.initialSeconds);
  const [isActive, setIsActive] = useState(false);

  
  useEffect(() => {
    let timerId:any
    if (isActive && seconds > 0) {
      timerId = setInterval(() => {
        setSeconds((prevSeconds:any) => prevSeconds - 1);
      }, 1000);
    }
    if(seconds==0){
        localStorage.setItem("initial",JSON.stringify(props.abc))
        props.setInitialRotation(props.quat)
        setIsActive(false);
        setSeconds(props.initialSeconds)
    }


    return () => clearInterval(timerId);
  }, [isActive, seconds]);

  const startTimer = () => {
    setIsActive(true);
  };

  return (
   
    
      <button className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" 
      onClick={startTimer} disabled={isActive}>
        Start Timer <span>{seconds}</span> s 
      </button>
      
 
  );
};

export default Timer;
