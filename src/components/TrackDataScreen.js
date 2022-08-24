import { Button, Typography } from '@mui/material'
import React from 'react'

const TrackDataScreen = (props) => {

  let infoArr = [];

  for (const data in props.info) {

    console.log('data: ' + data);
    console.log('props.info[data]: ' + props.info[data]);

    if (typeof props.info[data] === 'string') {
      console.log('string data: ' + data);
      infoArr.push({
        field: data,
        value: props.info[data],
      })
    }
  };


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
      <Button
        variant='outlined'
        onClick={() => props.openInfoEditSelector()}
      >
        Add Info
      </Button>
      {infoArr.map(item => (
        <Typography>{item.field} - {item.value}</Typography>
      ))}
    </div>
  )
}

export default TrackDataScreen