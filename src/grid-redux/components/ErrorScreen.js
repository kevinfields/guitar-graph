import React from 'react'

const ErrorScreen = (props) => {
  return (
    <div className='error-screen'>
      <h3 className='error-header'>Sorry! You hit an obstacle.</h3>
      <div className='error-message'>You made {props.moves} moves.</div>
      <button
        className='restart-button'
        onClick={() => props.restartGame()}
      >
        Click Here to Restart.
      </button>
    </div>
  )
}

export default ErrorScreen