import { Button, Card, MenuItem, Select } from '@mui/material'
import React, {useState} from 'react'

const AssignmentScreen = (props) => {

  const [track, setTrack] = useState(props.tracklist[0]);

  return (
    <Card>
      <Select
        value={track.id}
        onChange={(e) => setTrack(e.target.value)}
      >
        {props.tracklist.map(track => (
          <MenuItem value={track.id}>{track.data.title}</MenuItem>
        ))}
      </Select>
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