import { useState } from 'react';
import { useModalState } from '../../context/Modal';
import { getPosts } from '../../api/getPosts';
import { usePostState } from '../../context/Posts';

function usePost() {
  const { setShowModal } = useModalState()
  const { posts, setPosts } = usePostState()
  const [ currentPost, setCurrentPost ] = useState({})


  const fetchPosts = async () => {
    const posts = await getPosts()
    setPosts(posts)
  }

  const deletePost = (id) => {
    const idx = posts.findIndex(post => post.id === id)
    posts.splice(idx, 1)
    setPosts(posts)
    setShowModal(false)
  }

  const updatePost = (updatedPost) => {

    const idx = posts.findIndex(post => post.id === updatedPost.id)
    console.log(idx);
    if (idx < 0) {
      posts.push(updatedPost)
    } else {
      posts[idx] = updatedPost
    }
    setPosts(posts)
    setShowModal(false)
  }

  return {
    currentPost,
    setCurrentPost,

    deletePost,
    updatePost,

    fetchPosts,
  }
};

export default usePost;

