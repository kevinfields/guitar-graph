import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = (props) => {

  if (props.user !== null) {

    return (
      <div className='links'>
        <Link to='/'>Home</Link>
        <Link to='/my-projects'>Projects</Link>
        <Link to='/new-project'>New Project</Link>
        <Link to='/my-profile'>My Profile</Link>
        <Link to='/guitar-graph'>Guitar Graph</Link>
        <Link to='/practice-page'>Practice Page</Link>
        <Link to='/generations'>Generations Page</Link>
        <Link to='/all-users'>All Users</Link>
        <Link to='/logout'>Logout</Link>
      </div>
    )
  } else {
    return (
      <div className='links'>
        <Link to='/'>Home</Link>
        <Link to='/login'>Login / Sign Up</Link>
        <Link to='/new-project'>New Project</Link>
        <Link to='/guitar-graph'>Guitar Graph</Link>
      </div>
    )
  }
}

export default Navbar