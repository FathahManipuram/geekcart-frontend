import ConfirmModal from '@/shared/components/ConfirmModal';
import DataTable from '@/shared/components/DataTable'
import { formatTitleCase } from '@/shared/utils/formatTitleCase';
import { Pencil, Trash2 } from 'lucide-react';
import React, { useState } from 'react'
import CategoryForm from './CategoryForm';
import { updateCategorySchema } from '../validations/category.validation';
import Modal from '@/shared/components/Modal';
import { useCategoryStore } from '../store/category.store';
import { toast } from 'sonner';

const CategoryTable = ({categories, loading}) => {
const [deleteModalOpen, setDeleteModalOpen]= useState(false)
const [selectedCategory, setSelectedCategory] = useState(null);
const [editModalOpen, setEditModalOpen]= useState(false)
const {updateCategory}= useCategoryStore()
  const handleDelete = async () => {
    console.log(selectedCategory);
  };

  const updateHandler= async(data)=>{
    console.log(data)
    try{
      const res= await updateCategory(selectedCategory._id, data)
      toast.success(res.message || "Updated successfully")
      setEditModalOpen(false)
      setSelectedCategory(null)
    }catch(err){
      toast.error(err.message || "Updation failed")
    }
  }

  const openDeleteModal = (category) => {
    setSelectedCategory(category);
    setDeleteModalOpen(true);
  };



	const columns = [
    {
      header: "SL. NO",
      cell: (_, index) => 
	<span className='font-semibold'>{index+1}</span>
	
      
    },

    {
      header: "CATEGORY NAME",
      cell: (category) => (
        <span className="font-semibold">{formatTitleCase(category?.name)}</span>
      ),
    },

    {
      header: "SUBCATEGORIES",
      cell: (category) => category.subcategoryCount ?? 0,
    },

    {
      header: "PRODUCTS",
      cell: (category) => category.productCount ?? 0,
    },

    {
      header: "STATUS",
      cell: (category) => (
          <span
            className={`text-xs font-semibold tracking-wide ${
              category.isActive ? "text-green-700" : "text-red-600"
            }`}
          >
            {category.isActive ? "ACTIVE" : "INACTIVE"}
          </span>
      ),
    },

    {
      header: "ACTIONS",
      cell: (category) => (
        <div className="flex items-center gap-4">
          {/* EDIT */}
          <button
            onClick={()=> {
              setSelectedCategory(category);
              setEditModalOpen(true);
            }
            }
            className="
              text-muted-foreground
              hover:text-black
              transition
            "
          >
            <Pencil size={16} />
          </button>

          {/* DELETE */}
          <button
            onClick={() => openDeleteModal(category)}
            className="
              text-red-500
              hover:text-red-700
              transition
            "
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ];




  return (
    <>
      <DataTable
        columns={columns}
        data={categories}
        loading={loading}
        emptyMessage="No categories found"
      />
      <ConfirmModal
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        title="Delete category"
		description={`Are you sure you want to delete ${selectedCategory?.name || "this category"}?`}
		confirmText='Delete category'
		onConfirm={handleDelete}
		loading={loading}
      />

      <Modal
      open={editModalOpen}
      onOpenChange={setEditModalOpen}
      title="Edit Category"
      >
        <CategoryForm 
        initialData={selectedCategory}
        schema={updateCategorySchema}
        onClose={()=> setEditModalOpen(false)}
        onSubmit={updateHandler}
        
        />
      </Modal>
    </>
  );
}

export default CategoryTable
