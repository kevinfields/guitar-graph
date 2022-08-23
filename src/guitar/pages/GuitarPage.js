import { Button, Card, CardHeader, Grid, MenuItem, TextField, Typography } from '@mui/material'
import React, {useState, useEffect} from 'react'
import GuitarNeck from '../components/GuitarNeck';
import getScaleNotes from '../../functions/getScaleNotes';


const keys = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];
const modes = ['Major / Ionian', 'Dorian', 'Phrygian', 'Lydian', 'Mixolydian', 'Minor / Aeolian', 'Locrian'];

const GuitarPage = (props) => {

  const [mode, setMode] = useState('Major / Ionian');
  const [selectedKey, setSelectedKey] = useState('A');
  const [scale, setScale] = useState('A Major / Ionian');
  const [tuning, setTuning] = useState([]);

  useEffect(() => {

    setScale(`${selectedKey} ${mode}`);

  }, [mode, selectedKey]);

  return (
    <div className='page'>
      <Card
        sx={{
          position: 'fixed',
          left: '11vw',
          top: '10vh',
          width: '78vw',
          height: '89vh',
        }}
      >
        <CardHeader 
          title="Click a key to see it on the guitar neck." 
          titleTypographyProps={{
            fontSize: '18pt',
            margin: '0px',
          }}
        />
        <Grid
          container
          sx={{
            position: 'fixed',
            left: '17.5vw',
            width: '65vw',
            top: '18.5vh',
            height: '10vh',
          }}
          columns={24}
          rowSpacing={2}
        >
          { keys.map(key => (
          <Grid
            item
            lg={2}
          >
            <Button
              variant={selectedKey === key ? 'contained' : 'outlined'}
              onClick={() => setSelectedKey(key)}
              color='secondary'
            >
              {key}
            </Button>
          </Grid>
          ))}
          <Grid
            item
            lg={8}
          >
            <TextField
              select
              value={mode}
              onChange={(e) => setMode(e.target.value)}
            >
              {modes.map(mode => (
                <MenuItem
                  value={mode}
                >
                  {mode}
                </MenuItem>
              ))}
              
            </TextField>
          </Grid>
        </Grid>
        <Grid
          container
          sx={{
            position: 'fixed',
            top: '35vh',
            width: '90vw',
            left: '5vw',
          }}
          columns={12}
        >
          <Grid
            item
            lg={5}
            sx={{
              marginBottom: '2vh',
            }}
          >
            <Typography
              sx={{
                textAlign: 'center',
              }}
            >
              Selected Scale: {scale}
            </Typography>
          </Grid>
          { tuning.length > 0 ?
          <Grid
            item
            lg={5}
            sx={{

            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '1vw',
              }}
            >
              Tuning:
              {tuning.map(string => (
                <Typography>{string.note}</Typography>
              ))}
            </div>
          </Grid>
          : null}
          <Grid
            item
            lg={12}
          >
            <GuitarNeck 
              scaleNotes={getScaleNotes(selectedKey, mode)}
              adjustTuning={(tuning) => setTuning(tuning)}
              tuning={tuning}
            />
          </Grid>
        </Grid>
      </Card>
    </div>
  )
}

export default GuitarPage