import { Button } from '@/shared/components/ui/button';
import { Eye, Trash2 } from 'lucide-react';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const ProductActionButton = ({product}) => {
  const navigate= useNavigate()
  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="icon" onClick={()=>{
        navigate(`/admin/products/${product.slug}`)
      }}>
        <Eye size={15} />
      </Button>

      <Button variant="outline" size="icon">
        <Trash2 size={15} />
      </Button>
    </div>
  );
}

export default ProductActionButton
