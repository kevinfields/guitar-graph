import React, {useState} from 'react'

const OrderObject = (props) => {
  
  return (
    <div
      draggable={true}
      style={{
        width: '5vw',
        height: '5vh',
        textAlign: 'center',
        border: '1px solid blue',
        borderRadius: '5px',
      }}
      onDrag={() => props.dragObject()}
    >
      {props.item}
    </div>
  )
}

export default OrderObject