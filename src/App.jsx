import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './app/router'
import { Toaster } from 'sonner'

const App = () => {
  return (
    <>
      <Toaster
      position='top-center'
      richColors
      expand

      />
      <RouterProvider router={router} />
    </>
  )
}

export default App
