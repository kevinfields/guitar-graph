import React, {useState, useEffect} from 'react'

const Generation = (props) => {

  const [age, setAge] = useState(0);
  const [power, setPower] = useState(0);

  return (
    <div
      className='generation'
      style={{
        position: 'fixed',
        left: `${props.position.x}vw`,
        top: `${props.position.y}vh`,
      }}
    >
      <p>Age: {age}</p>
      <p>Power: {power}</p>
      <p>Position: {props.position.x} , {props.position.y}</p>
    </div>
  )
}

export default Generation