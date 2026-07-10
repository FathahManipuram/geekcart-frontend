import Header from "@/shared/components/Header";
import { Button } from "@/shared/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import { useSubcategoryStore } from "../store/subcategory.store";
import { toast } from "sonner";
import Modal from "@/shared/components/Modal";
import SubcategoryForm from "./SubcategoryForm";
import { createSubcategorySchema } from "../validations/subcategory.validation";

const SubcategoryHeader = () => {
  const [openCreateSubcategoryModal, setOpenCreateSubcategoryModal] =
    useState(false);
  const { createSubcategory, fetchSubcategories, queryParams } =
    useSubcategoryStore();

  const handleStatusChange = async (value) => {
    const status = value === "all" ? "" : value;
    await fetchSubcategories({
      status,
      page: 1,
    });
  };

  const handleSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("category", data.category);
      formData.append("isActive", data.isActive);

      if (data.image instanceof File) {
        formData.append("image", data.image);
      }

      const res = await createSubcategory(formData);
      toast.success(res.message || "Subcategory added");
      setOpenCreateSubcategoryModal(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Subcategory creation failed");
    }
  };
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <Header title="Subcategory Management" />

      <div className="flex items-center gap-4">
        <Select
          value={queryParams.status || "all"}
          onValueChange={handleStatusChange}
        >
          <SelectTrigger className="w-45">
            <SelectValue placeholder="All status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>

        <Button onClick={() => setOpenCreateSubcategoryModal(true)}>
          <Plus size={16} />
          Add New Subategory
        </Button>
      </div>

      <Modal
        open={openCreateSubcategoryModal}
        onOpenChange={setOpenCreateSubcategoryModal}
        title="Add New Subcategory"
      >
        <SubcategoryForm
          onSubmit={handleSubmit}
          onClose={() => setOpenCreateSubcategoryModal(false)}
          schema={createSubcategorySchema}
        />
      </Modal>
    </div>
  );
};

export default SubcategoryHeader;
