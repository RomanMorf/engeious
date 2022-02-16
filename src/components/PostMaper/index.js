import React from 'react';
import './index.scss'
import { Post } from '../Post';
import getUserById from '../../heplers/getAutorById';
import { useModalState } from '../../context/Modal';
import usePost from '../../hooks/Posts';
import EditorModal from '../EditorModal';
import { useCurrentItemsState } from '../../context/CurrentItems';

function PostMaper({ posts, users }) {
  const { showModal, setShowModal } = useModalState()
  const {currentItems, setCurrentItems } = useCurrentItemsState()
  const {
    currentPost,
    setCurrentPost,
  } = usePost()

  async function chooseCurrentPost(post) {
    await setCurrentPost(post)
    await setShowModal(true)
  }

  return (
    <>
      {showModal && <EditorModal post={currentPost} closeModal={() => setShowModal(false)}/> }

      <div className='post-wrapper'>
        {currentItems &&
          currentItems.map((post) => (
            <Post 
              post={ post }  
              user={ getUserById(users, post.userId) }
              key={ 'post' + post.id } 
              onEditPost={(postId) => chooseCurrentPost(postId)}
            />
        ))}
      </div>
    </>
  );
}

export default PostMaper;