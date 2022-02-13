import React from 'react';
import './style.scss'

export const Post = ({post, user, onEditPost}) => {
  return (
    <div className='post-body'>
      <span className='post-id'>Post #{ post.id }</span>
      <h1 className='post-title'>{ post.title }</h1>
      <p className='post-text'>{ post.body }</p>
      {user && <p className='post-autor'>written by - {user.name}</p>}
      <button className='post-edit' onClick={ () => onEditPost(post) }>
        <span className="material-icons">edit</span>
      </button>
    </div>
  )
}