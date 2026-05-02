import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle} from '@/shared/components/ui/dialog'
const Modal = ({open, onOpenChange, title, children}) => {
  return (
	<Dialog open={open} onOpenChange={onOpenChange}>
		<DialogContent>
<DialogHeader>
	<DialogTitle className="text-lg font-bold">
		{title}
	</DialogTitle>
</DialogHeader>
{children}
		</DialogContent>
	</Dialog>
  )
}

export default Modal
