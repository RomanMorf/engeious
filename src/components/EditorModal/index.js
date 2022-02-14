import React, {useEffect, useState} from 'react';
import './style.scss'
import usePost from '../../hooks/Posts';
import { useModalState } from '../../context/Modal';
import ModalConfirm from '../ModalConfirm' 

function EditorModal(props) {
  const {showModal, setShowModal} = useModalState()
  const { deletePost, updatePost } = usePost()

  const [showConfirmDelete, setShowConfirmDelete] = useState(false)
  const [showConfirmUpdate, setShowConfirmUpdate] = useState(false)
  const [confirmText, setConfirmText] = useState('')
  const [currentPost, setCurrentPost] = useState()

  useEffect(() => {
    setCurrentPost(props.post)
  }, [props.post]);

  useEffect(() => {
    return ()=> {
      setShowConfirmDelete(false)
      setShowConfirmUpdate(false)
    }
  }, [])

  function closeModalFunc(event) {
    if (event.target.className === 'modal_wrapper' || event.target.className === 'modal_close' || event.target.className === 'modal_btn close' ) {
      setShowModal(false)
    }
  }

  function updatePostFunc() {
    setConfirmText(`Are you sure, that you want update this post`)
    setShowConfirmUpdate(true)
  }

  function deletePostFunc() {
    setConfirmText(`Are you sure, that you want delete post "${currentPost.title}"`)
    setShowConfirmDelete(true)
  }

  function inputHandle (e) {
    if (e.target.attributes['data-title']) {
      const newPost = {
        ...currentPost,
        title: e.target.value
      }
      setCurrentPost(newPost)
    }
    if (e.target.attributes['data-body']) {
      const newPost = {
        ...currentPost,
        body: e.target.value
      }
      setCurrentPost(newPost)
    }
  }

  return (
    <>
      {showConfirmDelete && 
        <ModalConfirm         
          onClose={ () => setShowConfirmDelete(false)} 
          text={confirmText}
        >
          <button className='confirm_btn' onClick={() => deletePost(currentPost.id)}>Delete</button>
          <button className='confirm_btn' onClick={() => setShowConfirmDelete(false)}>Cancel</button>
        </ModalConfirm>
      }
      {showConfirmUpdate && 
        <ModalConfirm         
          onClose={ () => setShowConfirmUpdate(false)} 
          text={confirmText}
        >
          <button className='confirm_btn' onClick={() => updatePost(currentPost)}>Update</button>
          <button className='confirm_btn' onClick={() => setShowConfirmUpdate(false)}>Cancel</button>
        </ModalConfirm>
      }

      <div className='modal_wrapper' onClick={(e)=> closeModalFunc(e)}>
        <div className='modal_body'>
          <div className='modal_header'>
            <h3>EditorModal</h3>
          </div> 

          <div className='modal_main'>
            <p>{props.post.userId} - UserId</p>
            <p>{props.post.id} - Id</p>
            <h4>{props.post.title}</h4>
            {currentPost && <input className='modal_input' type="text" value={currentPost.title} data-title onChange={(e) => inputHandle(e)}/>}
            <p className='modal_text'>{props.post.body}</p>
            {currentPost && <input className='modal_input' type="text" value={currentPost.body} data-body onChange={(e) => inputHandle(e)}/>}
          </div>

          <div className='modal_footer'>
            <button className='modal_btn' onClick={()=> updatePostFunc()}>Update post</button>
            <button className='modal_btn' onClick={() => deletePostFunc()}>Delete post</button>
          </div>
          <button className='modal_close' onClick={(e)=> closeModalFunc(e)}>X</button>
        </div>
      </div>
    </>
  )
}

export default EditorModal