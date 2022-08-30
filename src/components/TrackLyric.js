import { Button, TextField, Typography } from '@mui/material'
import React from 'react'
import TrackLyricDivided from './TrackLyricDivided'

const TrackLyric = (props) => {

  if (props.editing) {
    return (
      <div className='track-note'>
        <TextField
          value={props.lyricEditor.newText}
          onChange={(e) => props.onLyricEditChange(e.target.value)}
          variant='outlined'
        />
        <div className='track-note-buttons'>
          <Button
            variant='contained'
            onClick={() => props.onSave()}
            color='success'
          >
            Save
          </Button>
          <Button
            variant='contained'
            onClick={() => props.onExit()}
            color='error'
          >
            Exit
          </Button>
        </div>
      </div>
    )
  };

  return (
    <div className='track-note'>
      <TrackLyricDivided verse={props.lyric} />
      <div className='track-note-buttons'>
        <Button
          variant='contained'
          color='secondary'
          onClick={() => props.onOpenEditor()}
        >
          Edit
        </Button>
        <Button
          variant='contained'
          color='error'
          onClick={() => props.onOpenDeleteScreen()}
        >
          Delete
        </Button>
      </div>
    </div>
  )
}

export default TrackLyric