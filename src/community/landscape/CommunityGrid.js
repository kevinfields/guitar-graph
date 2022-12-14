import React, {useState} from 'react'
import {DragAndDropOrder} from 'light-blue-drag-and-drop';
import { Button } from '@mui/material';
import {ResponseModal} from 'multitype-response-modal';

const ConsoleButton = () => {
  return (
    <button
      onClick={() => console.log('this is the console button')}
    >
      Console
    </button>
  )
};

const AlertButton = () => {
  return (
    <button
      onClick={() => alert('this is the alert button')}
    >
      Alert
    </button>
  )
}

const ALPHABET = [AlertButton(), ConsoleButton()];

const CommunityGrid = () => {

  const [alphabet, setAlphabet] = useState(ALPHABET);
  const [insert, setInsert] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  return (
    <div>
      <DragAndDropOrder
        order={alphabet}
        onAdjustOrder={(newOrder) => setAlphabet(newOrder)}
        insert={insert}
        containerClassName='drag-and-drop-container-redux'
        slotClassName='drag-and-drop-slot-redux'
        objectClassName='drag-and-drop-object-redux'
      />
      <Button
        onClick={() => setInsert(!insert)}
      >
        {insert ? 'Swap' : 'Insert'}
      </Button>
      {openModal ? 
        <ResponseModal 
          open={openModal}
          onClose={() => setOpenModal(false)}
          onAccept={() => alert('Thank you for accepting.')}
          header={'Do you accept?'}
          description={'Click to accept.'}
        />
      : null
      }
      <button onClick={() => setOpenModal(true)}>Open Modal</button>
    </div>
  )
}

export default CommunityGrid