import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'
import { Eye, EyeOff } from 'lucide-react'
import React, { useState } from 'react'

const ProfileForm = ({user}) => {
	const [show, setShow]= useState(false)
  return (
	<>
	<div className='flex justify-between items-center mb-4'>
	  <h2 className='font-semibold text-lg'>Personal Information</h2>
	  <Button>Update</Button>
	</div>

	<div className='grid grid-cols-2 gap-4 text-sm'>
		<div>
			<Label >FULL NAME</Label>
			<Input value={user?.FullName} type="text" className="h-8"/>
		</div>

		<div>
			<Label >PHONE NUMBER</Label>
			<Input value={user?.phoneNumber} type="tel"  className="h-8"/>
		</div>

			<div>
			<Label >GENDER</Label>
			<Input value={user?.gender} type="text"  className="h-8"/>
		</div>

		<div>
			<Label >DATE OF BIRTH</Label>
			<Input value={user?.dateOfBirth} type="date"  className="h-8"/>
		</div>

		<div>
			<Label >EMAIL ADDRESS</Label>
			<Input value={user?.email} type="email"  className="h-8"/>
		</div>

		<div>
			<Label >PASSWORD</Label>
			<div className='flex relative'>
				<Input value={user?.password} type={show ? "password": "text"}  className="h-8"/>
				<button onClick={()=> setShow(!show)} type='button' className='absolute top-2 right-0'>{show? <Eye size={20}/>: <EyeOff size={20}/>}</button>
			</div>
		</div>
		

	</div>
	</>
  )
}

export default ProfileForm
