import { DeleteOutlineTwoTone } from '@mui/icons-material';
import { Button, Card, CardHeader, TextField, Typography } from '@mui/material';
import React, {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import InfoEditorScreen from '../components/InfoEditorScreen';
import Loading from '../components/Loading';
import QuestionModal from '../components/QuestionModal';
import TrackDataScreen from '../components/TrackDataScreen';
import TrackNote from '../components/TrackNote';

const TrackPage = (props) => {


  const [track, setTrack] = useState({});
  const [newName, setNewName] = useState('');
  const [newNote, setNewNote] = useState('');
  const [editingName, setEditingName] = useState(false);
  const [noteEditor, setNoteEditor] = useState({
    open: false,
    oldText: '',
    newText: '',
    index: -1,
  });
  const [infoEditor, setInfoEditor] = useState({
    open: false,
    field: 'Select a field.',
    value: '',
  });
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    open: false,
    index: -1,
  });
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

    if (newName === '') {
      return;
    }

    const newTrackObject = {...track, songTitle: newName};
    await trackRef.set(newTrackObject).then(() => {
      setNewName('');
      setTrack(newTrackObject);
      setEditingName(false);
    });
  };

  const openNoteEditor = (note) => {

    const index = track.notes.indexOf(note);
    setNoteEditor({
      open: true,
      oldText: note,
      newText: '',
      index: index,
    });

  };

  const openNoteDeleteScreen = (note) => {

    setDeleteConfirmation({
      open: true,
      index: track.notes.indexOf(note),
    });

  };

  const deleteNote = async (index) => {

    let newNoteList = [...track.notes];
    newNoteList.splice(index, 1);
    const newTrack = {...track, notes: newNoteList};
    await trackRef.set(newTrack).then(() => {
      setDeleteConfirmation({
        open: false,
        index: -1,
      });
      setTrack(newTrack);
    })
  };

  const saveNoteEdit = async () => {

    if (noteEditor.newText === '') {
      return;
    }
    let newNoteList = [...track.notes];
    newNoteList.splice(noteEditor.index, 1, noteEditor.newText);
    const newTrack = {...track, notes: newNoteList};
    await trackRef.set(newTrack).then(() => {
      setNoteEditor({
        open: false,
        oldText: '',
        newText: '',
        index: -1,
      });
      setTrack(newTrack);
    });
  };

  const saveNewInfo = async () => {

    let newTrackData = {...track};
    switch (infoEditor.field) {
      case ('bpm'):
        newTrackData.bpm = infoEditor.value;
        break;
      case ('Key'):
        newTrackData.key = infoEditor.value;
        break;
      case ('Length'):
        newTrackData.length = infoEditor.value;
        break;
      case ('Time Signature'):
        newTrackData.timeSignature = infoEditor.value;
        break;
      case ('Bar Count'):
        newTrackData.barCount = infoEditor.value;
        break;
      default:
        break;
    };

    await trackRef.set(newTrackData).then(() => {
      setTrack(newTrackData);
      setInfoEditor({
        open: false,
        field: '',
        value: '',
      })
    });
  };

  const selectInfoEditorField = (val) => {

    if (val !== 'Select a field.' && val !== '') {
      setInfoEditor({...infoEditor, field: val});
    }
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
              marginTop: '2vh',
              marginLeft: '2vw',
              alignItems: 'center',
            }}
          >
            <TextField 
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              sx={{
                marginBottom: '1vh',
              }}
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
              marginLeft: '2vw',
              alignItems: 'center',
            }}
          >
            <CardHeader
              title={track.songTitle}
            />
            <Button
              variant='contained'
              onClick={() => setEditingName(true)}
              sx={{
                width: '9vw',
                height: '4vh',
                fontSize: '9pt',
              }}
            >
              Change Name
            </Button>
          </div>
        }
        {
          deleteConfirmation.open ?
            <QuestionModal
              open={deleteConfirmation.open}
              onClose={() => setDeleteConfirmation({open: false, index: -1})}
              onAccept={() => deleteNote(deleteConfirmation.index)}
              header={'Are you sure?'}
              description={'This note will be deleted permanently.'}
            />
          : 
            null
        }
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '1vw',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              marginLeft: '2vw',
              display: 'flex',
              flexDirection: 'column',
              gap: '1vh',
              height: '40vh',
              overflowY: 'scroll',
              width: '44vw',
            }}
          >
            {track.notes.map(item => (
              !noteEditor.open && noteEditor.oldText !== item ? 
                <TrackNote
                  note={item}
                  onOpenEditor={() => openNoteEditor(item)}
                  onOpenDeleteScreen={() => openNoteDeleteScreen(item)}
                  editing={false}
                />
              :
                <TrackNote
                  onNoteEditChange={(e) => setNoteEditor({...noteEditor, newText: e.target.value})}
                  onSave={() => saveNoteEdit()}
                  onExit={() => setNoteEditor({open: false, newText: '', oldText: '', index: -1})}
                  noteEditor={noteEditor}
                  editing={true}
                  note={item}
                />
              ))}
          </div>
          { infoEditor.open && infoEditor.field === '' ?
            <InfoEditorScreen 
              infoEditor={infoEditor}
              onSelectField={(e) => selectInfoEditorField(e)}
            />
          : infoEditor.open && infoEditor.field !== '' ?
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '0.5vw',
              }}
            >
              <TextField
                value={infoEditor.value}
                onChange={(e) => setInfoEditor({...infoEditor, value: e.target.value})}
              />
              <Button
                variant='contained'
                onClick={() => saveNewInfo()}
                sx={{
                  width: '6vw',
                  height: '6vh',
                }}
              >
                Save Info
              </Button>
              <Button
                variant='contained'
                color='error'
                onClick={() => setInfoEditor({open: false, field: '', value: ''})}
                sx={{
                  width: '6vw',
                  height: '6vh',
                }}
              >
                Exit
              </Button>
            </div>
          :
            <TrackDataScreen 
              info={track}
              openInfoEditSelector={(e) => setInfoEditor({
                ...infoEditor,
                open: true,
              })}
            />
          }
          </div>
          <div className='new-note-tab'>
            <Typography
              sx={{
                marginLeft: '1vw',
              }}
            >
              Add Note:
            </Typography>
            <TextField
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder={'Type a new note here.'}
              multiline
              rows={5}
              sx={{
                width: '40vw',
              }}
            />
            <Button
              onClick={() => saveNote()}
              variant='contained'
              sx={{
                marginRight: '3vw',
              }}
            >
              Save Note
            </Button>
          </div>
      </Card>
      }
    </div>
  )
}

export default TrackPage