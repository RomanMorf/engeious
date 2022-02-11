import React from 'react';
import './style.scss'

function ModalComponent(props) {

  function closeModalFunc(event) {
    if (event.target.className === 'modal_wrapper' || event.target.className === 'modal_close' ) {
      props.closeModal(false)
    } else {
      return
    }
  }

  return (
    <div className='modal_wrapper' onClick={(e)=> closeModalFunc(e)}>
      <div className='modal_body'>
        <div className='modal_header'>
          <h3>Modal header</h3>
        </div>
        <div className='modal_main'>Modal main</div>
        <div className='modal_footer'>Modal footer</div>
        <button className='modal_close' onClick={(e)=> closeModalFunc(e)}>X</button>
      </div>
    </div>
  )
}

export default ModalComponent