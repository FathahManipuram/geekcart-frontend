import { useAuthStore } from '@/features/auth/store/auth.store'
import { Album, CreditCard, LogOut, MapPin, User } from 'lucide-react'
import React from 'react'
import { NavLink } from 'react-router-dom'

const ProfileSidebar = () => {
	const {user, logout}= useAuthStore()
  return (
	<div className='bg-card p-6 rounded-xl w-65 space-y-6'>
	  {/* profile */}
	  <div className='flex flex-col items-center text-center'>
		<img src={user?.avatar} alt={user?.fullName} className='w-20 h-20 rounded-full object-cover border'/>
		<h2 className='font-semibold mt-2'>{user?.name}</h2>
		<p className='text-sm text-muted-forgrounf'>{user?.email}</p>
	  </div>

	  {/* menu */}
	  <ul className='space-y-5 text-sm'>
		<li className='bg-amber-200 py-2.5 px-3 rounded-lg'>
			<NavLink onClick={logout} className="flex items-center gap-2">
			<User size={16}/> Account Details
			</NavLink>
		</li>

		<li>
			<NavLink to="" className="flex items-center gap-2">
			<Album size={16}/> Order History
			</NavLink>
		</li>

		<li>
			<NavLink to="" className="flex items-center gap-2">
			<MapPin size={16}/> Saved Addresses
			</NavLink>
		</li>

		<li>
			<NavLink to="" className="flex items-center gap-2">
			<CreditCard size={16}/> Payments
			</NavLink>
		</li>

		<li>
			<NavLink to="" className="flex items-center gap-2">
			<LogOut size={16}/> Sign Out
			</NavLink>
		</li>
	  </ul>

	</div>
  )
}

export default ProfileSidebar
