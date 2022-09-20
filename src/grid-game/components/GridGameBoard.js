import { Button, TextField } from '@mui/material';
import React, {useState, useEffect, useRef} from 'react';
import Loading from '../../components/Loading';
import changeGrid from '../functions/changeGrid';
import loadGrid from '../functions/loadGrid';
import parseGrid from '../functions/parseGrid';
import GridGameRow from './GridGameRow';

const GridGameBoard = (props) => {

  const [loading, setLoading] = useState(true);
  const [grid, setGrid] = useState({});
  const [rows, setRows] = useState([]);
  const [controlInput, setControlInput] = useState('');
  const [obstacleToMove, setObstacleToMove] = useState(0);
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

    let newGrid;
    switch (direction) {
      case 'w':
        newGrid = changeGrid(grid, 'up', 'PLAYER', 12);
        setGrid(newGrid);
        parseGridObj(newGrid);
        break;
      case 's':
        newGrid = changeGrid(grid, 'down', 'PLAYER', 12);
        setGrid(newGrid);
        parseGridObj(newGrid);
        break;
      case 'a':
        newGrid = changeGrid(grid, 'left', 'PLAYER', 12);
        setGrid(newGrid);
        parseGridObj(newGrid);
        break;
      case 'd':
        newGrid = changeGrid(grid, 'right', 'PLAYER', 12);
        setGrid(newGrid);
        parseGridObj(newGrid);
        break;
      default:
        break;
    };
  };

  const moveObstacle = () => {
    let newGrid;
    newGrid = changeGrid(grid, 'right', `OBS${obstacleToMove}`, 12);
    setGrid(newGrid);
    parseGridObj(newGrid);
  };

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
          <div className='grid-game-grid'>
            {rows.map(row => (
              <GridGameRow row={row} key={Math.floor(Math.random() * 1000000)}/>
            ))} 
          </div>
          <div className='grid-game-controller'>
            <input 
              value={controlInput}
              onChange={(e) => setControlInput(e.target.value)}
              ref={dummy}
              className='grid-game-control-input'
            />
            <input
              type='number'
              value={obstacleToMove}
              onChange={(e) => setObstacleToMove(e.target.value)}
            />
            <Button
              variant='contained'
              color='primary'
              onClick={() => moveObstacle()}
            >
              Move selected obstacle to the right.
            </Button>
          </div>
        </div>
      }
    </div>
  )
}

export default GridGameBoard