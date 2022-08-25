import { MenuItem, Select, TextField } from '@mui/material'
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
      <Select
        value={props.infoEditor.field}
        onChange={(e) => props.onSelectField(e.target.value)}
        required={true}
        InputLabelProps={{
          required: false,
          shrink: true,
          style: { color: '#000000' },
        }}
      >
        <MenuItem disabled value={'Select a field.'}>Select a Field</MenuItem>
        <MenuItem value={'bpm'}>BPM</MenuItem>
        <MenuItem value={'Key'}>Key</MenuItem>
        <MenuItem value={'Length'}>Length</MenuItem>
        <MenuItem value={'Time Signature'}>Time Signature</MenuItem>
        <MenuItem value={'Bar Count'}>Bar Count</MenuItem>
      </Select>
    </div>
  )
}

export default InfoEditorScreen