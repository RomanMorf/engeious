import React from 'react';

const CurrentItemsContext = React.createContext()

function CurrentItemsContextProvider({children}) {
  const [currentItems, setCurrentItems] = React.useState()

  return (
    <CurrentItemsContext.Provider value={{currentItems, setCurrentItems}}>
      { children }
    </CurrentItemsContext.Provider>
  )
}

function useCurrentItemsState() {
  const context = React.useContext(CurrentItemsContext)
  if (context === undefined) { 
    throw new Error('must be use width PostContextProvider')
  }
  return context
}

export { CurrentItemsContextProvider, useCurrentItemsState };