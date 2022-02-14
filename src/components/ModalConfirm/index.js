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
    console.log('modalConfirm');
    props.onConfirm()
  }

  function modalCancel() {
    console.log('modalCancel');
    props.onCancel()
  }
  function modalClose() {
    props.onClose()
  }

  return (
    <div className='confirm_wrapper' onClick={(e)=> closeModalFunc(e)}>
      <div className='confirm_body'>
        <div className='confirm_header'>
          <h3>Are you sure ?</h3>
          <h4>{ props.text }</h4>
        </div>
        <div className='confirmr_footer'>
          <button className='confirm_btn' onClick={() => modalConfirm()}>Confirm</button>
          <button className='confirm_btn' onClick={() => modalCancel()}>Cancel</button>
          <button className='confirm_btn' onClick={() => modalClose()}>Close</button>
        </div>
      </div>
    </div>
  )
}

export default ModalConfirm;