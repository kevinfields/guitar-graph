import React from 'react'

const HomePage = (props) => {

  const intro = props.user !== null ? 'Welcome! Click on the New Project tab to start a new project, or the Projects tab to continue an old one.' : 'Welcome! Please sign in to use the project planner.';
  return (
    <div className='page'>
      {intro}
    </div>
  )
}

export default HomePage