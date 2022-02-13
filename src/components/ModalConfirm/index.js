import React from 'react';
import './style.scss'

function ModalConfirm(props) {

  function closeModalFunc(event) {
    if (event.target.className === 'modal_wrapper' || event.target.className === 'modal_close' ) {
      props.onClose()
      
    } else {
      return
    }
  }

  function modalConfirm() {
    props.onConfirm()
  }

  function modalCancel() {
    props.onCancel()
  }

  return (
    <div className='confirm_wrapper' onClick={(e)=> closeModalFunc(e)}>
      <div className='confirm_wrapper_body'>
        <div className='confirm_wrapper_header'>
          <h4>{ props.text }</h4>
        </div>
        <div className='confirm_wrapper_footer'>
          <button className='confirm_wrapper-btn' onClick={() => modalConfirm}>Подтвердить</button>
          <button className='confirm_wrapper-btn' onClick={() => modalCancel}>Отмена</button>
        </div>
      </div>
    </div>
  )
}

export default ModalConfirm;