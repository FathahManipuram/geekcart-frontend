import React from 'react'
import AccountSidebar from '../components/AccountSidebar'
import { Outlet } from 'react-router-dom'

const AccountLayout = () => {
  return (
	<div className='max-w-7xl mx-auto py-10 px-4'>
	  <div className='grid grid-cols-12 gap-6'>
		<div className='col-span-3'>
			<AccountSidebar/>
		</div>

		<div className='col-span-9'>
			<Outlet/>
		</div>
	  </div>
	</div>
  )
}

export default AccountLayout
