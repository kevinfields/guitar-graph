import { TextField } from '@mui/material';
import React, {useState, useEffect, useRef} from 'react';
import Loading from '../../components/Loading';
import changeGrid from '../functions/changeGrid';
import loadGrid from '../functions/loadGrid';
import parseGrid from '../functions/parseGrid';
import GridGameRow from './GridGameRow';
import GridGameTile from './GridGameTile';

const GridGameBoard = (props) => {

  const [loading, setLoading] = useState(true);
  const [grid, setGrid] = useState({});
  const [rows, setRows] = useState([]);
  const [controlInput, setControlInput] = useState('');
  const dummy = useRef();

  const loadGridObject = () => {
    let grid = loadGrid(12);
    setGrid(grid);
    parseGridObj(grid);
  };

  const parseGridObj = (gridObj) => {
    let rowCatcher = parseGrid(gridObj);
    setRows(rowCatcher);
    setTimeout(() => {
      setLoading(false);
    }, [2000]);
  };

  const movePlayer = (direction) => {

    switch (direction) {
      case 'w':
        let newGrid = changeGrid(grid, 'up', 'PLAYER');
        setGrid(newGrid);
        parseGridObj(newGrid);
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    loadGridObject();
  }, []);

  useEffect(() => {

    if (!loading) {
      dummy.current.focus();
    };

  }, [loading]);

  useEffect(() => {

    if (controlInput !== '') {
      movePlayer(controlInput.toLowerCase());
      setControlInput('');
    };

  }, [controlInput])

  return (
    <div>
      {
        loading ? <Loading /> 
        :
        <div className='main-game'>
          <div
            className='grid-game-grid'
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1vw',
            }}
          >
            {rows.map(row => (
              <GridGameRow row={row} key={Math.floor(Math.random() * 100000)}/>
            ))} 
          </div>
          <div className='grid-game-controller'>
            <input 
              value={controlInput}
              onChange={(e) => setControlInput(e.target.value)}
              ref={dummy}
              style={{
                width: '5vw',
                color: 'white',
                caretColor: 'transparent',
                border: '1px solid white',
              }}
            />
          </div>
        </div>
      }
    </div>
  )
}

export default GridGameBoard