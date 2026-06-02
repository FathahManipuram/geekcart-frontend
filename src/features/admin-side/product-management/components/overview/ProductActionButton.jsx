import { Button } from '@/shared/components/ui/button';
import { Eye, Power, PowerOff, Trash2 } from 'lucide-react';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useProductStore } from '../../store/product.store';
import ConfirmModal from '@/shared/components/ConfirmModal';

const ProductActionButton = ({product}) => {
  const[openDeleteModal, setOpenDeleteModal]= useState(false)
  const [openStatusModal, setOpenStatusModal] = useState(false);
  const deleteProduct= useProductStore((state)=>state.deleteProduct)
  const loading= useProductStore((state)=> state.loading)
  const toggleProductStatus= useProductStore((state)=> state.toggleProductStatus)

  const navigate= useNavigate()
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={(e) =>{
           e.stopPropagation();
setOpenStatusModal(true);
        }}
        className={`${
          product.isActive
            ? "border-green-200 bg-green-50 text-green-600"
            : "border-red-200 bg-red-50 text-red-600"
        }`}
      >
        {product.isActive ? <Power size={15} /> : <PowerOff size={15} />}
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={() => {
          navigate(`/admin/products/${product.slug}`);
        }}
      >
        <Eye size={15} />
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={() => setOpenDeleteModal(true)}
        className="text-red-500 hover:text-red-600"
      >
        <Trash2 size={15} />
      </Button>

      <ConfirmModal
        title="Do you want to delete this product"
        open={openDeleteModal}
        onOpenChange={setOpenDeleteModal}
        onConfirm={() => deleteProduct(product._id)}
        loading={loading}
      />

      <ConfirmModal
        title={
          product.isActive
            ? "Deactivate this product?"
            : "Activate this product?"
        }
        description=''
        open={openStatusModal}
        onOpenChange={setOpenStatusModal}
        onConfirm={() => toggleProductStatus(product._id)}
        loading={loading}
      />
    </div>
  );
}

export default ProductActionButton
