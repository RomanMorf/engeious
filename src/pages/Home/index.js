import './index.scss'
import React, { useEffect } from 'react';
import { Post } from '../../components/Post';
import EditorModal from '../../components/EditorModal';
import usePost from '../../hooks/Posts';
import useUser from '../../hooks/Users';
import { useModalState } from '../../context/Modal';
import { usePostState } from '../../context/Posts';
import { useUserState } from '../../context/Users';
import getUserById from '../../heplers/getAutorById';

function Home() {
  const { showModal, setShowModal } = useModalState()
  const { posts, setPosts } = usePostState()
  const { users, setUsers } = useUserState()

  const { 
    currentPost,
    setCurrentPost,
    fetchPosts,
  } = usePost()
  const { fetchUsers } = useUser()

  function closeModal() {
    setShowModal(false)
  }

  async function chooseCurrentPost(post) {
    await setCurrentPost(post)
    await setShowModal(true)
  }

  useEffect( async ()=> {
    try {
      if (!posts) await fetchPosts()
      if (!users) await fetchUsers()

    } catch (error) {
      throw error
    }

  }, [])

  return (
    <div>
      {showModal && <EditorModal post={currentPost} closeModal={closeModal}/> }
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
    </div>
  )
}

export default Home;