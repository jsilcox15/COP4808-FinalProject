//When a firebase token is gotten, add it to this context
import * as React from 'react'

const AuthContext = React.createContext()

function AuthReducer(state, action) {
  /*switch (action.type) {
    case 'increment': {
      return {count: state.count + 1}
    }
    case 'decrement': {
      return {count: state.count - 1}
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }*/
  return {token: state.token}
}

function AuthProvider({children}) {
  const [state, dispatch] = React.useReducer(AuthReducer, {token: ""})
  const value = {state, dispatch}
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

function useAuth() {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useCount must be used within a AuthProvider')
  }
  return context
}

export {AuthProvider, useAuth}