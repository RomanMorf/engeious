import './index.scss'
import React, {useState, useEffect } from 'react';
import { Post } from '../../components/Post';
import { getPosts } from '../../api/getPosts';
import { getUsers } from '../../api/getUsers';

import EditorModal from '../../components/EditorModal';

import usePost from '../../hooks/Posts';

function Home() {
  const { 
    postsData,
    setPostsData,
    createPost,
    deletePost,
    updatePost 
  } = usePost()

  const [showModal, setShowModal] = useState(false)
  const [showLoader, setShowLoader] = useState(true)
  const [usersData, setUsersData] = useState([])

  const [postForEdit, setPostForEdit] = useState(0)

  function closeModal() {
    setShowModal(false)
  }

  useEffect( async () => {
    try {
      const posts = await getPosts()
      await setPostsData(posts)

      const users = await getUsers()
      await setUsersData(users)

      console.log(users,' users');
      console.log(posts,' users');
    } catch (error) {
      throw error
    }

  }, [])

  return (
    <div>
      {showModal && <EditorModal post={ postsData[postForEdit] } closeModal={closeModal}/> }
      <button onClick={()=> setShowModal(true)}>show Modal</button>
      <div className='post-wrapper'>
        {
          postsData.map((post, index)=> {
            return (
              index < 20 && <Post post={post}  key={'post' + post.id }  />
            )
          })
        }
      </div>
    </div>
  )
}

export default Home;