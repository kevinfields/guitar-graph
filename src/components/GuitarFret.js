import React from 'react'

const positionColors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'magenta'];
const GuitarFret = (props) => {

  return (
    <div 
      className={'fret'}
      style={{
        backgroundColor: props.position === -1 ? 'white' : positionColors[props.position] 
      }}
    >
      {props.note}
    </div>
  )
}

export default GuitarFret