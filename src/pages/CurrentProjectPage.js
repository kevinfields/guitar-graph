import { QuestionAnswer } from '@mui/icons-material';
import { Button, Card, CardHeader, Typography } from '@mui/material';
import React, {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Loading from '../components/Loading';
import QuestionModal from '../components/QuestionModal';
import CREATE_NEW_SONG from '../reducers/CREATE_NEW_SONG';

const CurrentProjectPage = (props) => {


  const [project, setProject] = useState({});
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingTrack, setDeletingTrack] = useState({open: false, track: {}});
  const navigate = useNavigate();
  const { id } = useParams();

  const loadProject = async () => {

    let data;
    let tracklist = [];
    await props.userRef.collection('projects').doc(id).get().then(doc => {
      data = doc.data();
    });

    await props.userRef.collection('projects').doc(id).collection('tracks').get().then(snap => {
      snap.forEach(doc => {
        tracklist.push({
          id: doc.id,
          data: doc.data(),
        })
      })
    })
    setProject(data);
    setTracks(tracklist);
    setLoading(false);
  }

  const createNewSong = async () => {
    await CREATE_NEW_SONG(props.userRef.collection('projects').doc(id)).then(() => {
      loadProject();
    })
  };

  const deleteTrack = async () => {
    await 
    props.userRef.collection('projects')
    .doc(id).collection('tracks')
    .doc(deletingTrack.track.id).delete()
    .then(() => {
      setDeletingTrack({
        open: false,
        track: {},
      })
      loadProject();
    });
  }

  useEffect(() => {
    loadProject();
  }, []);

  return (
    <div className='page'>
      {
        loading ? <Loading />
        :
        <Card
          sx={{
            padding: '1vh',
            width: '60vw',
            marginLeft: '5vw',
          }}
        >
          <CardHeader 
            title={project.title}
            sx={{
              textAlign: 'center',
            }}
          />
          {
            deletingTrack.open ?
            <QuestionModal
              onAccept={() => deleteTrack()}
              onClose={() => setDeletingTrack({open: false, track: {}})}
              open={deletingTrack.open}
              header={'Are you sure?'}
              description={"This song will be permanently deleted."}
            />
            : 
            null
          }
          {
            tracks.length > 0 ?
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1vh',
                }}
              >
                {tracks.map(track => (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      gap: '1vw',
                      marginLeft: '1vw',
                    }}
                  >
                    <Typography>{track.data.songTitle}</Typography>
                    <Button
                      onClick={() => navigate(`/my-projects/${id}/tracks/${track.id}`)}
                      variant='contained'
                    >
                      Open Track Page
                    </Button>
                    <Button
                      onClick={() => setDeletingTrack({open: true, track: track})}
                      variant='contained'
                      color='error'
                    >
                      Delete
                    </Button>
                  </div>
                ))}
              </div>
            :
              <Typography>Add some tracks to get started.</Typography>
          }
          <Button
            onClick={() => createNewSong()}
            variant='contained'
            color='secondary'
            sx={{
              margin: '1vw',
            }}
          >
            Add Track
          </Button>
        </Card>
      }
    </div>
  )
}

export default CurrentProjectPage