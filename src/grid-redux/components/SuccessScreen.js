import React from 'react'

const SuccessScreen = (props) => {
  return (
    <div className='success-screen'>
      <h3>Congratulations!</h3>
      <div>You beat this grid in {props.moves} moves.</div>
      <button 
        className='restart-game-button'
        onClick={() => props.restartGame()}
      >
        Click Here to Restart
      </button>
    </div>
  )
}

export default SuccessScreen