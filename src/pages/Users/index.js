import React, { useState, useEffect } from 'react';
import { useUserState } from '../../context/Users';
import useUser from '../../hooks/Users';
import Table from '../../components/Table';
import { CurrentItemsContextProvider } from '../../context/CurrentItems';

function Users() {
  const { users } = useUserState()
  const { fetchUsers } = useUser()

  useEffect(async () => {
    if (!users) await fetchUsers()
  }, [])

  return (
    <div className='users'>
      <CurrentItemsContextProvider>
        { users && <Table users={users} /> }
      </CurrentItemsContextProvider>
    </div>
  )
}


export default Users;