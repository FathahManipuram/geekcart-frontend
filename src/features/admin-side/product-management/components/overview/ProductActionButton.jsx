import { Button } from '@/shared/components/ui/button';
import { Eye, Trash2 } from 'lucide-react';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useProductStore } from '../../store/product.store';
import ConfirmModal from '@/shared/components/ConfirmModal';

const ProductActionButton = ({product}) => {
  const[openDeleteModal, setOpenDeleteModal]= useState(false)
  const deleteProduct= useProductStore((state)=>state.deleteProduct)
  const loading= useProductStore((state)=> state.loading)
  const navigate= useNavigate()
  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="icon" onClick={()=>{
        navigate(`/admin/products/${product.slug}`)
      }}>
        <Eye size={15} />
      </Button>

      <Button variant="outline" size="icon" onClick={()=>setOpenDeleteModal(true)}>
        <Trash2 size={15} />
      </Button>

      <ConfirmModal
      title='Do you want to delete this product'
      open={openDeleteModal}
      onOpenChange={setOpenDeleteModal}
      onConfirm={()=> deleteProduct(product._id)}
      loading={loading}
      />
    </div>
  );
}

export default ProductActionButton
