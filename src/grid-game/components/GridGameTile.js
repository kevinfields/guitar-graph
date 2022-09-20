import React from 'react'

const GridGameTile = (props) => {

  return (
    <div 
      className={`grid-game-tile-${props.tile.currentOccupantId}`}
      style={{
        
      }}
    >
      {props.tile.currentOccupantId}
    </div>
  )
}

export default GridGameTile