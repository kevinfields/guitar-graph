import React, {useState} from 'react'
import OrderObject from './OrderObject'

const OrderObjectContainer = (props) => {

  const [highlit, setHighlit] = useState(false);
  return (
    <div
      style={{
        border: '1px solid black',
        width: '7vw',
        height: '7vh',
        backgroundColor: highlit ? 'lightblue' : 'white',
      }}
      onDrop={() => props.placeHere(props.item)}
      onDragOver={(e) => e.preventDefault()}
      onDragEnter={() => setHighlit(true)}
      onDragLeave={() => setHighlit(false)}
    >
      <OrderObject 
        item={props.item} 
        dragObject={() => props.dragObject(props.item)}
        dragging={props.dragging}
      />
    </div>
  )
}

export default OrderObjectContainer