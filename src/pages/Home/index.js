import './index.scss'
import React, { useEffect, useState } from 'react';
import EditorModal from '../../components/EditorModal';
import usePost from '../../hooks/Posts';
import useUser from '../../hooks/Users';
import { usePostState } from '../../context/Posts';
import { useUserState } from '../../context/Users';
import Loader from '../../components/Loader';
import PostMaper from '../../components/PostMaper';
import Paginated from '../../components/Paginated';
import { CurrentItemsContextProvider } from '../../context/CurrentItems';

function Home() {
  const [ showModal, setShowModal ] = useState()
  const { posts, setPosts } = usePostState()
  const { users, setUsers } = useUserState()

  const [ isLoading, setIsLoading ] = useState(true)

  const { currentPost, setCurrentPost, fetchPosts } = usePost()
  const { fetchUsers } = useUser()

  useEffect( async ()=> {
    try {
      if (!posts) await fetchPosts()
      if (!users) await fetchUsers()
      setIsLoading(false)
    } catch (error) {
      throw error
    }
  }, [])

  function createNewPost() {
    const newPost = {
      id: Date.now(),
      title: '',
      body: '',
      userId: '',
    }
    setCurrentPost(newPost)
    setShowModal(true)
  }

  function closeModalFunc() {
    setShowModal(false)
  }

  return (
    <div className='home'>
      {showModal && 
        <EditorModal 
          post={currentPost}
          new
          closeModal={closeModalFunc}
        />
      }

      <button className='btn' onClick={ () => createNewPost() }>New Post</button>

      {isLoading && <Loader/>}

      {!isLoading && 
        <>
          <CurrentItemsContextProvider>
            <PostMaper users={users}/>
            <Paginated items={posts} itemsPerPage={6} />
          </CurrentItemsContextProvider>
        </>
      }
    </div>
  )
}

export default Home;