import React, {useEffect, useState} from 'react';
import './style.scss'
import usePost from '../../hooks/Posts';
import useUser from '../../hooks/Users';
import { useModalState } from '../../context/Modal';
import ModalConfirm from '../ModalConfirm' 

function EditorModal(props) {
  const {showModal, setShowModal} = useModalState()
  const { deletePost, updatePost } = usePost()
  const {createUser, deleteUser, updateUser} = useUser()
  const [current, setCurrent] = useState()

  const [showConfirmDelete, setShowConfirmDelete] = useState(false)
  const [showConfirmUpdate, setShowConfirmUpdate] = useState(false)
  const [confirmText, setConfirmText] = useState('')

  useEffect(() => {
    if ( props.post) setCurrent(props.post)
    if ( props.user) setCurrent(props.user)
  }, []);

  function closeModalFunc(event) {
    if (event.target.className === 'modal_wrapper' || event.target.className === 'modal_close' || event.target.className === 'modal_btn close' ) {
      setShowModal(false)
    }
  }

  function updatePostFunc() {
    props.post 
    ? setConfirmText(`Are you sure, that you want update this post`)
    : setConfirmText(`Are you sure, that you want update info for this user`)

    setShowConfirmUpdate(true)
  }

  function deletePostFunc() {
    props.post 
    ? setConfirmText(`Are you sure, that you want delete post "${current.title}" ?`)
    : setConfirmText(`Are you sure, that you want delete this user "${current.name}" ?`)

    setShowConfirmDelete(true)
  }

  function inputHandle (e) {
    let newPost = {}
    switch (e.target.attributes['data-post'].nodeValue) {
      case 'userId':
        newPost = {
          ...current,
          userId: parseInt(e.target.value)
        }
        setCurrent(newPost)
        break;
      case 'title':
        newPost = {
          ...current,
          title: e.target.value
        }
        setCurrent(newPost)
        break;
      case 'body':
      newPost = {
        ...current,
        body: e.target.value
      }
      setCurrent(newPost)        
      break;
      default:
        console.log('Unhaldle target.attributes');
        break;
    }
  }

  return (
    <>
      {showConfirmDelete && 
        <ModalConfirm         
          onClose={ () => setShowConfirmDelete(false)} 
          text={confirmText}
        >
          {props.post
            ? <button className='confirm_btn' onClick={() => deletePost(current.id)}>Delete</button>
            : <button className='confirm_btn' onClick={() => deleteUser(current.id)}>Delete</button>
          }
          <button className='confirm_btn' onClick={() => setShowConfirmDelete(false)}>Cancel</button>
        </ModalConfirm>
      }
      {showConfirmUpdate && 
        <ModalConfirm         
          onClose={ () => setShowConfirmUpdate(false)} 
          text={confirmText}
        >
          {props.post
            ? <button className='confirm_btn' onClick={() => updatePost(current)}>Update</button>
            : <button className='confirm_btn' onClick={() => updateUser(current)}>Update</button>
          }
          <button className='confirm_btn' onClick={() => setShowConfirmUpdate(false)}>Cancel</button>
        </ModalConfirm>
      }

      <div className='modal_wrapper' onClick={(e)=> closeModalFunc(e)}>
        <div className='modal_body'>
          <div className='modal_header'>
            <h3>EditorModal</h3>
          </div> 

          <div className='modal_main'>
            <p>Autor Id:</p>
            {current && <input className='modal_input' type="number" value={current.userId} data-post='userId' onChange={(e) => inputHandle(e)}/>}
            <h4>Title:</h4>
            {current && <input className='modal_input' type="text" value={current.title} data-post='title' onChange={(e) => inputHandle(e)}/>}
            <p className='modal_text'>Post text:</p>
            {current && <input className='modal_input' type="text" value={current.body} data-post='body' onChange={(e) => inputHandle(e)}/>}
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