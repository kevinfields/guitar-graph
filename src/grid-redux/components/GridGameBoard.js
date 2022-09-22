import React, {useState, useEffect, useRef} from 'react'
import Loading from '../../components/Loading';
import loadGrid from '../functions/loadGrid';
import movePiece from '../functions/movePiece';
import GridGameColumn from './GridGameColumn';

const ALPHABET = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S'];

const GridGameBoard = (props) => {

  const [loading, setLoading] = useState(true);
  const [grid, setGrid] = useState({});
  const [columns, setColumns] = useState([]);
  const [controller, setController] = useState('');
  const [playerCoord, setPlayerCoord] = useState('');
  const dummy = useRef();

  const parseGrid = (grid) => {

    let tileArr = [];

    for (let i=0; i<props.size; i++) {
      tileArr.push([]);
    };

    for (const coord in grid) {
      const arrIndex = ALPHABET.indexOf(coord.substring(0, 1));
      if (coord.toUpperCase() === coord) {
        tileArr[arrIndex].push(grid[coord]);
      };
    };

    setColumns(tileArr);
  }

  const loadNewGrid = () => {
    let newGrid = loadGrid(props.size, 8);
    setGrid(newGrid);
    parseGrid(newGrid);
    setLoading(false);
  };


  const movePlayer = (dir) => {
    setGrid(movePiece(grid, 'PLAYER', dir));  
  };

  const restartGame = () => {
    setLoading(true);
    loadNewGrid();
  };

  useEffect(() => {
    loadNewGrid();
  }, []);

  useEffect(() => {
    if (grid && grid.AA) {
      parseGrid(grid);
    };
  }, [grid]);

  useEffect(() => {
    if (!isNaN(props.size) && props.size > 0 && props.size <= 18) {
      loadNewGrid(props.size);
    };
  }, [props.size]);

  useEffect(() => {

    if (controller !== '') {
      movePlayer(controller.toUpperCase());
      setController('');
    }
  
  }, [controller]);

  return (
    <div className='grid'>
      {
        loading ? <Loading /> 
        :
        <>
          <div className='grid-flex'>
            {columns.map((column, key) => (
              <GridGameColumn column={column} key={key} />
            ))}
          </div>
          <div className='grid-data-sheet'>
            Obstacle Count: {grid.obstacleCount}
          </div>
          <div
            className='grid-controller-container'
            onClick={() => {dummy.current.focus()}}
          >
            <input
              className='grid-controller'
              value={controller}
              onChange={(e) => setController(e.target.value)}
              ref={dummy}
            />
          </div>
        </>
      }
    </div>
  )
}

export default GridGameBoard