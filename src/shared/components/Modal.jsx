import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle} from '@/shared/components/ui/dialog'
const Modal = ({open, onOpenChange, title, children}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-xl max-h-[90vh] overflow-y-auto pb-6"
      >
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">{title}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}

export default Modal
