import React from 'react'

const GridDifficultySelector = (props) => {

  return (
    <div className='grid-difficulty-selector'>
      <button 
        className={`difficulty-button-${props.difficulty === 0 ? 'selected' : 'unselected'}`}
        onClick={() => props.setDifficulty(0)}
      >
        Easy
      </button>
      <button 
        className={`difficulty-button-${props.difficulty === 1 ? 'selected' : 'unselected'}`}
        onClick={() => props.setDifficulty(1)}
      >
        Medium
      </button>
      <button 
        className={`difficulty-button-${props.difficulty === 2 ? 'selected' : 'unselected'}`}
        onClick={() => props.setDifficulty(2)}
      >
        Hard
      </button>
  </div>
  )
}

export default GridDifficultySelector