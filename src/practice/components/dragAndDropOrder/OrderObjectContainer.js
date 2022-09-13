import React, {useState} from 'react'
import OrderObject from './OrderObject'
import '../../styling/DragAndDrop.css';

const OrderObjectContainer = (props) => {

  const [highlit, setHighlit] = useState(false);


  const dropItem = () => {
    setHighlit(false);
    props.placeHere(props.dragging);
  };

  return (
    <div
      style={{
        backgroundColor: highlit ? 'lightblue' : 'white',
      }}
      className={props.slotClassName ? props.slotClassName : null}
      onDrop={() => dropItem()}
      onDragOver={(e) => e.preventDefault()}
      onDragEnter={() => setHighlit(true)}
      onDragLeave={() => setHighlit(false)}
    >
      <OrderObject 
        item={props.item} 
        dragObject={() => props.dragObject(props.item)}
        dragging={props.dragging}
        objectClassName={props.objectClassName ? props.objectClassName : null}
        children={props.children}
      />
    </div>
  )
}

export default OrderObjectContainer