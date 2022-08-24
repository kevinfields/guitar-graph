import { MenuItem, TextField } from '@mui/material'
import React from 'react'

const InfoEditorScreen = (props) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1vh',
        width: '20vw',
        height: '40vh',
        overflowY: 'scroll',
      }}
    >
      <TextField
        select
        value={props.infoEditor.field}
        onChange={(e) => props.onSelectField(e.target.value)}
      >
        <MenuItem value={'bpm'}>BPM</MenuItem>
        <MenuItem value={'Key'}>Key</MenuItem>
        <MenuItem value={'Length'}>Length</MenuItem>
        <MenuItem value={'Time Signature'}>Time Signature</MenuItem>
        <MenuItem value={'Bar Count'}>Bar Count</MenuItem>
      </TextField>
    </div>
  )
}

export default InfoEditorScreen