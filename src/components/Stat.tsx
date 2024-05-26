import RotationTracker from "./RotationTracker"
const Stat = (props:any) => {
    return (
        <div className="bg-gray-900">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 gap-px bg-white/5 sm:grid-cols-2 lg:grid-cols-4">
              {props.stats.map((stat:any) => (
                <div key={stat.name} className="bg-gray-900 px-4 py-6 sm:px-6 lg:px-8">
                  <p className="text-sm font-medium leading-6 text-gray-400">{stat.name}</p>
                  <p className="mt-2 flex justify-center gap-x-2">
                    <span className="text-4xl font-semibold tracking-tight text-white">{stat.value}</span>
                  
                  </p>
                  {stat.unit ? <span className="text-sm text-gray-400">{stat.unit}</span> : null}
                </div>
              ))}
              <div key={"Peak Acceleration"} className="bg-gray-900 px-4 py-6 sm:px-6 lg:px-8">
                  <p className="text-sm font-medium leading-6 text-gray-400">Peak Angular Acceleration</p>
                  <p className="mt-2 flex  justify-center gap-x-2">
                    <span className="text-4xl font-semibold tracking-tight text-white"><RotationTracker data={props.gyro} high={props.high} setHigh={props.setHigh}></RotationTracker></span>
                    
                  </p>
                  <span className="text-sm text-gray-400">degrees second sqaured</span>
                </div>
              
       
            </div>
          </div>
        </div>
      )
}

export default Stat