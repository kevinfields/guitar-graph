import React from 'react'

const GridDataSheet = (props) => {
  return (
    <div className='grid-data-sheet'>
      <div className='grid-data-item'>Obstacle Count: {props.obstacleCount}</div>
      <div className='grid-data-item'>Current Score: {props.currentScore}</div>
      <div className='grid-data-item'>Current Errors: {props.currentErrors}</div>
    </div>
  )
}

export default GridDataSheet