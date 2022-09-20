import React from 'react'

const GridGameTile = (props) => {

  return (
    <div 
      className={`grid-game-tile-${props.tile.currentOccupantId}`}
      style={{
        width: '5vh',
        height: '5vh',
        border: '1px solid black',
        fontSize: '7pt',
      }}
    >
      {props.tile.currentOccupantId}
    </div>
  )
}

export default GridGameTile