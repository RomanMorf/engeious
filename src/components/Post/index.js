import React from 'react';
import './style.scss'

export const Post = ({post}) => {

  const users = [
    {id: 1, name: 'first'},
    {id: 2, name: 'second'},
    {id: 3, name: 'third'},
    {id: 4, name: 'third1'},
    {id: 5, name: 'third2'},
    {id: 6, name: 'third3'},
    {id: 7, name: 'third4'},
    {id: 8, name: 'third6'},
    {id: 9, name: 'third7'},
    {id: 10, name: 'thir8888d'},
  ]

  function getUserById(userId) {
    console.log(userId, 'userId');
    const user = users.filter(user => user.id === userId)
    return user[0]
  }
  return (
    <div className='post-body'>
      <span className='post-id'>Post #{ post.id }</span>
      <h1 className='post-title'>{ post.title }</h1>
      <p className='post-text'>{ post.body }</p>
      <p className='post-autor'>written by - { getUserById(post.userId).name }</p>
    </div>
  )
}