import { QuestionAnswer } from '@mui/icons-material';
import { Button, Card, CardHeader, Grid, TextField, Typography } from '@mui/material';
import React, {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AssignmentScreen from '../components/AssignmentScreen';
import Loading from '../components/Loading';
import ProjectNoteCard from '../components/ProjectNoteCard';
import QuestionModal from '../components/QuestionModal';
import TrackLyricDivided from '../components/TrackLyricDivided';
import makeIdFromTitle from '../functions/makeIdFromTitle';
import ADJUST_TRACK_ORDER from '../reducers/ADJUST_TRACK_ORDER';
import ASSIGN_TO_TRACK from '../reducers/ASSIGN_TO_TRACK';
import CREATE_NEW_SONG from '../reducers/CREATE_NEW_SONG';
import { DragAndDropOrder } from 'light-blue-drag-and-drop';

const CurrentProjectPage = (props) => {


  const [project, setProject] = useState({});
  const [tracks, setTracks] = useState([]);
  const [notes, setNotes] = useState([]);
  const [lyrics, setLyrics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingTrack, setDeletingTrack] = useState({open: false, track: {}});
  const [editingName, setEditingName] = useState({open: false, newName: ''});
  const [namingNewSong, setNamingNewSong] = useState({open: false, newName: ''});
  const [newNoteScreen, setNewNoteScreen] = useState({open: false, newNote: ''});
  const [newLyricScreen, setNewLyricScreen] = useState({open: false, newLyric: ''});
  const [assignmentScreen, setAssignmentScreen] = useState({open: false, index: -1, type: ''});
  const [newTrackOrder, setNewTrackOrder] = useState(['']);
  const [viewing, setViewing] = useState('tracks');
  const navigate = useNavigate();
  const { id } = useParams();

  const loadProject = async () => {

    let data;
    let tracklist = [];
    let lyrics = [];
    let notes = [];
    await props.userRef.collection('projects').doc(id).get().then(doc => {
      data = doc.data();
      lyrics = doc.data().lyrics ? doc.data().lyrics : [];
      notes = doc.data().notes ? doc.data().notes : [];
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
    setLyrics(lyrics);
    setNotes(notes);
    tracklist = tracklist.sort((a, b) => a.data.index - b.data.index);
    setTracks(tracklist);
    setLoading(false);
  }

  const createNewSong = async () => {
    await CREATE_NEW_SONG(props.userRef.collection('projects').doc(id), namingNewSong.newName).then(() => {
      setNamingNewSong({open: false, newName: ''});
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
  };

  const saveNewNote = async () => {

    let projectData;
    await props.userRef.collection('projects').doc(id).get().then(doc => {
      projectData = doc.data();
    });

    projectData = {
      ...projectData,
      notes: projectData.notes ? [...projectData.notes, newNoteScreen.newNote] : [newNoteScreen.newNote],
    }
    await props.userRef.collection('projects').doc(id).set(projectData).then(() => {
      setProject(projectData);
      setNewNoteScreen({open: false, newNote: ''});
      setNotes(projectData.notes);
    });
  };

  const saveNewLyric = async () => {

    let projectData;
    await props.userRef.collection('projects').doc(id).get().then(doc => {
      projectData = doc.data();
    });

    projectData = {
      ...projectData,
      lyrics: projectData.lyrics ? projectData.lyrics.concat(newLyricScreen.newLyric) : [newLyricScreen.newLyric], 
    };

    await props.userRef.collection('projects').doc(id).set(projectData).then(() => {
      setProject(projectData);
      setNewLyricScreen({open: false, newLyric: ''});
      setLyrics(projectData.lyrics);
    });
  };

  const replaceNote = async (newNote, oldNote) => {

    const index = notes.indexOf(oldNote);
    let catcher = [...notes];
    catcher.splice(index, 1, oldNote);
    setNotes(catcher);

    await props.userRef.collection('projects').doc(id).set({
      ...project,
      notes: catcher,
    }).then(() => {
      setProject({
        ...project,
        notes: catcher,
      });
    });
  };

  const replaceLyric = async (newLyric, oldLyric) => {
    const index = notes.indexOf(oldLyric);
    let catcher = [...lyrics];
    catcher.splice(index, 1, oldLyric);
    setLyrics(catcher);

    await props.userRef.collection('projects').doc(id).set({
      ...project,
      lyrics: catcher,
    }).then(() => {
      setProject({
        ...project,
        lyrics: catcher,
      });
    });
  }

  const deleteNote = async (note) => {

    const index = notes.indexOf(note);
    let catcher = [...notes];
    catcher.splice(index, 1);
    setNotes(catcher);

    await props.userRef.collection('projects').doc(id).set({
      ...project,
      notes: catcher,
    }).then(() => {
      setProject({
        ...project,
        notes: catcher,
      });
    });
  };

  const deleteLyric = async (lyric) => {

    const index = lyrics.indexOf(lyric);
    let catcher = [...notes];
    catcher.splice(index, 1);
    setLyrics(catcher);

    await props.userRef.collection('projects').doc(id).set({
      ...project,
      lyrics: catcher,
    }).then(() => {
      setProject({
        ...project,
        lyrics: catcher,
      });
    });
  };

  const assignToTrack = async (trackId) => {
    await ASSIGN_TO_TRACK(props.userRef.collection('projects').doc(id), assignmentScreen.type, assignmentScreen.index, trackId);
    loadProject();
  };

  const adjustOrder = async () => {
    await ADJUST_TRACK_ORDER(tracks, props.userRef.collection('projects').doc(id)).then(() => {
      loadProject();
    });
  };

  const pickUpTrack = (track) => {

    console.log('track index: ' + track.data.index);
  };

  const saveAdjustedOrder = async () => {
    await ADJUST_TRACK_ORDER(tracks, props.userRef.collection('projects').doc(id)).then(() => {
      loadProject();
    });
  };

  const moveTracks = async (newOrder) => {
    await ADJUST_TRACK_ORDER(newOrder, props.userRef.collection('projects').doc(id)).then(() => {
      setTracks(newOrder);
    });
  }

  useEffect(() => {
    loadProject();
  }, []);

  useEffect(() => {

    if (newLyricScreen.open) {
      if (namingNewSong.open) {
        setNamingNewSong({...namingNewSong, open: false});
      };
      if (newNoteScreen.open) {
        setNewNoteScreen({...newNoteScreen, open: false});
      };
    };

  }, [newLyricScreen]);

  useEffect(() => {

    if (newNoteScreen.open) {
      if (namingNewSong.open) {
        setNamingNewSong({...namingNewSong, open: false});
      };
      if (newLyricScreen.open) {
        setNewLyricScreen({...newLyricScreen, open: false});
      };
    };

  }, [newNoteScreen]);

  useEffect(() => {

    if (namingNewSong.open) {
      if (newNoteScreen.open) {
        setNewNoteScreen({...newNoteScreen, open: false});
      };
      if (newLyricScreen.open) {
        setNewLyricScreen({...newLyricScreen, open: false});
      };
    };

  }, [namingNewSong]);

  useEffect(() => {

    if (viewing === 'tracks') {
      if (newNoteScreen.open) {
        setNewNoteScreen({...newNoteScreen, open: false});
      };
      if (newLyricScreen.open) {
        setNewLyricScreen({...newLyricScreen, open: false});
      };
    };

    if (viewing === 'notes') {
      if (namingNewSong.open) {
        setNamingNewSong({...namingNewSong, open: false});
      };
      if (newLyricScreen.open) {
        setNewLyricScreen({...newLyricScreen, open: false});
      };
    };

    if (viewing === 'lyrics') {
      if (namingNewSong.open) {
        setNamingNewSong({...namingNewSong, open: false});
      };
      if (newNoteScreen.open) {
        setNewNoteScreen({...newNoteScreen, open: false});
      };
    }

  }, [viewing]);



  const makeArray = (tracks) => {

    let arr = [];
    tracks.forEach(item => {
      arr.push(<TrackObject track={item} />);
    });
    return arr;
  };

  const parseArray = (tracks) => {

    let arr = [];
    tracks.forEach(item => {
      arr.push(item.props.track);
    });
    return arr;
  }

  const TrackObject = (props) => {

    return (
      <>
        <Card
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: '1vw',
            marginLeft: '1vw',
            padding: '1vh',
            minHeight: '7vh',
            backgroundColor: 'lightblue',
          }}
        >
          <Typography>{props.track.data.songTitle}</Typography>
          <Button
            onClick={() => navigate(`/my-projects/${id}/tracks/${props.track.id}`)}
            variant='contained'
          >
            Open Track Page
          </Button>
          <Button
            onClick={() => setDeletingTrack({open: true, track: props.track})}
            variant='contained'
            color='error'
          >
            Delete
          </Button>
        </Card>
      </>
    )
  };

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
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginBottom: '2vh',
              gap: '1vw',
            }}
          >
            <Button
              variant='contained'
              onClick={() => setViewing('tracks')}
              color='primary'
            >
              View Tracks
            </Button>
            <Button
              variant='contained'
              onClick={() => setViewing('notes')}
              color='success'
            >
              View Notes
            </Button>
            <Button
              variant='contained'
              onClick={() => setViewing('lyrics')}
              color='info'
            >
              View Lyrics
            </Button>
          </div>
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
            viewing === 'tracks' ?
              tracks.length > 0 ?
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1vh',
                    overflowY: 'scroll',
                    maxHeight: '45vh',
                    border: '1px solid blue',
                    borderRadius: '5px',
                    padding: '1vh',
                  }}
                >
                  <DragAndDropOrder
                    order={makeArray(tracks)}
                    onAdjustOrder={(newOrder) => setTracks(parseArray(newOrder))}
                    insert={false}
                    containerClassName=''
                  />
                </div>
              :
                <Typography>Add some tracks to get started.</Typography>
            :
              viewing === 'notes' ?
                <div
                  style={{
                    maxHeight: '25vh',
                    overflowY: 'scroll',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1vh',
                    padding: '2vh',
                  }}
                >
                  {notes.map(note => (
                    <Card
                      sx={{
                        border: '1px solid blue',
                        borderRadius: '5px',
                        minHeight: '20vh',
                        overflowY: 'scroll',
                      }}
                    >
                      <ProjectNoteCard
                        note={note}
                        saveNote={(newNote) => replaceNote(note, newNote)}
                        deleteNote={() => deleteNote(note)}
                        onOpenAssignmentScreen={() => setAssignmentScreen({...assignmentScreen, open: true, type: 'note', index: notes.indexOf(note)})}
                      />
                      {assignmentScreen.open && assignmentScreen.type === 'note' && assignmentScreen.index === notes.indexOf(note) ?
                        <AssignmentScreen
                          tracklist={tracks}
                          chooseTrack={(track) => assignToTrack(track.id)}
                          onClose={() => setAssignmentScreen({...assignmentScreen, open: false})}
                        />
                        : null
                      }
                    </Card>
                  ))}
                </div>
            : viewing === 'lyrics' ?
                <div
                  style={{
                    maxHeight: '25vh',
                    overflowY: 'scroll',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1vh',
                    padding: '2vh',
                  }}
                >
                  {lyrics.map(lyric => (
                    <Card
                      sx={{
                        border: '1px solid blue',
                        borderRadius: '5px',
                        minHeight: '20vh',
                        overflowY: 'scroll',
                      }}
                    >
                      <TrackLyricDivided 
                        verse={lyric}
                        saveLyric={(newLyric) => replaceLyric(lyric, newLyric)}
                        deleteLyric={() => deleteLyric(lyric)}
                        onOpenAssignmentScreen={() => setAssignmentScreen({...assignmentScreen, open: true, type: 'lyric', index: lyrics.indexOf(lyric)})}
                      />
                      {assignmentScreen.open && assignmentScreen.type === 'lyric' && assignmentScreen.index === lyrics.indexOf(lyric) ?
                        <AssignmentScreen
                          tracklist={tracks}
                          chooseTrack={(track) => assignToTrack(track.id)}
                          onClose={() => setAssignmentScreen({...assignmentScreen, open: false})}
                        />
                        : null
                      }
                    </Card>
                  ))}
                </div>
            : null
          }
            {
              namingNewSong.open ?
                <Card
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '1vw',
                    marginLeft: '1vw',
                    padding: '1vh',
                  }}
                >
                  <TextField
                    value={namingNewSong.newName}
                    onChange={(e) => setNamingNewSong({open: true, newName: e.target.value})}
                    placeholder={'New Name'}
                  />
                  <Button
                    variant='contained'
                    onClick={() => createNewSong()}
                  >
                    Create
                  </Button>
                  <Button
                    variant='contained'
                    color='error'
                    onClick={() => setNamingNewSong({open: false, newName: ''})}
                  >
                    Exit
                  </Button>
                </Card>
              : null
            }
            { viewing === 'tracks' ?
              <div
                style={{
                  margin: '1vh',
                }}
              >
                <Button
                  onClick={() => setNamingNewSong({open: true, newName: ''})}
                  variant='contained'
                  color='secondary'
                  sx={{
                    margin: '1vw',
                  }}
                >
                  Add Track
                </Button>
                <TextField
                  value={newTrackOrder}
                  onChange={(e) => setNewTrackOrder(e.target.value)}
                />
                <Button 
                  onClick={() => adjustOrder()}
                  variant='contained'
                  color='success'
                  sx={{
                    margin: '1vw',
                  }}
                >
                  Adjust Order
                </Button>
              </div>
              : viewing === 'notes' ?
              <Button
                onClick={() => setNewNoteScreen({open: true, newNote: ''})}
                variant='contained'
                color='secondary'
                sx={{
                  margin: '1vw',
                }}
              >
                Add Project Note
              </Button>
              : viewing === 'lyrics' ?
              <Button
                onClick={() => setNewLyricScreen({open: true, newLyric: ''})}
                variant='contained'
                color='secondary'
                sx={{
                  margin: '1vw',
                }}
              >
                Add Project Lyric
              </Button>
              : null
            }
        </Card>
      }
      {
        newNoteScreen.open ?
          <Grid
            container
            columns={12}
            columnSpacing={1}
            rowSpacing={1}
            sx={{
              marginLeft: '5vw',
              marginTop: '1vh',
              width: '61vw',
            }}
          >
            <Grid 
              item 
              lg={12}
            >
              <TextField
                value={newNoteScreen.newNote}
                onChange={(e) => setNewNoteScreen({...newNoteScreen, newNote: e.target.value})}
                placeholder={'Type a new note.'}
                multiline
                rows={5}
                sx={{
                  width: '100%',
                }}
              />
            </Grid>
            <Grid 
              item 
              lg={12}
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
              }}
            >
              <Button
                onClick={() => saveNewNote()}
                variant='contained'
                sx={{
                  width: '10vw',
                }}
              >
                Save Note
              </Button>
              <Button
                onClick={() => setNewNoteScreen({...newNoteScreen, open: false})}
                variant='contained'
                color='error'
                sx={{
                  width: '10vw',
                }}
              >
                Exit
              </Button>
            </Grid>
          </Grid>
        : 
          null
      }
      {
        newLyricScreen.open ?
        <Grid
            container
            columns={12}
            columnSpacing={0}
            rowSpacing={1}
            sx={{
              marginLeft: '5vw',
              marginTop: '2vh',
              width: '61vw',
            }}
          >
            <Grid 
              item 
              lg={12}
            >
              <TextField
                value={newLyricScreen.newLyric}
                onChange={(e) => setNewLyricScreen({...newLyricScreen, newLyric: e.target.value})}
                placeholder={'Type a new lyric. (Use // to start a new line.)'}
                multiline
                rows={5}
                sx={{
                  width: '100%',
                }}
              />
            </Grid>
            <Grid 
              item 
              lg={12}
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
              }}
            >
              <Button
                onClick={() => saveNewLyric()}
                variant='contained'
                sx={{
                  width: '10vw',
                }}
              >
                Save Lyric
              </Button>
              <Button
                onClick={() => setNewLyricScreen({...newLyricScreen, open: false})}
                variant='contained'
                color='error'
                sx={{
                  width: '10vw',
                }}
              >
                Exit
              </Button>
            </Grid>
          </Grid>
        : 
          null
      }
    </div>
  )
}

export default CurrentProjectPage