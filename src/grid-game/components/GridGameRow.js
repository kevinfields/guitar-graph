import React from 'react'
import GridGameTile from './GridGameTile'

const GridGameRow = (props) => {
  return (
    <div
      className='grid-game-row'
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '1vw',
      }}
    >
      {props.row.map(item => (
        <GridGameTile tile={item} key={Math.floor(Math.random() * 10000)}/>
      ))}
    </div>
  )
}

export default GridGameRow