import { Button, Card, CardHeader, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { EMPTY_PHOTOURL } from '../data/EMPTY_PHOTOURL';
import makeIdFromTitle from '../functions/makeIdFromTitle';

const NewProjectPage = (props) => {

  const [title, setTitle] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const navigate = useNavigate();


  const createProject = async () => {

    if (title === '') {
      return;
    }

    if (props.user === null) {
      navigate('/login');
    } else {
      await props.userRef.collection('projects').doc(makeIdFromTitle(title)).set({
        title: title,
        startDate: new Date(),
        photoURL: photoURL === '' ? EMPTY_PHOTOURL : photoURL
      }).then(() => {
        navigate('/my-projects')
      })
    };
  }


  return (
    <div className='page'>
      <Card
        style={{
          position: 'fixed',
          left: '30vw',
          top: '20vh',
          width: '40vw',
          height: '70vh',
          display: 'flex',
          flexDirection: 'column',
          gap: '1vh',
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}
      >
        <CardHeader 
          title='Create a New Project'
          sx={{
            textAlign: 'center',
          }}
        />
        <TextField
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{
            width: '15vw',
          }}
          placeholder={'Title'}
        />
        <TextField
          value={photoURL}
          onChange={(e) => setPhotoURL(e.target.value)}
          sx={{
            width: '15vw',
          }}
          placeholder={'Photo URL (optional)'}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '20vw',
            justifyContent: 'space-evenly',
          }}
        >
          <Button
            onClick={() => createProject()}
            variant='contained'
          >
            Create Project
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default NewProjectPage