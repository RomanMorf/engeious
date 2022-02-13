import React from 'react';

const UserContext = React.createContext()


function UserContextProvider({children}) {
  const [users, setUsers] = React.useState()

  return (
    <UserContext.Provider value={{users, setUsers}}>
      { children }
    </UserContext.Provider>
  )
}

function useUserState() {
  const context = React.useContext(UserContext)
  if (context === undefined) { 
    throw new Error('must be use width UserContextProvider')
  }
  return context
}

export { UserContextProvider, useUserState };