import React, { useState, useEffect } from 'react';
import './style.scss'
import { useModalState } from '../../context/Modal';

function SearchBar({ items, onSearch, post, user }) {
  const { showModal } = useModalState()

  const [ filtered, setFiletred ] = useState('');

  useEffect(() => {
    setFiletred(items)
    onSearch(items)
  }, []);

  useEffect(() => {
    onSearch(filtered)
  }, [filtered])

  function searchHandle(e) {
    const str = (e.target.value).toLowerCase()
    let filteredItems
    if (str.trim() === '') {
      onSearch(items)
      return
    } 
    
    if (post) {
      filteredItems = items.filter((item) => {
        return item.title.toLowerCase().includes(str)
          || item.body.toLowerCase().includes(str)
      })

    } 
    if (user) {
      filteredItems = items.filter((item) => {
        return item.name.toLowerCase().includes(str)
          || item.username.toLowerCase().includes(str)
          || item.email.toLowerCase().includes(str)
          || item.website.toLowerCase().includes(str)
      })
    }

    setFiletred(filteredItems)
  }


  return (
    <div className='search_wrapper'>
      <div className='search_section'>
        <span className="search_icon material-icons">search</span>
        <input className="search_input "id="search_input" type="text" onChange={(e) => searchHandle(e)} required=" "/>
        <label className='search_label' for="search_input">Enter search text</label>
      </div>
    </div>
  )
}

export default SearchBar;