

const Welcome = (props:any) => {
  return (
    <div>
        <section>
            This is the main screen.
            <br></br>
            Purpose of this web app.<br>
            </br>
            <ul>
                <li> To provide an accessible interface to measure physiological flexion and rotation of the cervical spine.</li>
                <li>To allow measuring of angle during a hallpike.</li>
                <li>To provide feedback regarding acceleration achieved during a head impulse test.</li>

            </ul>
            <br>
            </br>
            In turn , hopefully this provides a simple and accessible way to standardize vestibular testing or providing a more reliable measurement of cervical rotation or flexion.
            <br>
            </br>
            <button
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
             onClick={()=>{props.setScreen(1)}}>Calibrate Phone to sensors</button>
            <br></br>
            <button
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
             onClick={()=>{props.setScreen(2)}}>Sensor Interface</button>
           

          

        </section>



    </div>
  )
}

export default Welcome