
import React, {useState, useEffect, useRef} from 'react'
import Generation from './Generation'

const GenerationsScreen = () => {

  const [position, setPosition] = useState({
    x: 50,
    y: 50,
  });

  const [controlInput, setControlInput] = useState('');
  const dummy = useRef();

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
    dummy.current.focus();
  }, [])


  
  return (
    <div className='generation-screen'>
      <Generation 
        position={position}
      />
      <input
        value={controlInput}
        onChange={(e) => setControlInput(e.target.value)}
        ref={dummy}
        style={{
          color: 'white',
          width: '2vw',
          height: '2vh',
          position: 'fixed',
          top: ''
        }}
      />
    </div>
  )
}

export default GenerationsScreen