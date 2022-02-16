import React, {useEffect, useState} from 'react';
import './style.scss'
import usePost from '../../hooks/Posts';
import useUser from '../../hooks/Users';
import { useModalState } from '../../context/Modal';
import ModalConfirm from '../ModalConfirm' 

function EditorModal(props) {
  const { setShowModal} = useModalState()
  const { deletePost, updatePost, createPost } = usePost()
  const { deleteUser, updateUser, createUser } = useUser()
  const [ current, setCurrent ] = useState()

  const [ showConfirmDelete, setShowConfirmDelete ] = useState(false)
  const [ showConfirmUpdate, setShowConfirmUpdate ] = useState(false)
  const [ showConfirmCreate, setShowConfirmCreate ] = useState(false)
  const [ confirmText, setConfirmText ] = useState('')

  useEffect(() => {
    if ( props.post) setCurrent(props.post)
    if ( props.user) setCurrent(props.user)
  }, []);

  function closeModalFunc(event) {
    if (event.target.className === 'modal_wrapper' || event.target.className === 'modal_close' || event.target.className === 'modal_btn close' ) {
      setShowModal(false)
      props.closeModal()
    }
  }

  function updateTextFunc() {
    props.post 
    ? setConfirmText(`Are you sure, that you want update this post`)
    : setConfirmText(`Are you sure, that you want update info for this user`)

    setShowConfirmUpdate(true)
  }

  function createTextFunc() {
    props.post 
    ? setConfirmText(`Are you sure, that you want Create new post`)
    : setConfirmText(`Are you sure, that you want Create new user`)

    setShowConfirmCreate(true)
  }

  function createFunc() {
    props.post 
      ? createPost(current)
      : createUser(current)
    console.log(current, 'create new user');
    setShowConfirmCreate(false)
    props.closeModal()
  }

  function deleteFunc() {
    props.post 
    ? setConfirmText(`Are you sure, that you want delete post "${current.title}" ?`)
    : setConfirmText(`Are you sure, that you want delete this user "${current.name}" ?`)

    setShowConfirmDelete(true)
  }

  function inputHandle (e) {
    const key = e.target.attributes['data-post'].nodeValue
    const newData = {
    ...current,
    [key]: e.target.value
    }
    setCurrent(newData)    
  }

  console.log(props.user);
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
            ? <button className='confirm_btn' onClick={() => updatePost(current)}>Save</button>
            : <button className='confirm_btn' onClick={() => updateUser(current)}>Save</button>
          }
          <button className='confirm_btn' onClick={() => setShowConfirmUpdate(false)}>Cancel</button>
        </ModalConfirm>
      }
      {showConfirmCreate && 
        <ModalConfirm         
          onClose={ () => setShowConfirmCreate(false)} 
          text={confirmText}
        >
          <button className='confirm_btn' onClick={() => createFunc()}>Create</button>
          <button className='confirm_btn' onClick={() => setShowConfirmUpdate(false)}>Cancel</button>
        </ModalConfirm>
      }


      <div className='modal_wrapper' onClick={(e)=> closeModalFunc(e)}>
        <div className='modal_body'>
          <div className='modal_header'>
            <h3>EditorModal</h3>
          </div> 

          <div className='modal_main'>
            {props.post && 
              <>
                <p>Autor Id:</p>
                {current && <input className='modal_input' type="number" value={current.userId} data-post='userId' onChange={(e) => inputHandle(e)}/>}
                <h4>Title:</h4>
                {current && <input className='modal_input' type="text" value={current.title} data-post='title' onChange={(e) => inputHandle(e)}/>}
                <p className='modal_text'>Post text:</p>
                {current && <input className='modal_input' type="text" value={current.body} data-post='body' onChange={(e) => inputHandle(e)}/>}
              </>
            }
            {props.user && 
              <>
                <p>Name:</p>
                {current && <input className='modal_input' type="text" value={current.name} data-post='name' onChange={(e) => inputHandle(e)}/>}
                <p>Username:</p>
                {current && <input className='modal_input' type="text" value={current.username} data-post='username' onChange={(e) => inputHandle(e)}/>}
                <p>Email:</p>
                {current && <input className='modal_input' type="text" value={current.email} data-post='email' onChange={(e) => inputHandle(e)}/>}
                <p>Phone:</p>
                {current && <input className='modal_input' type="text" value={current.phone} data-post='phone' onChange={(e) => inputHandle(e)}/>}
                <p>Website:</p>
                {current && <input className='modal_input' type="text" value={current.website} data-post='website' onChange={(e) => inputHandle(e)}/>}
              </>
            }
          </div>

          <div className='modal_footer'>
            {props.new
              ? <button className='modal_btn' onClick={()=> createTextFunc()}>Create new</button>
              : <button className='modal_btn' onClick={()=> updateTextFunc()}>Save</button>
            }
            {props.new
              ? <button className='modal_btn close' onClick={(e)=> closeModalFunc(e)}>Cancel</button>
              : <button className='modal_btn' onClick={() => deleteFunc()}>Delete</button>
            }
          </div>
          <button className='modal_close' onClick={(e)=> closeModalFunc(e)}>X</button>
        </div>
      </div>
    </>
  )
}

export default EditorModal