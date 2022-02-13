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

  const createPost = (newPost) => {
    posts.push(newPost)
    setPosts(posts)
    setShowModal(false)
  }

  const deletePost = (id) => {
    const idx = posts.findIndex(post => post.id === id)
    posts.splice(idx, 1)
    setPosts(posts)
    setShowModal(false)
  }

  const updatePost = (updatedPost) => {
    const idx = posts.findIndex(post => post.id === updatedPost.id)
    posts[idx] = updatedPost
    setPosts(posts)
    setShowModal(false)
  }

  return {
    currentPost,
    setCurrentPost,

    createPost,
    deletePost,
    updatePost,

    fetchPosts,
  }
};

export default usePost;

