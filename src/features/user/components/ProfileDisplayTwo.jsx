import Modal from '@/shared/components/Modal'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'
import { Edit3 } from 'lucide-react'
import EmailEditForm from './EmailEditForm'
import { useAuthStore } from '@/features/auth/store/auth.store'
import { toast } from 'sonner'



const ProfileDisplayTwo = ({user, emailEditOpen, setEmailEditOpen}) => {
const changeEmail= useAuthStore((state)=> state.changeEmail)
  return (
	<>
	<div className='grid grid-cols-1 gap-4 text-sm mb-3 mt-3'>

		<div>
			<div className='flex flex-row items-center justify-between'>
			<Label >EMAIL ADDRESS</Label>
			<span onClick={()=>setEmailEditOpen(true)} className='bg-amber-200 p-1 rounded-sm cursor-pointer'><Edit3 size={12}/></span>
			</div>
			
			<Input value={user?.email} readOnly type="email" className="h-8"/>
		</div>
	</div>

	<Modal open={emailEditOpen} onOpenChange={setEmailEditOpen} title="Change Email">
	<EmailEditForm user={user} onClose={()=> setEmailEditOpen(false)}/> 
	</Modal>
	</>
  )
}

export default ProfileDisplayTwo
