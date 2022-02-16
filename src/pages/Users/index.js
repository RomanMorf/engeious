import React, { useState, useEffect } from 'react';
import './index.scss'
import { useUserState } from '../../context/Users';
import useUser from '../../hooks/Users';
import Table from '../../components/Table';
import { CurrentItemsContextProvider } from '../../context/CurrentItems';
import EditorModal from '../../components/EditorModal';

function Users() {
  const [ showModal, setShowModal ] = useState()
  const { users } = useUserState()
  const { fetchUsers, currentUser, setCurrentUser } = useUser()

  useEffect(async () => {
    if (!users) await fetchUsers()
  }, [])

  function closeModalFunc() {
    setShowModal(false)
  }

  function createNewUser() {
    const newUser = {
      id: Date.now(),
      email: "",
      name: "",
      phone: "",
      username: "",
      website: "",  
    }
    setCurrentUser(newUser)
    setShowModal(true)
  }



  return (
    <div className='users'>
      {showModal && 
        <EditorModal 
          user={currentUser}
          new
          closeModal={closeModalFunc}
        />
      }
      <button className='btn' onClick={ () => createNewUser() }>New User</button>


      <CurrentItemsContextProvider>
        { users && <Table users={users} /> }
      </CurrentItemsContextProvider>
    </div>
  )
}


export default Users;