import React from 'react'

const SuccessScreen = (props) => {
  return (
    <div className='success-screen'>
      <h3 className='success-header'>
        Congratulations!
      </h3>
      <div className='success-message'>You beat this grid in {props.moves} moves.</div>
      <button 
        className='restart-button'
        onClick={() => props.restartGame()}
      >
        Click Here to Restart
      </button>
    </div>
  )
}

export default SuccessScreen