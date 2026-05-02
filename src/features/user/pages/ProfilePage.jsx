import React, { useEffect } from 'react'
import ProfileSidebar from '../components/ProfileSidebar'
import ProfileCard from '../components/ProfileCard'
import { useAuthStore } from '@/features/auth/store/auth.store'


const ProfilePage = () => {

const fetchProfile= useAuthStore((state)=> state.fetchProfile)

	useEffect(()=>{
		fetchProfile()
	}, [fetchProfile])
  return (
	<div className='flex flex-row bg-muted-foreground p-4 gap-2'>
	  <ProfileSidebar/>
	  <ProfileCard/>
	</div>
  )
}

export default ProfilePage
