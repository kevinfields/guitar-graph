import React from 'react';
import {Button, Typography} from '@mui/material';

const TrackLyricDivided = (props) => {

  const lyricList = props.verse.split('//');

  return (
    <div>
      {lyricList.map(line => (
        <Typography className='lyric-line'>{line}</Typography>
      ))}
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
    </div>
  )
}

export default TrackLyricDivided