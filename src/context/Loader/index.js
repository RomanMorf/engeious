import React from 'react';

const LoaderContext = React.createContext()

function LoaderContextProvider({children}) {
  const [showLoader, setShowLoader] = useState(true)

  return (
    <LoaderContext.Provider value={{ showLoader, setShowLoader }}>
      { children }
    </LoaderContext.Provider>
  )
}

function useLoaderState() {
  const context = React.useContext(LoaderContext)
  if (context === undefined) { 
    throw new Error('must be use width LoaderContextProvider')
  }
  return context
}

return { useLoaderState, LoaderContextProvider };