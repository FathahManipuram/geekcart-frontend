import React from 'react'
import { useProductStore } from '../store/product.store';
import ProductForm from '../components/ProductForm';
import { buildCreateProductFormData } from '../utils/buildCreateProductFormData';
import { useNavigate } from 'react-router-dom';

const AddProductPage = () => {
  const navigate = useNavigate()
  const createProduct = useProductStore((state) => state.createProduct);

  const handleCreateProduct = async (data) => {
    
    const formData = buildCreateProductFormData(data);
    await createProduct(formData);
    return navigate("/admin/products");
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
