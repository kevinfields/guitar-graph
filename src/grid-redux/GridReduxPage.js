import React, { useState } from 'react';
import GridGameBoard from './components/GridGameBoard';
import './GridRedux.css';


const GridReduxPage = (props) => {

  const [size, setSize] = useState(0);
  const [columns, setColumns] = useState(0);

  return (
    <div className='page'>
      <GridGameBoard size={columns} />
      <div className='control-panel'>
        <input
          className='size-control-input'
          type='number'
          value={size}
          onChange={(e) => setSize(e.target.value)}
        />
        <button
          className='size-control-button'
          onClick={() => setColumns(size)}
        >
          Change Size
        </button>
      </div>
    </div>
  )
}

export default GridReduxPage