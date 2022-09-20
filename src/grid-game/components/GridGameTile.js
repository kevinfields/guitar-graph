import React from 'react'

const GridGameTile = (props) => {

  return (
    <div 
      className='grid-game-tile'
      style={{
        width: '5vh',
        height: '5vh',
        border: '1px solid black',
        fontSize: '8pt',
      }}
    >
      {props.tile.currentOccupantId} | {props.tile.coordinates}
    </div>
  )
}

export default GridGameTile