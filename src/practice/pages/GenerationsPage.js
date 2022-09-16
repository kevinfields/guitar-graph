import React, {useState, useEffect} from 'react'
import GenerationsScreen from '../components/generations/GenerationsScreen';
import '../components/generations/Generations.css';

const GenerationsPage = (props) => {
  return (
    <div className='page'>
      <GenerationsScreen />
    </div>
  )
}

export default GenerationsPage