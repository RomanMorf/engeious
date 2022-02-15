import React, { useState, useEffect } from 'react';
import { useUserState } from '../../context/Users';
import useUser from '../../hooks/Users';
import Table from '../../components/Table';
import { useModalState } from '../../context/Modal';
import EditorModal from '../../components/EditorModal';

function Users() {
  const { showModal, setShowModal } = useModalState(false)
  const { users, setUsers } = useUserState()
  const { 
    currentUser,
    setCurrentUser,
    createUser,
    deleteUser,
    updateUser,
    fetchUsers } = useUser()

  useEffect(async () => {
    if (!users) await fetchUsers()
  }, [])

  function CreateNewUser() {
    const newUser = {
      id: Date.now(),
      email: "",
      name: "",
      phone: "",
      username: "",
      website: "",
    }
    setCurrentUser(newUser)
    console.log(currentUser);
    setShowModal(true)
  }

  return (
    <div>
      <button className='btn' onClick={() => CreateNewUser()}>Create new User</button>

      {showModal && <EditorModal user={currentUser} closeModal={() => setShowModal(false)}/> }

      { users && <Table users={users} /> }
    </div>
  )
}


export default Users;