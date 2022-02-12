import {useState} from 'react';

function usePost() {
  const [postsData, setPostsData] = useState([])

  const createPost = (post) => setPostsData(state => state.push(post))

  const deletePost = (id) => setPostsData(state => {
    const idx = state.indexOf(post => post.id === id)
    state.splice(idx, 1)
    console.log(state, 'deletePost - state');
    setPostsData(state)
  })

  const updatePost = () => setPostsData(state => state - 1)

  return {
    postsData,
    setPostsData,
    createPost,
    deletePost,
    updatePost,
  }
};

export default usePost;

