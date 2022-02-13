import './index.scss'
import React, {useState, useEffect } from 'react';
import { Post } from '../../components/Post';
import { getPosts } from '../../api/getPosts';
import { getUsers } from '../../api/getUsers';
import EditorModal from '../../components/EditorModal';
import usePost from '../../hooks/Posts';
import useUser from '../../hooks/Users';
import { useModalState } from '../../context/Modal';
import { usePostState } from '../../context/Posts';
import { useUserState } from '../../context/Users';
import Loader from '../../components/Loader';

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
      await fetchPosts()
      await fetchUsers()

    } catch (error) {
      throw error
    }

  }, [])

  return (
    <div>
      {showModal && <EditorModal post={currentPost} closeModal={closeModal}/> }
      <Loader/>
      <div className='post-wrapper'>
        { posts &&
          posts.map((post, index)=> {
            return (
              index < 20 && 
              <Post 
                post={post}  
                key={'post' + post.id } 
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