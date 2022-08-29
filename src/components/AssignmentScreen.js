import { Button, Card, MenuItem, Select, TextField } from '@mui/material'
import React, {useState} from 'react'

const AssignmentScreen = (props) => {

  const [track, setTrack] = useState(props.tracklist[0]);

  console.log('tracklist: ')
  console.table(props.tracklist)

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: '1vw',
        margin: '1vw',
      }}
    >
      <TextField
        select
        type='string'
        value={track.id}
        onChange={(e) => setTrack(props.tracklist.find(trackItem => trackItem.id === e.target.value))}
      >
        {props.tracklist.map(trackItem => (
          <MenuItem value={trackItem.id}>{trackItem.data.songTitle}</MenuItem>
        ))}
      </TextField>
      <Button
        variant='contained'
        onClick={() => props.chooseTrack(track)}
        color='success'
      >
        Save
      </Button>
      <Button
        variant='contained'
        onClick={() => props.close()}
        color='error'
      >
        Exit
      </Button>
    </Card>
  )
}

export default AssignmentScreen