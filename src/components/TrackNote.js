import { Button, TextField, Typography } from '@mui/material'
import React from 'react'

const TrackNote = (props) => {

  if (props.editing) {
    return (
      <div className='track-note'>
        <TextField
          value={props.noteEditor.newText}
          onChange={(e) => props.onNoteEditorChange(e.target.value)}
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
      <Typography>{props.note}</Typography>
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

export default TrackNote