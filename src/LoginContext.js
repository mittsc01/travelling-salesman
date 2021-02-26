import React from 'react'

const LoginContext = React.createContext({
  
  login: null,
  handleLogin: () => {},
  handleLogout: () => {}
  
})

export default LoginContext
