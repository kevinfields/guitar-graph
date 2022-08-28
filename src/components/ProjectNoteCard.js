import { Button, Card, TextField, Typography } from '@mui/material'
import React, {useState} from 'react'

const ProjectNoteCard = (props) => {

  const [note, setNote] = useState(props.note);
  const [editing, setEditing] = useState(false);

  const saveNote = (note) => {
    setEditing(false);
    props.saveNote(note);
  }


  return (
    <Card
      sx={{
        width: '50vw',
        padding: '2vh',
      }}
    >
      { !editing ?
        <Typography
          sx={{
            width: '45vw',
            marginLeft: '2.5vw',
          }}
        >
          {props.note}
        </Typography>
        :
        <TextField
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder={props.note}
          multiline
          rows={5}
          sx={{
            width: '100%',
          }}
        />
      }
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '1vw',
        }}
      >
        {
          !editing ? 
            <Button
              onClick={() => setEditing(true)}
              variant='contained'
            >
              Edit
            </Button>
          : 
            <Button
              onClick={() => saveNote(note)}
              variant='contained'
              color='success'
            >
              Save
            </Button>
        }
        <Button
          onClick={() => props.deleteNote()}
          variant='contained'
          color='error'
        >
          Delete
        </Button>
      </div>
      {props.onOpenAssignmentScreen ?
        <Button
          onClick={() => props.onOpenAssignmentScreen()}
          variant='contained'
          color='secondary'
        >
          Assign to Track
        </Button>
        :
        null
      }
    </Card>
  )
}

export default ProjectNoteCard;