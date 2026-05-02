import { useAuthStore } from '@/features/auth/store/auth.store'
import { Button } from '@/shared/components/ui/button'
import { ImageUp } from 'lucide-react'
import React from 'react'

const EditProfileImageForm = () => {
	const user= useAuthStore((state)=> state.user)
  return (
	<div className='w-full h-45 flex flex-col items-center justify-center gap-2'>
	  <img src={user?.avatar} alt="profile" className='w-20 h-20 rounded-full bg-amber-100'/>
	  <span className='bg-amber-300 p-1 absolute translate-6 rounded-full text-center'><ImageUp size={14}/></span>
	</div>
  )
}

export default EditProfileImageForm
