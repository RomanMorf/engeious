import React, {useEffect} from 'react';
import './style.scss'
import usePost from '../../hooks/Posts';
import { useModalState } from '../../context/Modal';

function EditorModal(props) {
  const {showModal, setShowModal} = useModalState()

  const { 
    postsData,
    currentPost,
    setCurrentPost,
    setPostsData,
    createPost,
    deletePost,
    updatePost 
  } = usePost()

  
  const [post, setPost] = React.useState()
  useEffect(() => {
    setPost(props.post)
  });

  function closeModalFunc(event) {
    if (event.target.className === 'modal_wrapper' || event.target.className === 'modal_close' || event.target.className === 'modal_btn close' ) {
      setShowModal(false)
    }
  }


  return (
    <div className='modal_wrapper' onClick={(e)=> closeModalFunc(e)}>
      <div className='modal_body'>
        <div className='modal_header'>
          <h3>EditorModal</h3>
        </div> 
          <div className='modal_main'>
            <h4>Editor</h4>
            <p>{props.post.userId} - UserId</p>
            <p>{props.post.id} - Id</p>
            <h4>{props.post.title}</h4>
            <p>{props.post.body}</p>
          </div>
          <div className='modal_footer'>
        <button className='modal_btn' 
          onClick={() => createPost({
            id: Date.now(), 
            title: 'some title', 
            body: 'some body text', 
            userId: 5,
            }
          )}>Create post</button>
          <button className='modal_btn' onClick={()=> updatePost(post)}>Update post</button>
          <button className='modal_btn' onClick={() => deletePost(post.id)}>Delete post</button>
        </div>
        <button className='modal_close' onClick={(e)=> closeModalFunc(e)}>X</button>
      </div>
    </div>
  )
}

export default EditorModal