import React, {useState} from 'react'

const OrderObject = (props) => {
  
  return (
    <div
      draggable={true}
      className={props.objectClassName ? props.objectClassName : null}
      onDrag={() => props.dragObject()}
    >
      {props.item}
    </div>
  )
}

export default OrderObject