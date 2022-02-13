import React from 'react';
import './style.scss'

function ModalConfirm(props) {

  function closeModalFunc(event) {
    if (event.target.className === 'modal_wrapper' || event.target.className === 'modal_close' ) {
      props.closeModal(false)
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
    <div className='modal_wrapper' onClick={(e)=> closeModalFunc(e)}>
      <div className='modal_body'>
        <div className='modal_header'>
          <h4>{ props.text }</h4>
        </div>
        <div className='modal_footer'>
          <button className='modal-btn' onClick={() => modalConfirm}>Подтвердить</button>
          <button className='modal-btn' onClick={() => modalCancel}>Отмена</button>
        </div>
        <button className='modal_close' onClick={(e)=> closeModalFunc(e)}>X</button>
      </div>
    </div>
  )
}

export default ModalConfirm;