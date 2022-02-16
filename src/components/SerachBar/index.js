import React, { useState, useEffect } from 'react';
import './style.scss'

function SearchBar({items, onSearch}) {
  const [ filtered, setFiletred ] = useState('');
  const [ request, setRequest ] = useState();

  useEffect(() => {
    onSearch(filtered)
  }, []);

  function serchHandle(e) {
    setRequest(e.target.value)
    const filteredItems = items.filter((item) => item.title.indexOf(request) > -1 )
    setFiletred(filteredItems)
    onSearch(filtered)
  }

  return (
    <div className='search_wrapper'>
      <input type="text" onChange={(e) => serchHandle(e)} />
    </div>
  )
}

export default SearchBar;