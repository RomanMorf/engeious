import React from 'react';
import './style.scss'
import usePost from '../../hooks/Posts';

function EditorModal(props) {
  const { 
    postsData,
    setPostsData,
    createPost,
    deletePost,
    updatePost 
  } = usePost()


  function closeModalFunc(event) {
    if (event.target.className === 'modal_wrapper' || event.target.className === 'modal_close' || event.target.className === 'modal_btn close' ) {
      props.closeModal(false)
    }
  }

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
        <button className='modal_btn' 
          onClick={() => createPost({
            id: 55555, 
            title: 'some title', 
            body: 'some body text', 
            userId: 5,
            }
          )}>Create post</button>
          <button className='modal_btn' onClick={()=> updatePost(props.post.id)}>Save post</button>
          <button className='modal_btn' onClick={()=> deletePost(props.post.id)}>Delete post</button>
        </div>
        <button className='modal_close' onClick={(e)=> closeModalFunc(e)}>X</button>
      </div>
    </div>
  )
}

export default EditorModal