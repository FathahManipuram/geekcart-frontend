import React from 'react'
import LoginPage from './features/auth/pages/LoginPage'
import { RouterProvider } from 'react-router-dom'
import { router } from './app/router'
import { Toaster } from 'sonner'

const App = () => {
  return (
    <div>
      <Toaster
      position='top-center'
      richColors
      expand

      />
      <RouterProvider router={router} />
    </div>
  )
}

export default App
