import './index.scss'
import React, {useState, useEffect } from 'react';
import { Post } from '../../components/Post';
import { getPosts } from '../../api/getPosts';
import { getUsers } from '../../api/getUsers';
import EditorModal from '../../components/EditorModal';
import usePost from '../../hooks/Posts';
import { useModalState } from '../../context/Modal';
import { usePostState } from '../../context/Posts';

function Home() {
  const {showModal, setShowModal} = useModalState()
  const {posts, setPosts} = usePostState()

  const { 
    currentPost,
    setCurrentPost,
    fetchPosts,
  } = usePost()

  const [showLoader, setShowLoader] = useState(true)
  const [usersData, setUsersData] = useState([])

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

      const users = await getUsers()
      await setUsersData(users)

    } catch (error) {
      throw error
    }

  }, [])

  useEffect( ()=> {
    console.log(posts, 'posts from home');
  }, [posts])

  return (
    <div>
        {showModal && <EditorModal post={currentPost} closeModal={closeModal}/> }

        <button onClick={ ()=> setShowModal(true) }>show Modal</button>

        <div className='post-wrapper'>
          { posts &&
            posts.map((post, index)=> {
              return (
                index < 200 && 
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