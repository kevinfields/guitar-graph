import { Card } from '@mui/material'
import React, {useEffect, useState} from 'react';
import GuitarFretNumbering from './GuitarFretNumbering';
import GuitarPositionDots from './GuitarPositionDots';
import GuitarString from './GuitarString';

const notes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];


const GuitarNeck = (props) => {

  const [tuning, setTuning] = useState([
    {number: 1, note: 'E'}, {number: 2, note: 'A'}, {number: 3, note: 'D'}, {number: 4, note: 'G'}, {number: 5, note: 'B'}, {number: 6, note: 'E'}
  ]);

  const tuneString = (string, direction) => {

    const noteIndex = direction === 'down' ? notes.lastIndexOf(string.note) : notes.indexOf(string.note);

    let tuningCatcher = [...tuning];
    const stringIndex = tuning.indexOf(string);

    tuningCatcher[stringIndex] = {
      ...tuningCatcher[stringIndex],
      note: notes[noteIndex + (direction === 'down' ? -1 : 1)],
    };
    setTuning(tuningCatcher);
    props.adjustTuning(tuningCatcher);
  };

  const tuneAll = (direction) => {

    let tuningCatcher = [...tuning];
    
    for (let i=0; i<tuningCatcher.length; i++) {

      const noteIndex = direction === 'down' ? notes.lastIndexOf(tuningCatcher[i].note) : notes.indexOf(tuningCatcher[i].note);
      const nextIndex = direction === 'down' ? noteIndex - 1 : Number(noteIndex) + 1;

      tuningCatcher[i] = {
        ...tuningCatcher[i],
        note: notes[nextIndex],
      }
    };
    setTuning(tuningCatcher);
    props.adjustTuning(tuningCatcher);
  }

  useEffect(() => {
    props.adjustTuning(tuning);
  }, [])


  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column-reverse',
        gap: '1vh',
      }}
    >
      <GuitarFretNumbering 
        adjustAll={(dir) => tuneAll(dir)}
      />
      {tuning.map(string => (
        <GuitarString
          openNote={string.note}
          number={string.number}
          scaleNotes={props.scaleNotes}
          tuneDown={() => tuneString(string, 'down')}
          tuneUp={() => tuneString(string, 'up')}
        />
      ))}
      <GuitarPositionDots />
    </Card>
  )
}

export default GuitarNeck