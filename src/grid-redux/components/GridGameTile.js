import React from 'react'

const GridGameTile = (props) => {

  return (
    <div className={`grid-game-tile-${props.item.occupant}`}>
      {props.item.occupant}
    </div>
  )
}

export default GridGameTile