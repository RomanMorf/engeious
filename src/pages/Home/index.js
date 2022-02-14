import './index.scss'
import React, { useEffect, useState } from 'react';
import { Post } from '../../components/Post';
import EditorModal from '../../components/EditorModal';
import usePost from '../../hooks/Posts';
import useUser from '../../hooks/Users';
import { useModalState } from '../../context/Modal';
import { usePostState } from '../../context/Posts';
import { useUserState } from '../../context/Users';
import getUserById from '../../heplers/getAutorById';
import Loader from '../../components/Loader';

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

  const {
    currentPost,
    setCurrentPost,
    fetchPosts,
  } = usePost()
  const { fetchUsers } = useUser()

  async function chooseCurrentPost(post) {
    await setCurrentPost(post)
    await setShowModal(true)
  }

  useEffect( async ()=> {
    try {
      if (!posts) await fetchPosts()
      if (!users) await fetchUsers()
      setTimeout(()=> {
        setIsLoading(false)
      }, 1500)
    } catch (error) {
      throw error
    }

  }, [])

  function createNewPost() {
    setCurrentPost(newPost)
    setShowModal(true)
  }

  return (
    <div>
      {showModal && <EditorModal post={currentPost} closeModal={() => setShowModal(false)}/> }

      <button onClick={ () => createNewPost() }>New Post</button>

      {isLoading && <Loader/>}

      {!isLoading && 
        <div className='post-wrapper'>
          { (posts && users) &&
            posts.map((post, index)=> {
              return (
                index < 20 && 
                <Post 
                  post={ post }  
                  user={ getUserById(users, post.userId) }
                  key={ 'post' + post.id } 
                  onEditPost={(postId) => chooseCurrentPost(postId)}
                />
              )
            })
          }
        </div>
      }
    </div>
  )
}

export default Home;