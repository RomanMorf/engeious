import React from 'react';

const PostContext = React.createContext()


function PostContextProvider({children}) {
  const [posts, setPosts] = React.useState()

  return (
    <PostContext.Provider value={{posts, setPosts}}>
      { children }
    </PostContext.Provider>
  )
}

function usePostState() {
  const context = React.useContext(PostContext)
  if (context === undefined) { 
    throw new Error('must be use width PostContextProvider')
  }
  return context
}

export { PostContextProvider, usePostState };