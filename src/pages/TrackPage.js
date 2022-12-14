import { DeleteOutlineTwoTone } from '@mui/icons-material';
import { Button, Card, CardHeader, Switch, TextField, Typography } from '@mui/material';
import React, {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import InfoEditorScreen from '../components/InfoEditorScreen';
import Loading from '../components/Loading';
import QuestionModal from '../components/QuestionModal';
import TrackDataScreen from '../components/TrackDataScreen';
import TrackLyric from '../components/TrackLyric';
import TrackNote from '../components/TrackNote';

const TrackPage = (props) => {


  const [track, setTrack] = useState({});
  const [newName, setNewName] = useState('');
  const [newNote, setNewNote] = useState('');
  const [newLyric, setNewLyric] = useState('');
  const [editingName, setEditingName] = useState(false);
  const [viewingNotes, setViewingNotes] = useState(true);
  const [noteEditor, setNoteEditor] = useState({
    open: false,
    oldText: '',
    newText: '',
    index: -1,
  });
  const [lyricEditor, setLyricEditor] = useState({
    open: false,
    oldText: '',
    newText: '',
    index: -1,
  });
  const [infoEditor, setInfoEditor] = useState({
    open: false,
    field: '',
    value: '',
  });
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    open: false,
    index: -1,
    type: 'none',
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

    let newNotes = [...track.notes];
    newNotes.push(newNote);
    const newTrackObject = {...track, notes: newNotes};

    await trackRef.set(newTrackObject).then(() => {
      setNewNote('');
      setTrack(newTrackObject);
    })
  };

  const saveLyric = async () => {
    if (newLyric === '') {
      return;
    };

    let newLyrics = [...track.lyrics];
    newLyrics.push(newLyric);
    const newTrackObject = {...track, lyrics: newLyrics};
    await trackRef.set(newTrackObject).then(() => {
      setNewLyric('');
      setTrack(newTrackObject);
    });
  }

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
      newText: note,
      index: index,
    });
  };

  const openLyricEditor = (lyric) => {
    const index = track.lyrics.indexOf(lyric);
    setLyricEditor({
      open: true,
      oldText: lyric,
      newText: lyric,
      index: index,
    });
  }

  const openNoteDeleteScreen = (note) => {

    setDeleteConfirmation({
      open: true,
      index: track.notes.indexOf(note),
      type: 'note',
    });

  };

  const openLyricDeleteScreen = (lyric) => {

    setDeleteConfirmation({
      open: true,
      index: track.lyrics.indexOf(lyric),
      type: 'lyric',
    });
  }

  const deleteNote = async (index) => {

    let newNoteList = [...track.notes];
    newNoteList.splice(index, 1);
    const newTrack = {...track, notes: newNoteList};
    await trackRef.set(newTrack).then(() => {
      setDeleteConfirmation({
        open: false,
        index: -1,
        type: 'none'
      });
      setTrack(newTrack);
    })
  };

  const deleteLyric = async (index) => {

    let newLyrics = [...track.lyrics];
    newLyrics.splice(index, 1);
    const newTrack = {...track, lyrics: newLyrics};
    await trackRef.set(newTrack).then(() => {
      setDeleteConfirmation({
        open: false,
        index: -1,
        type: 'none'
      });
      setTrack(newTrack);
    })
  }

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

  const saveLyricEdit = async () => {

    if (lyricEditor.newText === '') {
      return;
    };
    
    let newLyrics = [...track.lyrics];
    newLyrics.splice(lyricEditor.index, 1, lyricEditor.newText);
    const newTrack = {...track, lyrics: newLyrics};
    await trackRef.set(newTrack).then(() => {
      setLyricEditor({
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
  };

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
              marginTop: '2vh',
              marginLeft: '2vw',
              alignItems: 'center',
              width: '60vw',
              height: '6vh',
              
            }}
          >
            <CardHeader
              title={track.songTitle}
              sx={{
                display: 'inline-block',
              }}
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
            <Typography>View Lyrics</Typography>
            <Switch
              checked={viewingNotes}
              onChange={() => setViewingNotes(!viewingNotes)}
            />
            <Typography>View Notes</Typography>
          </div>
        {
          deleteConfirmation.open ?
            <QuestionModal
              open={deleteConfirmation.open}
              onClose={() => setDeleteConfirmation({open: false, index: -1})}
              onAccept={() => 
                deleteConfirmation.type === 'note' ? 
                  deleteNote(deleteConfirmation.index)
                :
                  deleteLyric(deleteConfirmation.index)
              }
              header={'Are you sure?'}
              description={`This ${deleteConfirmation.type} will be deleted permanently.`}
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
            { viewingNotes ?
                (track.notes.map(item => (
                  <>
                  {noteEditor.oldText !== item ? 
                    <TrackNote
                      note={item}
                      onOpenEditor={() => openNoteEditor(item)}
                      onOpenDeleteScreen={() => openNoteDeleteScreen(item)}
                    />
                  :
                    <TrackNote
                      onNoteEditorChange={(newNote) => setNoteEditor({...noteEditor, newText: newNote})}
                      onSave={() => saveNoteEdit()}
                      onExit={() => setNoteEditor({open: false, newText: '', oldText: '', index: -1})}
                      noteEditor={noteEditor}
                      editing={true}
                      note={item}
                    />
                  }
                  </>
                )))
              :
                (track.lyrics.map(lyric => (
                  <>
                    {lyricEditor.oldText !== lyric ?
                      <TrackLyric
                        lyric={lyric}
                        onOpenEditor={() => openLyricEditor(lyric)}
                        onOpenDeleteScreen={() => openLyricDeleteScreen(lyric)}
                      />
                    :
                      (
                      <TrackLyric
                        onLyricEditChange={(newLyric) => setLyricEditor({...lyricEditor, newText: newLyric})}
                        onSave={() => saveLyricEdit()}
                        onExit={() => setLyricEditor({open: false, newText: '', oldText: '', index: -1})}
                        lyricEditor={lyricEditor}
                        editing={true}
                        lyric={lyric}
                      />)
                    }
                  </>
                  )))
              }
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
              Add {viewingNotes ? 'Note' : 'Lyric'}:
            </Typography>
            <TextField
              value={viewingNotes ? newNote : newLyric}
              onChange={(e) => viewingNotes ? setNewNote(e.target.value) : setNewLyric(e.target.value)}
              placeholder={`Type a new ${viewingNotes ? 'note' : 'lyric'} here.${viewingNotes ? '' : ' (Type // to indicate a new line.)'}`}
              multiline
              rows={5}
              sx={{
                width: '40vw',
              }}
            />
            <Button
              onClick={() => viewingNotes ? saveNote() : saveLyric()}
              variant='contained'
              sx={{
                marginRight: '3vw',
              }}
            >
              Save {viewingNotes ? 'Note' : 'Lyric'}
            </Button>
          </div>
      </Card>
      }
    </div>
  )
}

export default TrackPage