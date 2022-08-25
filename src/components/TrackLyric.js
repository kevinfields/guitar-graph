import { Button, TextField, Typography } from '@mui/material'
import React from 'react'

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
          >
            Save
          </Button>
          <Button
            variant='contained'
            onClick={() => props.onExit()}
          >
            Exit
          </Button>
        </div>
      </div>
    )
  };

  return (
    <div className='track-note'>
      <Typography>{props.lyric}</Typography>
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