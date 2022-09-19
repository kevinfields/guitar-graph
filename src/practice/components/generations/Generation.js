import React, {useState, useEffect} from 'react'
import getBorderStyle from '../../functions/getBorderStyle';

const Generation = (props) => {



  return (
    <div
      className='generation'
      style={{
        position: 'fixed',
        left: `${props.gen.position.x}vw`,
        top: `${props.gen.position.y}vh`,
        borderInline: getBorderStyle(props.gen),
      }}
    >
      <p>Age: {props.gen.age}</p>
      <p>Health: {props.gen.health}</p>
      <p>Power: {props.gen.power}</p>
    </div>
  )
}

export default Generation