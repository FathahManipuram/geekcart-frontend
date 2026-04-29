import { Search, ShoppingBag, User } from 'lucide-react'
import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
<header className='w-full bg-background '>
	<div className='flex items-center justify-between bg-card px-6 py-3 rounded-full shadow-sm'>
		<h1 className='font-bold text-lg'>GeekCart</h1>

		<nav>
			<NavLink to="/">Shop</NavLink>
			<NavLink to="">Collections</NavLink>
			<NavLink to="">Offers</NavLink>
			<NavLink to="">More</NavLink>
			<NavLink to="">Account</NavLink>
		</nav>

		<div className='flex items-center gap-4'>
			<Search className='w-5 h-5 cursor-pointer'/>
			<ShoppingBag className='w-5 h-5 cursor-pointer'/>
			<User className='w-5 h-5 cursor-pointer'/>
		</div>
	</div>
</header>
  )
}

export default Navbar
