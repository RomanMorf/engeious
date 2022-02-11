import './index.scss'
import React, {useState, useEffect } from 'react';
import { Post } from '../../components/Post';
import { getPosts } from '../../api/getPosts';
import { getUsers } from '../../api/getUsers';

import EditorModal from '../../components/EditorModal';

function Home() {
  const [showModal, setShowModal] = useState(false)
  const [showLoader, setShowLoader] = useState(true)
  const [postsData, setPostsData] = useState([])
  const [usersData, setUsersData] = useState([])
  const [postForEdit, setPostForEdit] = useState({})

  function closeModal() {
    setShowModal(false)
  }

  useEffect( async () => {
    try {
      const posts = await getPosts()
      await setPostsData(posts)

      const users = await getUsers()
      await setUsersData(users)

      // console.log(users,' users');
      // console.log(posts,' users');
    } catch (error) {
      throw error
    }

  }, [])

  return (
    <div>
      {showModal && <EditorModal post={ postsData[0] } closeModal={closeModal}/> }
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