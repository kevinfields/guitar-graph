import React from 'react'

const ErrorScreen = (props) => {
  return (
    <div className='error-screen'>
      <h3>Sorry! You hit an obstacle.</h3>
      <div>You made {props.moves} moves.</div>
      <button
        className='error-restart-game-button'
        onClick={() => props.restartGame()}
      >
        Click Here to Restart.
      </button>
    </div>
  )
}

export default ErrorScreen