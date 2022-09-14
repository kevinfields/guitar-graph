import React, {useState, useEffect} from 'react'

const Generation = (props) => {

  const [age, setAge] = useState(0);
  const [power, setPower] = useState(0);

  return (
    <div
      style={{
        border: '1px solid black',
        width: '6vw',
        height: '6vw',
        display: 'flex',
        flexDirection: 'column',
        gap: '2vh',
        fontSize: '9pt',
        justifyContent: 'space-evenly',
      }}
    >
      <p>Age: {age}</p>
      <p>Power: {power}</p>
    </div>
  )
}

export default Generation