import React, { useState, useEffect } from 'react';
import { useUserState } from '../../context/Users';
import useUser from '../../hooks/Users';
import Table from '../../components/Table';

function Users() {
  const { users, setUsers } = useUserState()
  const { fetchUsers } = useUser()

  useEffect(async () => {
    if (!users) await fetchUsers()
  }, [])

  return (
    <div>
      { users && <Table users={users} /> }
    </div>
  )
}


export default Users;