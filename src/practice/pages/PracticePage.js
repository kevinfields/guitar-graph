import { Switch } from '@mui/material';
import React, {useState, useEffect} from 'react'
import DragAndDropOrder from '../components/dragAndDropOrder/DragAndDropOrder'

const PracticePage = (props) => {

  const [order, setOrder] = useState([1, 2, 3, 4, 5]);
  const [insert, setInsert] = useState(true);

  return (
    <div className='page'>
      <DragAndDropOrder 
        order={order}
        onAdjustOrder={(newOrder) => setOrder(newOrder)}
        insert={insert}
      />
      <div
      >
        <Switch
          checked={insert}
          onChange={() => setInsert(!insert)}
        />
        {insert ? 
          <div
          >
            Insert Mode
          </div>
          :
          <div
          >
            Swap Mode
          </div>
        }
      </div>
    </div>
  )
}

export default PracticePage