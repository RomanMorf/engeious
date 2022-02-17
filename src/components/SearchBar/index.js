import React, { useState, useEffect } from 'react';
import './style.scss'

function SearchBar({ items, onSearch, post }) {
  const [ filtered, setFiletred ] = useState('');

  useEffect(() => {
    setFiletred(items)
    onSearch(items)
  }, []);

  function searchHandle(e) {
    const str = (e.target.value).toLowerCase()
    let filteredItems
    if (str.trim() === '') {
      onSearch(items)
      return
    } 
    
    if (post) {
      filteredItems = items.filter((item) => {
        return item.title.includes(str)
          || item.body.includes(str)
      })

    } else {
      console.log('user from search');
      filteredItems = items.filter((item) => {
        return item.name.includes(str)
          || item.username.includes(str)
          || item.email.includes(str)
          || item.website.includes(str)
      })
    }


    setFiletred(filteredItems)

    onSearch(filtered)
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