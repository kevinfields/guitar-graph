import { Button } from '@mui/material';
import React from 'react'
import GuitarFretNumber from './GuitarFretNumber';

const frets = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];

const GuitarFretNumbering = (props) => {
  return (
    <div 
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '0.5vw',
      }}
    >
      <Button onClick={() => props.adjustAll('down')}> - </Button>
      <Button onClick={() => props.adjustAll('up')}> + </Button>
      {frets.map(fret => (
        <GuitarFretNumber number={fret} />
      ))}
    </div>
  )
}

export default GuitarFretNumbering