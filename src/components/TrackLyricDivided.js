import React, {useState, useEffect} from 'react';
import {Button, Card, TextField, Typography} from '@mui/material';

const TrackLyricDivided = (props) => {

  const lyricList = props.verse.split('//');
  const [lyric, setLyric] = useState(props.note);
  const [editing, setEditing] = useState(false);

  const saveLyric = (lyric) => {
    setEditing(false);
    props.saveLyric(lyric);
  }

  return (
    <Card
      sx={{
        width: '35vw',
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
          {props.lyric}
        </Typography>
        :
        <TextField
          value={lyric}
          onChange={(e) => setLyric(e.target.value)}
          placeholder={props.lyric}
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
          flexDirection: 'column',
          gap: '1vw',
          margin: '2vh',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1vh',
            margin: '1vh',
          }}
        >
          {lyricList.map(line => (
            <Typography className='lyric-line'>{line}</Typography>
          ))}
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '2vh',
          }}
        >
        { props.onOpenAssignmentScreen ?
            <Button
              variant='contained'
              color='secondary'
              onClick={() => props.onOpenAssignmentScreen()}
            >
              Assign To Track
            </Button>
          :
            null
        }
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
              onClick={() => saveLyric(lyric)}
              variant='contained'
              color='success'
            >
              Save
            </Button>
        }
        <Button
          onClick={() => props.deletelyric()}
          variant='contained'
          color='error'
        >
          Delete
        </Button>
      </div>
      </div>
    </Card>
  )
}

export default TrackLyricDivided