import React, {useState} from 'react'
import ADJUST_TRACK_ORDER from '../../reducers/ADJUST_TRACK_ORDER';
import OrderObject from './OrderObject'
import OrderObjectContainer from './OrderObjectContainer';

const DragAndDropOrder = (props) => {

  const [dragging, setDragging] = useState('');

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1vh',
      }}
    >
      {props.order.map(item => (
        <OrderObjectContainer 
          order={props.order} 
          item={item} 
          placeHere={(oldItem) => props.adjustObjectOrder(dragging, oldItem)} 
          dragObject={() => setDragging(item)}
          dragging={dragging}
        />
      ))}
    </div>
  )
}

export default DragAndDropOrder