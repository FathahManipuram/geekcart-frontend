import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './app/router'
import { Toaster } from 'sonner'
import SocketProvider from './socket/socketProvider'

const App = () => {


  return (
    <>
      <Toaster position="top-center" richColors expand />
      <SocketProvider>
        <RouterProvider router={router} />
      </SocketProvider>
    </>
  );
}

export default App
