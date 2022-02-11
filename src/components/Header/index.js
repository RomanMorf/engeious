import React from 'react';
import './style.scss'
import NavBar from '../NavBar'

export const HeaderComponent = ()=> {

  return (
    <div className='header'>
      <div>Logo</div>
      <NavBar/>
      <div>other text</div>
    </div>
  )
}