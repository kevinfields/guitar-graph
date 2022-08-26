import { Card, CardHeader, CardMedia, Typography } from '@mui/material';
import React, {useState, useEffect} from 'react'
import Loading from '../components/Loading';

const ProfilePage = (props) => {

  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    loadUserData();
  }, [])


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
          <Typography>Username: {userData.data.username}</Typography>
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
        </Card>
      }
    </div>
  )
}

export default ProfilePage