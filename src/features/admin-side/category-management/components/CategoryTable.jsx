import ConfirmModal from "@/shared/components/ConfirmModal";
import DataTable from "@/shared/components/DataTable";
import { formatTitleCase } from "@/shared/utils/formatTitleCase";
import { Pencil, Trash2 } from "lucide-react";
import React, { useState } from "react";
import CategoryForm from "./CategoryForm";
import { updateCategorySchema } from "../validations/category.validation";
import Modal from "@/shared/components/Modal";
import { useCategoryStore } from "../store/category.store";
import { toast } from "sonner";
import { Button } from "@/shared/components/ui/button";
import StatusBadge from "@/shared/components/StatusBadge";

const CategoryTable = ({ categories, loading, currentPage, perPage }) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const { updateCategory, deleteCategory } = useCategoryStore();

  const updateHandler = async (data) => {
    if (!selectedCategory) return;
    try {
      const res = await updateCategory(selectedCategory._id, data);
      toast.success(res.message || "Updated successfully");
      setEditModalOpen(false);
      setSelectedCategory(null);
    } catch (err) {
      toast.error(err.message || "Updation failed");
    }
  };

  const handleDelete = async () => {
    if (!selectedCategory) return;
    try {
      const res = await deleteCategory(selectedCategory._id);
      toast.success(res.message || "Category deleted successfully");
      setDeleteModalOpen(false);
      setSelectedCategory(null);
    } catch (err) {
      toast.error(err.response?.data?.message || "Delete failed");
    }
  };

  const openDeleteModal = (category) => {
    setSelectedCategory(category);
    setDeleteModalOpen(true);
  };

  const columns = [
    {
      header: "SL. NO",
      cell: (_, index) => (
        <span className="font-semibold">
          {(currentPage - 1) * perPage + index + 1}
        </span>
      ),
    },

    {
      header: "CATEGORY NAME",
      cell: (category) => (
        <span className="font-semibold">{formatTitleCase(category?.name)}</span>
      ),
    },

    {
      header: "SUBCATEGORIES",
      cell: (category) => category?.subcategoryCount,
    },

    {
      header: "PRODUCTS",
      cell: (category) => category?.productCount,
    },

    {
      header: "STATUS",
      cell: (category) => (
        <StatusBadge status={category?.isActive ? "active" : "inactive"} />
      ),
    },

    {
      header: "ACTIONS",
      cell: (category) => (
        <div className="flex items-center gap-3">
          {/* EDIT */}
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              setSelectedCategory(category);
              setEditModalOpen(true);
            }}
            disabled={loading}
          >
            <Pencil size={15} />
          </Button>

          {/* DELETE */}
          <Button
            variant="outline"
            size="icon"
            onClick={() => openDeleteModal(category)}
            className="text-red-500 hover:bg-red-50 hover:text-red-600"
            disabled={loading}
          >
            <Trash2 size={15} />
          </Button>
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
        confirmText="Delete category"
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
          onClose={() => setEditModalOpen(false)}
          onSubmit={updateHandler}
        />
      </Modal>
    </>
  );
};

export default CategoryTable;
