import { Button, Card, MenuItem, Select, TextField } from '@mui/material'
import React, {useState} from 'react'

const AssignmentScreen = (props) => {

  const [track, setTrack] = useState(props.tracklist[0]);

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
        value={track}
        onChange={(e) => setTrack(e.target.value)}
      >
        {props.tracklist.map(trackItem => (
          <MenuItem value={trackItem}>{trackItem.data.title}</MenuItem>
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