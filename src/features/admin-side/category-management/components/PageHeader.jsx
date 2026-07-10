import { Button } from "@/shared/components/ui/button";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import Modal from "@/shared/components/Modal";
import Header from "@/shared/components/Header";
import CategoryForm from "./CategoryForm";
import { addCategorySchema } from "../validations/category.validation";
import { useCategoryStore } from "../store/category.store";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";

const PageHeader = () => {
  const [openAddCategoryModal, setOpenAddCategoryModal] = useState(false);
  const { createCategory, fetchCategories, queryParams } = useCategoryStore();

  const handleStatusChange = async (value) => {
    const status = value === "all" ? "" : value;
    try {
      await fetchCategories({
        status,
        page: 1,
      });
    } catch (err) {
      toast.error(err.response?.data?.message, "Failed to filter categories");
    }
  };
  const handleSubmit = async (data) => {
    try {
      const res = await createCategory(data);
      toast.success(res.message || "Category created succes");
      setOpenAddCategoryModal(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create category");
    }
  };
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <Header title="Category Management" />

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

        <Button onClick={() => setOpenAddCategoryModal(true)}>
          <Plus size={16} />
          Add New Category
        </Button>
      </div>

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
};

export default PageHeader;
