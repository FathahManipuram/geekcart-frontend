import Modal from '@/shared/components/Modal'
import React from 'react'
import ChangePasswordForm from './ChangePasswordForm'
import { useAuthStore } from '@/features/auth/store/auth.store'

const ProfileDisplatThree = ({user, passwordEditOpen, setPasswordEditOpen}) => {
  return (
	<>
	<div>
	  <p onClick={()=> setPasswordEditOpen(true)} className='cursor-pointer hover:text-primary text-sm'>{(user?.provider ==="local")? "Change password?": "Create new password"}</p>
	</div>

	<Modal open={passwordEditOpen} onOpenChange={setPasswordEditOpen} title={user?.provider=== "local" ? "Change Password" : "Create new password"}>
	<ChangePasswordForm user={user}/>
	</Modal>
	</>
  )
}

export default ProfileDisplatThree
