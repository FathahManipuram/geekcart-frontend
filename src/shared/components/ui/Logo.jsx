import React from 'react'
import { useNavigate } from 'react-router-dom'

const Logo = () => {
	const navigate= useNavigate()
  return (
	<div>
	  <h1 onClick={()=> navigate("/")} className='font-extrabold text-xl tracking-tighter cursor-pointer'>GeekCart</h1>
	</div>
  )
}

export default Logo
