import { Button, Card, CardHeader, CardMedia, TextField, Typography } from '@mui/material';
import React, {useState, useEffect} from 'react'
import Loading from '../components/Loading';
import CHANGE_USERNAME from '../reducers/CHANGE_USERNAME';
import CHECK_USERNAME_AVAILABILITY from '../reducers/CHECK_USERNAME_AVAILABILITY';

const ProfilePage = (props) => {

  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [editingName, setEditingName] = useState({open: false, newName: '', takenError: false});

  const loadUserData = async () => {

    let user;
    await props.userRef.get().then((doc) => {
      user = {
        id: doc.id,
        data: doc.data(),
      }
    });
    setUserData(user);
    setLoading(false);
  };

  const saveNewName = async () => {

    const available = await CHECK_USERNAME_AVAILABILITY(props.takenNamesRef, editingName.newName);
    if (!available) {
      setEditingName({...editingName, newName: '', takenError: true});
      return;
    };
    const changed = await CHANGE_USERNAME(props.takenNamesRef, props.userRef, editingName.newName);

    if (!changed) {
      setEditingName({...editingName, newName: '', takenError: true});
      return;
    };
    setUserData({
      id: userData.id, 
      data: {...userData.data, username: editingName.newName},
    });
    setEditingName({open: false, newName: '', takenError: false});
  };

  useEffect(() => {
    loadUserData();
  }, []);

  const receiveNotifications = () => {
    Notification.requestPermission().then(perm => {
      alert(perm);
      if (perm === 'granted') {
        const notif = new Notification('This is a random notification', {
          body: (Math.floor(Math.random() * 132123) + 1),
          onShow: () => console.log('showing'),
        })
      }
    })
  };

  const randomNotification = () => {
    
  }


  return (
    <div className='page'>
      {loading ? <Loading />
      :
        <Card
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1vh',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}
        >
          <CardHeader title={'My Profile'} />
          { editingName.open ?
            <div className='text-field-save-exit'>
              <TextField
                value={editingName.newName}
                onChange={(e) => setEditingName({...editingName, newName: e.target.value})}
                placeholder={editingName.takenError ? 'That username is taken.' : 'Enter a new username.'}
              />
              <Button
                onClick={() => saveNewName()}
                variant='contained'
                color='success'
              >
                Save
              </Button>
              <Button
                onClick={() => setEditingName({...editingName, open: false, takenError: false})}
                variant='contained'
                color='error'
              >
                Exit
              </Button>
            </div>
            :
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '1vw',
              }}
            >
              <Typography>Username: {userData.data.username}</Typography>
              <Button
                variant='contained'
                color='secondary'
                onClick={() => setEditingName({...editingName, open: true})}
              >
                Edit
              </Button>
            </div>
          }
          <Typography>User ID: {userData.id}</Typography>
          <Typography>Email: {userData.data.email}</Typography>
          <CardMedia
            component='img'
            src={userData.data.photoURL}
            sx={{
              maxWidth: '15vw',
              maxHeight: '15vw',
            }}
          />
          <Button
            onClick={() => receiveNotifications()}
            variant='contained'
            color='primary'
          >
            Receive Push Notificiations
          </Button>
          <Button
            onClick={() => randomNotification()}
            variant='contained'
            color='secondary'
          
          >
            Receive Notification
          </Button>
        </Card>
      }
    </div>
  )
}

export default ProfilePage