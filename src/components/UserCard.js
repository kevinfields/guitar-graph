import { Card, CardHeader, CardMedia, Typography } from '@mui/material'
import React from 'react'

const UserCard = (props) => {
  return (
    <div className='user-card'>
      <Card
        sx={{
          padding: '1vw',
        }}
      >
        <CardHeader title={props.user.username} />
        <Typography>Email: {props.user.email}</Typography>
        <CardMedia
          src={props.user.photoURL}
          component='img'
          sx={{
            maxHeight: '20vh',
            maxWidth: '20vh',
          }}
        />
      </Card>
    </div>
  )
}

export default UserCard