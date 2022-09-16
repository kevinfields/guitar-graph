import React from 'react'

const Resource = (props) => {
  return (
    <div 
      className='resource'
      style={{
        position: 'fixed',
        left: `${props.resource.x}vw`,
        top: `${props.resource.y}vh`,
      }}
    >
      <p>{props.resource.type}</p>
      <p>{props.resource.value}</p>
    </div>
  )
}

export default Resource