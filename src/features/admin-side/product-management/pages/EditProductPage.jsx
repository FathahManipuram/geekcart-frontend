import React from "react";
import { useParams } from "react-router-dom";
import { useProductStore } from "../store/product.store";
import ProductForm from "../components/ProductForm";
import { buildUpdateProductFormData } from "../utils/buildUpdateProductFormData";

const EditProductPage = () => {
  const productDetails = useProductStore((state) => state.productDetails);
  const { productId } = useParams();

  const loading = useProductStore((state) => state.loading);

  const updateProduct = useProductStore((state) => state.updateProduct);

  const handleUpdateProduct = async (data) => {
    const formData = buildUpdateProductFormData(data);

    return await updateProduct(productId, formData);
  };

  if (loading || !productDetails) {
    return (
      <div className="rounded-lg border bg-white p-10 text-center">
        Loading product...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ProductForm
        initialData={productDetails}
        onSubmitHandler={handleUpdateProduct}
        submitLabel="Update Product"
        title="Edit Product"
        description="Update and refine your product information."
      />
    </div>
  );
};

export default EditProductPage;
