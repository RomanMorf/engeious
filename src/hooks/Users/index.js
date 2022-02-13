import { useState } from 'react';
import { useModalState } from '../../context/Modal';
import { useUserState } from '../../context/Users';
import { getUsers } from '../../api/getUsers';

function useUser() {
  const { setShowModal } = useModalState()
  const { users, setUsers } = useUserState()
  const [ currentUser, setCurrentUser ] = useState({})


  const fetchUsers = async () => {
    const users = await getUsers()
    setUsers(users)
  }

  const createUser = (newUser) => {
    users.push(newUser)
    setUsers(users)
    setShowModal(false)
  }

  const deleteUser = (id) => {
    const idx = users.findIndex(user => user.id === id)
    users.splice(idx, 1)
    setUsers(users)
    setShowModal(false)
  }

  const updateUser = (updatedUser) => {
    const idx = users.findIndex(user => user.id === updatedUser.id)
    users[idx] = updatedUser
    setUsers(users)
    setShowModal(false)
  }

  return {
    currentUser,
    setCurrentUser,

    createUser,
    deleteUser,
    updateUser,

    fetchUsers,
  }
};

export default useUser;

