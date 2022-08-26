import { Button, Card, CardHeader, CardMedia, Typography } from '@mui/material';
import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

const CurrentProjectCard = (props) => {

  const timeStamp = new Date(props.project.data.startDate.seconds * 1000);
  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        padding: '1vh',
        width: '30%',
        marginLeft: '35%',
        display: 'flex',
        flexDirection: 'column',
        gap: '3vh',
        minHeight: 'min-content',
      }}
    >
      <CardHeader
        title={props.project.data.title}
      />
      <CardMedia 
        component='img'
        src={props.project.data.photoURL} 
        sx={{
          width: '18vh',
          height: '18vh',
          alignSelf: 'center',
        }}
      />
      <Typography
      >
        Created: {timeStamp.toLocaleString('en-US', dateOptions)}
      </Typography>
      <Button
        variant='contained'
        onClick={() => navigate(`/my-projects/${props.project.id}`)}
      >
        Open Project
      </Button>
    </Card>
  )

}

export default CurrentProjectCard