import { TextField } from '@mui/material'
import React from 'react'
import GridGameBoard from './components/GridGameBoard'
import './GridGame.css';

const GridGamePage = (props) => {
  return (
    <div className='page'>
      <GridGameBoard />
    </div>
  )
}

export default GridGamePage