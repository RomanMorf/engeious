import React from 'react';

const ModalContext = React.createContext()


function ModalContextProvider({children}) {
  const [showModal, setShowModal] = React.useState(false)

  return (
    <ModalContext.Provider value={{showModal, setShowModal}}>
      { children }
    </ModalContext.Provider>
  )
}

function useModalState() {
  const context = React.useContext(ModalContext)
  if (context === undefined) { 
    throw new Error('must be use width ModalContextProvider')
  }
  return context
}

export { ModalContextProvider, useModalState };