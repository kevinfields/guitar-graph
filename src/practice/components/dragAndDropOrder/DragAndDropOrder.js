import React, {useState} from 'react'
import OrderObjectContainer from './OrderObjectContainer';

// THIS COMPONENT IS MEANT TO DISPLAY AN ARRAY OF STRINGS AS INDIVIDUAL PARTS THAT CAN BE
// REARRANGED DRAG AND DROP STYLE. TO WORK PROPERLY, IT SHOULD BE IMPLEMENTED WITH ACCESS TO 
// THE ARRAY AS A STATE VARIABLE IN A PROPERTY NAMED 'order' AND TO THE STATE ADJUSTMENT FUNCTION
// IN A PROPERTY NAMED 'adjustOrder', WHICH WILL RETURN THE NEW ORDER. 

// By default the order swapper will be only allow for a replacement style, where
//  ([a,b,c,d,e] with d replacing b => [a,d,c,b,e]).
// By including the property insert={true}, you can set to insert mode, or
// you can create your own switch and set it's value to a state variable x, and say
// insert={x}.

//Ideally, it will look something like this

//  const [order, setOrder] = useState([a, b, c, d, e]);
//  const [insert, setInsert] = useState(false);
//
//  ...
//
//  <DragAndDropOrder
//    order={order}
//    adjustOrder={(newOrder) => setOrder(newOrder)}
//    insert={insert}
//  />
//  <Switch
//    checked={insert}
//    onChange={() => setInsert(!insert)}
//  />
//

const DragAndDropOrder = (props) => {

  const [dragging, setDragging] = useState('');

  const adjustOrder = (newItem, item) => {

    let orderCatcher = [...props.order];
    let offsetIndex = orderCatcher.indexOf(item);
    let removedIndex = orderCatcher.indexOf(newItem);

    if (props.insert) {

      // insert mode
      // abcde (e replacing b) => aebcd

      orderCatcher.splice(removedIndex, 1);
      orderCatcher.splice(offsetIndex, 0, newItem);
      props.onAdjustOrder(orderCatcher);
    } else {

      // swap mode
      // abcde (e replacing b) => aecdb

      let replacement = orderCatcher[removedIndex];
      orderCatcher[removedIndex] = orderCatcher[offsetIndex];
      orderCatcher[offsetIndex] = replacement;
      props.onAdjustOrder(orderCatcher);
    }
  }

  return (
    <div
      className={props.containerClassName ? props.containerClassName : null}
    >
      {props.order.map(item => (
        <OrderObjectContainer 
          order={props.order} 
          item={item} 
          placeHere={(newItem) => adjustOrder(newItem, item)} 
          dragObject={() => setDragging(item)}
          dragging={dragging}
          slotClassName={props.slotClassName ? props.slotClassName : null}
          objectClassName={props.objectClassName ? props.objectClassName : null}
        />
      ))}
    </div>
  )
}

export default DragAndDropOrder