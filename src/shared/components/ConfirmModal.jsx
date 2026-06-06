import React from 'react'
import Modal from './Modal'
import { Button } from './ui/button';

const ConfirmModal = ({
open, 
onOpenChange,
title="Are you Sure?",
description="This action cannot be undone",
confirmText= "Confirm",
cancelText= "Cancel",
onConfirm,
loading= false,
}) => {
  return (
    <Modal open={open} onOpenChange={onOpenChange} title={title}>
      <div className="space-y-6">
        <p className="text-muted-foreground text-sm">{description}</p>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {cancelText}
          </Button>

          <Button variant="destructive" onClick={onConfirm} disabled={loading}>
            {loading ? "Please wait..." : confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default ConfirmModal
