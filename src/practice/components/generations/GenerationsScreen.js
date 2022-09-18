import React, {useState, useEffect, useRef} from 'react'
import Loading from '../../../components/Loading';
import getDividedResources from '../../functions/getDividedResources';
import checkCollision from '../../functions/checkCollision';
import Generation from './Generation'
import Resource from './Resource';
import checkWithin from '../../functions/checkWithin';

const GenerationsScreen = () => {

  const [position, setPosition] = useState({
    x: 50,
    y: 50,
  });
  const [resources, setResources] = useState([]);
  const [neighbors, setNeighbors] = useState([]);
  const [controlInput, setControlInput] = useState('');
  const [loading, setLoading] = useState(true);
  const dummy = useRef();


  const loadGameObjects = () => {
    setResources(getDividedResources('food', 1000, 5));
  };

  useEffect(() => {

    if (controlInput !== '') {
      switch (controlInput.toLowerCase()) {
        case 'w':
          setPosition({...position, y: position.y - 1});
          break;
        case 'd':
          setPosition({...position, x: position.x + 1});
          break;
        case 's':
          setPosition({...position, y: position.y + 1});
          break;
        case 'a':
          setPosition({...position, x: position.x - 1});
          break;
        default:
          break;
      };
    }
    setControlInput('');
  }, [controlInput]);

  useEffect(() => {


    if (resources.length > 0) {
      if (checkWithin(position, {x: resources[0].x, y: resources[0].y})) {
        alert('You crashed');
      };
    };
    
    if (position.x > 80) {
      setPosition({
        ...position,
        x: 80,
      });
    };

    if (position.x < 15) {
      setPosition({
        ...position,
        x: 15,
      });
    };

    if (position.y < 10) {
      setPosition({
        ...position,
        y: 10,
      })
    };

    if (position.y > 85) {
      setPosition({
        ...position,
        y: 85,
      });
    };

  }, [position]);

  useEffect(() => {

    loadGameObjects();
    dummy.current.focus();
    setLoading(false);

  }, []);

  useEffect(() => {
    if (resources.length > 0) {
      console.log('resource position: ' + resources[0].x + ' , ' + resources[0].y);
    };
  }, [resources]);


  
  return (
    <div className='generation-screen'>
      {loading ? <Loading /> : 
        <>
          <Generation 
            position={position}
          />
          
          {resources.map(resource => (
            <Resource
              resource={resource}
            />
          ))}
        </>
      }
      <input
        className='generation-screen-control-input'
        value={controlInput}
        onChange={(e) => setControlInput(e.target.value)}
        ref={dummy}
      />
    </div>

  )
}

export default GenerationsScreen