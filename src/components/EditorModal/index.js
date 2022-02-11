import React from 'react';
import './style.scss'

function EditorModal(props) {

  function closeModalFunc(event) {
    if (event.target.className === 'modal_wrapper' || event.target.className === 'modal_close' || event.target.className === 'modal_btn close' ) {
      props.closeModal(false)
    }

  }

  function saveModalFunc(event) {
  }

  function deleteModalFunc(event) {
  }
  console.log(props);

  return (
    <div className='modal_wrapper' onClick={(e)=> closeModalFunc(e)}>
      <div className='modal_body'>
        <div className='modal_header'>
          <h3>EditorModal header</h3>
        </div>
        {props.post &&         
            <div className='modal_main'>
          <h4>Data for edit</h4>
          <p>{props.post.title}</p>
          <p>{props.post.body}</p>
          <p>{props.post.userId}</p>
        </div>
        }
        <div className='modal_footer'>
          <button className='modal_btn' onClick={(e)=> saveModalFunc(e)}>Save</button>
          <button className='modal_btn close' onClick={(e)=> closeModalFunc(e)}>Cencel</button>
          <button className='modal_btn' onClick={(e)=> deleteModalFunc(e)}>Delete</button>
        </div>
        <button className='modal_close' onClick={(e)=> closeModalFunc(e)}>X</button>
      </div>
    </div>
  )
}

export default EditorModal