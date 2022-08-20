import { Button, Card, CardHeader, Grid, MenuItem, TextField, Typography } from '@mui/material'
import React, {useState, useEffect} from 'react'


const keys = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];
const modes = ['Major / Ionian', 'Dorian', 'Phrygian', 'Lydian', 'Mixolydian', 'Minor / Aeolian', 'Locrian'];

const HomePage = () => {

  const [search, setSearch] = useState('');
  const [mode, setMode] = useState('Major / Ionian');
  const [selectedKey, setSelectedKey] = useState('A');
  const [scale, setScale] = useState('A Major / Ionian');
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    setScale(`${selectedKey} ${mode}`);

  }, [mode, selectedKey])

  return (
    <div className='page'>
      <Card
        sx={{
          position: 'fixed',
          left: '15vw',
          top: '15vh',
          width: '70vw',
          height: '70vh',
        }}
      >
        <CardHeader title="Click a key to see it on the guitar neck." />
        <Grid
          container
          sx={{
            position: 'fixed',
            left: '17.5vw',
            width: '65vw',
            top: '22.5vh',
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
            top: '50vh',
            height: '25vh',
            width: '50vw',
            left: '25vw',
            border: '1px solid magenta',
          }}
          columns={12}
        >
          <Grid
            item
            lg={12}
          >
            <Typography>Selected Scale: {scale}</Typography>
          </Grid>
        </Grid>
        
      </Card>
    </div>
  )
}

export default HomePage