import React, {useState, useEffect} from 'react'
import {FiberManualRecord} from '@mui/icons-material'
import { Button } from '@mui/material'

const Dot = (props) => {


  if (props.fret === 0) {
    return (
      <div className='fret-dot-open'/>
    )
  }

  if (props.fret === 12) {
    return (
      <div className='fret-dot-2'>
        <FiberManualRecord fontSize='small' />
        <FiberManualRecord fontSize='small' />
      </div>
    )
  }

  if ([3, 5, 7, 9, 15, 17, 19].includes(props.fret)) {
    return (
      <div className='fret-dot-1'>
        <FiberManualRecord fontSize='small' />
      </div>
    )
  }

  return (
    <div className='fret-dot-empty' />
  )
}




const GuitarPositionDots = (props) => {

  const [theme, setTheme] = useState(0);

  const frets = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];

  
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '0.5vw',
        alignItems: 'flex-end',
      }}
    >
      <Button onClick={() => setTheme(theme - 1)}> - </Button>
      <Button onClick={() => setTheme(theme + 1)}> + </Button>
      {
        frets.map(fret => (
          <Dot fret={fret} />
        ))
      }
    </div>
  )
}

export default GuitarPositionDots