import './index.scss'
import React, { useEffect, useState } from 'react';
import { Post } from '../../components/Post';
import EditorModal from '../../components/EditorModal';
import usePost from '../../hooks/Posts';
import useUser from '../../hooks/Users';
import { useModalState } from '../../context/Modal';
import { usePostState } from '../../context/Posts';
import { useUserState } from '../../context/Users';
import Loader from '../../components/Loader';
import PostMaper from '../../components/PostMaper';
import Paginated from '../../components/Paginated';
import { CurrentItemsContextProvider } from '../../context/CurrentItems';

function Home() {
  const { showModal, setShowModal } = useModalState()
  const { posts, setPosts } = usePostState()
  const { users, setUsers } = useUserState()

  const [ isLoading, setIsLoading ] = useState(true)
  const [ newPost, setNewPost ] = useState({
    id: Date.now(),
    title: '',
    body: '',
    userId: '',
  })

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
    setCurrentPost(newPost)
    setShowModal(true)
  }

  return (
    <div className='home'>
      {showModal && 
        <EditorModal 
          post={currentPost} 
          closeModal={() => setShowModal(false)}
        />
      }

      <button onClick={ () => createNewPost() }>New Post</button>

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