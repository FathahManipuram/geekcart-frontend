import React from 'react'
import LoginPage from './features/auth/pages/LoginPage'
import { RouterProvider } from 'react-router-dom'
import { router } from './app/router'

const App = () => {
  return (
    <div>
      <h1>Welcome GeekCart</h1>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
