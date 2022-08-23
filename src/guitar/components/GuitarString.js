import { Button } from '@mui/material';
import React from 'react'
import getNote from '../../functions/getNote';
import GuitarFret from './GuitarFret';

const GuitarString = (props) => {

  let frets = [];

  for (let i=0; i<23; i++) {
    frets.push({
      index: i,
      note: getNote(i, props.openNote)
    });
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '0.5vw',
      }}
    >
      <Button onClick={() => props.tuneDown()}>-</Button>
      <Button onClick={() => props.tuneUp()}>+</Button>
      {frets.map(fret => (
        <GuitarFret
          index={fret.index}
          note={fret.note}
          position={props.scaleNotes.includes(fret.note) ? props.scaleNotes.indexOf(fret.note) : -1}
        />
      ))}
    </div>
  )
}

export default GuitarString