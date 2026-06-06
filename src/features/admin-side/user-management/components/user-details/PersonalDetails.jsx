
import { Label } from '@/shared/components/ui/label'
import React from 'react'

const PersonalDetails = ({user}) => {
  return (
	<div>
	<Label>FULL NAME</Label>
	<p>{user?.fullname}</p>

	<Label>EMAIL ADDRESS</Label>
	<p>{user.email}</p>

	<Label>PHONE NUMBER</Label>
	<p>{user.phoneNumber}</p>
	</div>
  )
}

export default PersonalDetails
