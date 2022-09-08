import { Box, Button, Modal, TextField, Typography } from '@mui/material'
import React, {useState} from 'react';

//THIS COMPONENT IS INTENDED TO DISPLAY A MODAL BLOCKING THE SCREEN WITH A PROMPT TO RESPOND TO
// There are 4 necessary properties: 
//  1: open (boolean), external state variable that controls whether the modal is open or not.
//  2: onClose() (function), should just call the function controlling the open variable and 
//      set it to false. If you want the variable being changed by the modal to reset to the value
//      it was before closing, that logic should go here too.
//  3: header (string), text for modal header.
//  4: description (string), text for modal question / description.
// To get any data, there must be one of the following properties / combinations as well:
//  a: for YES OR NO questions :
//    1: onAccept() (function), what to do if the user says yes.
//    2: onDecline() (function), what to do if the user says no. (probably just call the onClose function,
//          but there could be more functions needed with this.)
//  b: for NUMERICAL RESPONSE questions :
//    1: onRespondNumerical(response) (function), what to do when the user submits 
//          their numerical response.
//  c: for TEXT RESPONSE questions :
//    1: onRespondText(response) (function), what to do when the user submits their text response.
//  d: for MULTIPLE CHOICE questions :
//    1: onRespondOptions(response) (function), what to do when the user submits
//          their selected response.
//    2: options (array), an array of strings for the user to choose from.

const QuestionModal = (props) => {

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const [responseValue, setResponseValue] = useState(props.onAccept ? false : props.onRespondNumerical ? 0 : props.onRespondText ? '' : false);
  
  return (
    <Modal
      open={props.open}
      onClose={() => props.onClose()}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {props.header}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {props.description}
        </Typography>
        {props.onAccept ? 
          <>
            <Button
              variant='contained'
              color='success'
              sx={{
                marginTop: '1vh',
              }}
              onClick={() => props.onAccept()}
            >
              YES
            </Button>
            <Button 
              variant='contained'
              color='error'
              sx={{
                marginTop: '1vh',
                marginLeft: '1vw',
              }}
              onClick={() => props.onDecline()}
            >
              NO
            </Button>
          </>
        : props.onRespondNumerical ?
        <>
          <TextField
            type='number'
            value={responseValue}
            onChange={(e) => setResponseValue(e.target.value)}
          />
          <Button onClick={() => props.onRespondNumerical(responseValue)}>Submit</Button>
          <Button onClick={() => props.onClose()}>Close</Button>
        </>
        : props.onRespondText ?
          <>
            <TextField
              type='text'
              value={responseValue}
              onChange={(e) => setResponseValue(e.target.value)}
            />
            <Button onClick={() => props.onRespondText(responseValue)}>Submit</Button>
            <Button onClick={() => props.onClose()}>Close</Button>
          </>
        : props.onRespondOptions ?
          <>
            {props.options.map(option => (
              <Button onClick={() => props.onRespondOptions(option)}>{option}</Button>
            ))}
            <Button onClick={() => props.onClose()}>Close</Button>
          </>
        : null} 
      </Box>
    </Modal>
  )
}

export default QuestionModal;