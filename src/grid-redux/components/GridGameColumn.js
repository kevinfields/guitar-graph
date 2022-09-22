import React from 'react'
import GridGameTile from './GridGameTile'

const GridGameColumn = (props) => {

  return (
    <div className='grid-game-row'>
      {props.column.map((item, key) => (
        <GridGameTile item={item} key={key} />
      ))}
    </div>
  )
}

export default GridGameColumn