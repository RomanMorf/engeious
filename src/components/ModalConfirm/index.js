import React from 'react';
import './style.scss'

function ModalConfirm({children, text, onClose, onConfirm, onCancel}) {

  function closeModalFunc(event) {
    if (event.target.className === 'confirm_wrapper' || event.target.className === 'confirm_close' ) {
      onClose()

    }
  }

  return (
    <div className='confirm_wrapper' onClick={(e)=> closeModalFunc(e)}>
      <div className='confirm_body'>
        <div className='confirm_header'>
          <h3>Are you sure ?</h3>
          <p>{ text }</p>
        </div>
        <div className='confirm_footer'>
          {children}
        </div>
      </div>
    </div>
  )
}

export default ModalConfirm;