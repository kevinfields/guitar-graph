import { NextPlanRounded } from '@mui/icons-material';
import { Button, Card, CardHeader, TextField, Typography } from '@mui/material';
import React, {useState, useEffect, useRef} from 'react';
import Loading from '../../components/Loading';
import changeGrid from '../functions/changeGrid';
import loadGrid from '../functions/loadGrid';
import parseGrid from '../functions/parseGrid';
import GridGameRow from './GridGameRow';

const GridGameBoard = (props) => {

  const [loading, setLoading] = useState(true);
  const [running, setRunning] = useState(false);
  const [grid, setGrid] = useState({});
  const [rows, setRows] = useState([]);
  const [obstacleCount, setObstacleCount] = useState(0);
  const [removedObstacleIds, setRemovedObstacleIds] = useState([]);
  const [controlInput, setControlInput] = useState('');
  const [obstacleToMove, setObstacleToMove] = useState(0);
  const [timeoutId, setTimeoutId] = useState('');
  const [round, setRound] = useState(0);
  const dummy = useRef();

  const loadGridObject = () => {
    let grid = loadGrid(12, 8);
    setObstacleCount(grid.obstacles);
    setGrid(grid);
    parseGridObj(grid);
    setRound(0);
    setRemovedObstacleIds([]);
  };

  const parseGridObj = (gridObj) => {
    let rowCatcher = parseGrid(gridObj);
    setRows(rowCatcher);
    setTimeout(() => {
      setLoading(false);
    }, [2000]);
  };

  const generalClickCommand = () => {
    dummy.current.focus();
  }

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

  const nextRound = () => {

    console.log('obstacleCount: ' + obstacleCount);

    const directions = ['left', 'right', 'down', 'down'];
    let modifierGrid = {...grid};
    let counter = 1;
    let removedObstacleList = [];

    while (counter <= (obstacleCount)) {
      
      if (removedObstacleIds.includes(counter)) {
        continue;
      }

      modifierGrid = changeGrid(modifierGrid, directions[Math.floor(Math.random() * 4)], `OBS${counter}`, 12);
      if (modifierGrid.removedObstacles) {
        removedObstacleList.concat(modifierGrid.removedObstacles);
      }
      counter++;
    };

    setGrid(modifierGrid);
    parseGridObj(modifierGrid);
    setRemovedObstacleIds(removedObstacleIds.concat(removedObstacleList));
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

  }, [controlInput]);

  useEffect(() => {

    if (grid && grid.empty) {
      clearTimeout(timeoutId);
      loadGridObject();
    };

  }, [grid]);

  useEffect(() => {

    setTimeoutId(setTimeout(() => {
      nextRound();
      setRound(round + 1);
    }, [1000]));
  }, [round]);

  useEffect(() => {


  }, [running])

  return (
    <div>
      {
        loading ? <Loading /> 
        :
        <div className='main-game'>
          <div className='grid-game-grid' onClick={() => {dummy.current.focus()}}>
            {rows.map(row => (
              <GridGameRow row={row} key={Math.floor(Math.random() * 150000)}/>
            ))} 
          </div>
          {/* <div className='game-scoreboard'>
            <h3>Scoreboard'</h3>
            <p>Round: {round}</p>
          </div> */}
          <div className='grid-game-controller' onClick={() => {dummy.current.focus()}}>
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
              onClick={() => loadGridObject()}
              className='game-button'
            >
              Reset
            </Button>
          </div>
        </div>
      }
    </div>
  )
}

export default GridGameBoard