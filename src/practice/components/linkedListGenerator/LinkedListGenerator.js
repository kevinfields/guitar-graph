import { Card, CardHeader, TextField } from '@mui/material';
import React, {useState, useEffect} from 'react'

const LinkedListGenerator = (props) => {

  const [inputText, setInputText] = useState('');
  const [listValues, setListValues] = useState([]);
  const [linkedList, setLinkedList] = useState('');

  const getListFromArray = (array) => {

    let nodes = [null];
    let node;

    for (let i=array.length - 1; i>=0; i--) {
      node = {
        val: array[i],
        next: nodes[nodes.length - 1],
      };
      nodes.push(node);
    };
    return nodes[nodes.length - 1];
  }

  useEffect(() => {

    setListValues(inputText.split(','));

  }, [inputText]);

  useEffect(() => {
    setLinkedList(getListFromArray(listValues));
  }, [listValues])

  return (
    <div
      className='linked-list-generator'
    >
      <Card
        sx={{
          padding: '2vh',
          display: 'flex',
          flexDirection: 'column',
          gap: '2vh',
        }}
      >
        <CardHeader title={'Enter an array separated by commas to see it as a linked list.'} />
        <TextField
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          sx={{
            width: '100%',
          }}
        />
        <div className='linked-list-screen'>
          {JSON.stringify(linkedList)}
        </div>
      </Card>
    </div>
  )
}

export default LinkedListGenerator