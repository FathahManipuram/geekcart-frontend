import React from 'react'
import ProfileSidebar from '../components/ProfileSidebar'
import ProfileCard from '../components/ProfileCard'

const ProfilePage = () => {
  return (
	<div className='flex flex-row bg-muted-foreground p-4 gap-2'>
	  <ProfileSidebar/>
	  <ProfileCard/>
	</div>
  )
}

export default ProfilePage
