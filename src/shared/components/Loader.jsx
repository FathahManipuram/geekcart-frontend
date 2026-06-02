import React from 'react'
import { Spinner } from './ui/spinner'

const Loader = () => {
  return (
	<div className='w-full h-screen flex items-center justify-center'>
	  <Spinner/>
	</div>
  )
}

export default Loader
