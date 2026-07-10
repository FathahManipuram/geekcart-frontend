import DataTable from "@/shared/components/DataTable";
import { formatTitleCase } from "@/shared/utils/formatTitleCase";
import React, { useState } from "react";
import SubCategoryImages from "./SubCategoryImages";
import { Pencil, Trash2 } from "lucide-react";
import { useSubcategoryStore } from "../store/subcategory.store";
import { toast } from "sonner";
import SubcategoryForm from "./SubcategoryForm";
import { updateSubcategorySchema } from "../validations/subcategory.validation";
import Modal from "@/shared/components/Modal";
import ConfirmModal from "@/shared/components/ConfirmModal";
import { Button } from "@/shared/components/ui/button";
import StatusBadge from "@/shared/components/StatusBadge";

const SubcategoryTable = ({ subcategories, loading }) => {
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const { updateSubcategory, deleteSubcategory } = useSubcategoryStore();

  const columns = [
    {
      header: "PREVIEW",
      cell: (subcategory) => <SubCategoryImages subcategory={subcategory} />,
    },
    {
      header: "SUBCATEGORY",
      cell: (subcategory) => (
        <span className="font-semibold">
          {formatTitleCase(subcategory.name)}
        </span>
      ),
    },
    {
      header: "CATEGORY",
      cell: (subcategory) => (
        <span>{formatTitleCase(subcategory.category?.name || "N/A")}</span>
      ),
    },
    {
      header: "PRODUCTS",
      cell: (subcategory) => <span>{subcategory.productCount}</span>,
    },
    {
      header: "STATUS",
      cell: (subcategory) => (
        <StatusBadge status={subcategory?.isActive ? "active" : "inactive"} />
      ),
    },
    {
      header: "ACTIONS",
      cell: (subcategory) => (
        <div className="flex items-center gap-3">
          {/* EDIT */}
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              setSelectedSubcategory(subcategory);
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
            onClick={() => {
              setSelectedSubcategory(subcategory);
              setDeleteModalOpen(true);
            }}
            className="text-red-500 hover:bg-red-50 hover:text-red-600"
            disabled={loading}
          >
            <Trash2 size={15} />
          </Button>
        </div>
      ),
    },
  ];

  const updateHandler = async (data) => {
    if (!selectedSubcategory) return;

    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("category", data.category);
      formData.append("isActive", String(data.isActive));

      if (data.image instanceof File) {
        formData.append("image", data.image);
      }

      const res = await updateSubcategory(selectedSubcategory._id, formData);

      toast.success(res.message || "Subcategory updated successfully");
      setEditModalOpen(false);
      setSelectedSubcategory(null);
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    }
  };

  const deleteHandler = async () => {
    if (!selectedSubcategory) return;
    try {
      const res = await deleteSubcategory(selectedSubcategory._id);
      toast.success(res.message || "Subcategory deleted successfully");
      setDeleteModalOpen(false);
      setSelectedSubcategory(null);
    } catch (err) {
      toast.error(err.response?.data?.message || "Subcategory deletion failed");
    }
  };

  return (
    <>
      <DataTable
        columns={columns}
        data={subcategories}
        loading={loading}
        emptyMessage="No subcategories found"
      />

      <Modal
        open={editModalOpen}
        onOpenChange={setEditModalOpen}
        title="Update Subcategory"
      >
        <SubcategoryForm
          initialData={selectedSubcategory}
          onSubmit={updateHandler}
          schema={updateSubcategorySchema}
          onClose={() => setEditModalOpen(false)}
        />
      </Modal>

      <ConfirmModal
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        title="Delete subcategory"
        description={`Are you sure you want to delete ${selectedSubcategory?.name || "this subcategory"}?`}
        confirmText="Delete subcategory"
        onConfirm={deleteHandler}
        loading={loading}
      />
    </>
  );
};

export default SubcategoryTable;
