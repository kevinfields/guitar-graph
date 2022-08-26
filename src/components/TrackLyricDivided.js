import React from 'react';
import {Typography} from '@mui/material';

const TrackLyricDivided = (props) => {

  const lyricList = props.verse.split('//');

  return (
    <div>
      {lyricList.map(line => (
        <Typography className='lyric-line'>{line}</Typography>
      ))}
    </div>
  )
}

export default TrackLyricDivided