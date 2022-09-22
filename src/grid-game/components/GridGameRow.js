import React from 'react'
import GridGameTile from './GridGameTile'

const GridGameRow = (props) => {
  return (
    <div
      className='grid-game-row'
      style={{
        
      }}
    >
      {props.row.map((item, key) => (
        <GridGameTile tile={item} key={key}/>
      ))}
    </div>
  )
}

export default GridGameRow