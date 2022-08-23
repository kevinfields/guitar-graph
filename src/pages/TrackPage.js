import { Button, Card, CardHeader, TextField, Typography } from '@mui/material';
import React, {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../components/Loading';

const TrackPage = (props) => {


  const [track, setTrack] = useState({});
  const [newName, setNewName] = useState('');
  const [newNote, setNewNote] = useState('');
  const [editingName, setEditingName] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id, trackId } = useParams();

  const trackRef = props.userRef.collection('projects').doc(id).collection('tracks').doc(trackId);

  const loadProject = async () => {

    let trackData;

    await trackRef.get().then(doc => {
      trackData = doc.data();
    });

    setTrack(trackData);
    setLoading(false);
  };

  useEffect(() => {
    loadProject();
  }, []);

  const saveNote = async () => {
    if (newNote === '') {
      return;
    };

    const newNotes = [...track.notes];
    newNotes.push(newNote);
    const newTrackObject = {...track, notes: newNotes};

    await trackRef.set(newTrackObject).then(() => {
      setNewNote('');
      setTrack(newTrackObject);
    })
  };

  const saveName = async () => {

    const newTrackObject = {...track, songTitle: newName};
    await trackRef.set(newTrackObject).then(() => {
      setNewName('');
      setTrack(newTrackObject);
      setEditingName(false);
    });
  }

  return (
    <div className='page'>
      { loading ? <Loading /> :
      <Card
        sx={{
          padding: '1vh',
        }}
      >
        <Button 
          onClick={() => navigate(`/my-projects/${id}`)}
          variant='contained'
        >
          Go Back
        </Button>
        { editingName ?
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '1vw',
            }}
          >
            <TextField 
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
            <Button
              variant='contained'
              onClick={() => saveName()}
            >
              Save
            </Button>
            <Button
              variant='contained'
              color='error'
              onClick={() => setEditingName(false)}
            >
              Undo
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
            <CardHeader
              title={track.songTitle}
            />
            <Button
              variant='contained'
              onClick={() => setEditingName(true)}
            >
              Change Name
            </Button>
          </div>
        }
        <Typography>Notes: </Typography>
        <div
          style={{
            marginLeft: '2vw',
            display: 'flex',
            flexDirection: 'column',
            gap: '1vh',
          }}
        >
          {track.notes.map(item => (
            <Typography>{item}</Typography>
          ))}
        </div>
        <Typography>Add Note</Typography>
        <TextField
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder={'New Note'}
        />
        <Button
          onClick={() => saveNote()}
        >
          Save Note
        </Button>
      </Card>
      }
    </div>
  )
}

export default TrackPage