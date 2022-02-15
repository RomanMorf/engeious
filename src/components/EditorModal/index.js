import React, {useEffect, useState} from 'react';
import './style.scss'
import usePost from '../../hooks/Posts';
import useUser from '../../hooks/Users';
import { useModalState } from '../../context/Modal';
import ModalConfirm from '../ModalConfirm' 

function EditorModal(props) {
  console.log(props);
  const { setShowModal } = useModalState()
  const { deletePost, updatePost } = usePost()
  const { deleteUser, updateUser } = useUser()

  const [showConfirmDelete, setShowConfirmDelete] = useState(false)
  const [showConfirmUpdate, setShowConfirmUpdate] = useState(false)
  const [confirmText, setConfirmText] = useState('')
  const [currentPost, setCurrentPost] = useState()
  const [currentUser, setCurrentUser] = useState()

  useEffect(() => {
    setCurrentPost(props.post)
    setCurrentUser(props.user)
  }, [props.post, props.user]);

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

  function updateFunc() {
    if (props.post) {
      setConfirmText(`Are you sure, that you want save this post`)
      setShowConfirmUpdate(true)
      return
    } else if (props.user) {
      setConfirmText(`Are you sure, that you want save info of this user`)
      setShowConfirmUpdate(true)
    } else {
      console.log('Unhandled event...');
    }
  }

  function deleteFunc() {
    if (props.post) {
      setConfirmText(`Are you sure, that you want delete post "${currentPost.title}"`)
      setShowConfirmDelete(true)
    } else if (props.user) {
      setConfirmText(`Are you sure, that you want delete user "${currentUser.name}"`)
      setShowConfirmDelete(true)
    } else {
      console.log('Unhandled event...');
    }
  }

  function inputHandle (e) {
    let newData = {}

    if (e.target.attributes['data-userId']) {
      newData = {
        ...currentPost,
        userId: parseInt(e.target.value) || ''
      }
      setCurrentPost(newData)
    }
    if (e.target.attributes['data-title']) {
      newData = {
        ...currentPost,
        title: e.target.value
      }
      setCurrentPost(newData)
    }
    if (e.target.attributes['data-body']) {
      newData = {
        ...currentPost,
        body: e.target.value
      }
      setCurrentPost(newData)
    }
    if (e.target.attributes['data-name']) {
      newData = {
        ...currentUser,
        name: e.target.value
      }
      setCurrentUser(newData)
    }
    if (e.target.attributes['data-phone']) {
      newData = {
        ...currentUser,
        phone: e.target.value
      }
      setCurrentUser(newData)
    }
    if (e.target.attributes['data-username']) {
      newData = {
        ...currentUser,
        username: e.target.value
      }
      setCurrentUser(newData)
    }    
    if (e.target.attributes['data-website']) {
      newData = {
        ...currentUser,
        website: e.target.value
      }
      setCurrentUser(newData)
    }    
    if (e.target.attributes['data-email']) {
      newData = {
        ...currentUser,
        email: e.target.value
      }
      setCurrentUser(newData)
    }
  }

  return (
    <>
      {showConfirmDelete && 
        <ModalConfirm         
          onClose={ () => setShowConfirmDelete(false)} 
          text={confirmText}
        >
          <button className='confirm_btn' onClick={
            currentPost 
            ? () => deletePost(currentPost.id) 
            : () => deleteUser(currentUser.id)
          }>Delete</button>
          <button className='confirm_btn' onClick={() => setShowConfirmDelete(false)}>Cancel</button>
        </ModalConfirm>
      }
      {showConfirmUpdate && 
        <ModalConfirm         
          onClose={ () => setShowConfirmUpdate(false)} 
          text={confirmText}
        >
          <button className='confirm_btn' onClick={
            currentPost 
            ? () => updatePost(currentPost)
            : () => updateUser(currentUser)
          }>Save</button>

          <button className='confirm_btn' onClick={() => setShowConfirmUpdate(false)}>Cancel</button>
        </ModalConfirm>
      }

      <div className='modal_wrapper' onClick={(e)=> closeModalFunc(e)}>
        <div className='modal_body'>
          <div className='modal_header'>
            <h3>EditorModal</h3>
          </div> 

          {props.post && 
            <>
              <div className='modal_main'>
                <p>Autor Id:</p>
                {currentPost && <input className='modal_input' type="text" value={currentPost.userId} data-userId onChange={(e) => inputHandle(e)}/>}
                <h4>Title:</h4>
                {currentPost && <input className='modal_input' type="text" value={currentPost.title} data-title onChange={(e) => inputHandle(e)}/>}
                <p className='modal_text'>Text: </p>
                {currentPost && <textarea className='modal_textarea' rows="5" value={currentPost.body} data-body onChange={(e) => inputHandle(e)}></textarea>}
              </div>
            </>
          }
          {props.user && 
            <>
              <div className='modal_main'>
                <h4>User name:</h4>
                {currentUser && <input className='modal_input' type="text" value={currentUser.name} data-name onChange={(e) => inputHandle(e)}/>}
                <p>Tel:</p>
                {currentUser && <input className='modal_input' type="text" value={currentUser.phone} data-phone onChange={(e) => inputHandle(e)}/>}
                <p>User username:</p>
                {currentUser && <input className='modal_input' type="text" value={currentUser.username} data-username onChange={(e) => inputHandle(e)}/>}
                <p>Website:</p>
                {currentUser && <input className='modal_input' type="text" value={currentUser.website} data-website onChange={(e) => inputHandle(e)}/>}
                <p>Email:</p>
                {currentUser && <input className='modal_input' type="text" value={currentUser.email} data-email onChange={(e) => inputHandle(e)}/>}
              </div>
            </>
        }
          <div className='modal_footer'>
            <button className='modal_btn' onClick={()=> updateFunc()}>Save</button>
            <button className='modal_btn' onClick={() => deleteFunc()}>Delete</button>
          </div>
          <button className='modal_close' onClick={(e)=> closeModalFunc(e)}>X</button>
        </div>
      </div>
    </>
  )
}

export default EditorModal