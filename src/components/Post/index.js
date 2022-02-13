import React from 'react';
import './style.scss'

export const Post = ({post, onEditPost}) => {

  return (
    <div className='post-body'>
      <span className='post-id'>Post #{ post.id }</span>
      <h1 className='post-title'>{ post.title }</h1>
      <p className='post-text'>{ post.body }</p>
      <button onClick={ () => onEditPost(post) }>Edit post </button>
    </div>
  )
}