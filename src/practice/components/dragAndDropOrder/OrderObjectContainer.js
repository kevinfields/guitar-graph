import React, {useState} from 'react'
import OrderObject from './OrderObject'

const OrderObjectContainer = (props) => {

  const [highlit, setHighlit] = useState(false);

  const dropItem = () => {
    setHighlit(false);
    props.placeHere(props.dragging);
  };

  return (
    <div
      style={{
        width: '7vw',
        height: '7vh',
        backgroundColor: highlit ? 'lightblue' : 'white',
        paddingLeft: '1vw',
        paddingTop: '1vh',
      }}
      onDrop={() => dropItem()}
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