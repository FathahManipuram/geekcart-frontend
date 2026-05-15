import { Button } from '@/shared/components/ui/button';
import { Plus } from 'lucide-react';
import React, { useState } from 'react'
import Modal from '@/shared/components/Modal';
import Header from '@/shared/components/Header';
import CategoryForm from './CategoryForm';
import { addCategorySchema } from '../validations/category.validation';
import { useCategoryStore } from '../store/category.store';
import { toast } from 'sonner';

const PageHeader = () => {
  const [openAddCategoryModal, setOpenAddCategoryModal]= useState(false)
  const createCategory = useCategoryStore((state)=> state.createCategory)

  const handleSubmit= async (data)=>{
    try{
      console.log(data)
      const res= await createCategory(data)
      toast.success(res.message || "Category created succes")
      setOpenAddCategoryModal(false)
    }catch(err){
      toast.error(err.response?.data?.message || "Failed to create category")
    }
  }
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <Header title="Category Management" />

      <Button onClick={() => setOpenAddCategoryModal(true)}>
        <Plus size={16} />
        Add New Category
      </Button>

      <Modal
        open={openAddCategoryModal}
        onOpenChange={setOpenAddCategoryModal}
        title="Add New Category"
      >
        <CategoryForm
          onClose={() => setOpenAddCategoryModal(false)}
          onSubmit={handleSubmit}
          schema={addCategorySchema}
        />
      </Modal>
    </div>
  );
}

export default PageHeader
