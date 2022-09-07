import React, {useState, useEffect} from 'react'
import DragAndDropOrder from '../components/DragAndDropOrder'

const PracticePage = (props) => {

  const [order, setOrder] = useState([1, 2, 3, 4, 5]);

  const adjustOrder = (newItem, item) => {

    console.log(`adjusting order, putting ${newItem} where ${item} was.`);

    let orderCatcher = [...order];
    let offsetIndex = orderCatcher.indexOf(item);
    let removedIndex = orderCatcher.indexOf(newItem);

    orderCatcher.splice(removedIndex, 1);
    orderCatcher.splice(offsetIndex, 0, newItem);
    setOrder(orderCatcher);
  }

  return (
    <div className='page'>
      <DragAndDropOrder 
        order={order} 
        adjustOrder={(newOrder) => setOrder(newOrder)} 
        adjustObjectOrder={(newItem, item) => adjustOrder(newItem, item)}
      />
    </div>
  )
}

export default PracticePage