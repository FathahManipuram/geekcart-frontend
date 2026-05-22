import React from 'react'
import { useProductStore } from '../store/product.store';
import { buildProductFormData } from '../utils/buildProductFormData';
import ProductForm from '../components/ProductForm';

const AddProductPage = () => {
  const createProduct = useProductStore((state) => state.createProduct);

  const handleCreateProduct = async (data) => {
    const formData = buildProductFormData(data);
    return await createProduct(formData);
  };

  return (
    <ProductForm
      onSubmitHandler={handleCreateProduct}
      submitLabel="Publish Product"
      title="Add New Product"
      description="Add a masterpiece to the MenStore collection."
    />
  );
};

export default AddProductPage
