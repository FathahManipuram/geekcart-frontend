import React, { useEffect } from 'react'
import { useCategoryStore } from '../../category-management/store/category.store'
import { useSubcategoryStore } from '../../subcategory-management/store/subcategory.store'
import { toast } from 'sonner'
import { FABRIC_OPTIONS, SLEEVE_OPTIONS } from '../constants/productOption'
import useProductForm from '../hooks/useProductForm'
import { Button } from '@/shared/components/ui/button'
import BasicInformation from './BasicInformation'
import OrganizationAttributes from './OrganizationAttributes'
import ProductStatusPanel from './ProductStatusPanel'
import VariantMatrix from './VariantMatrix'
import { useNavigate } from 'react-router-dom'
import { getDirtyValues } from '../utils/getDirtyValues'

const ProductForm = ({initialData= null, onSubmitHandler, submitLabel="Save product", title= "Product Form", description="",}) => {
const navigate= useNavigate()
	const fetchCategories= useCategoryStore((state)=> state.fetchCategories)
	const categories= useCategoryStore((state)=> state.categories)
	
		const fetchSubcategories= useSubcategoryStore((state)=> state.fetchSubcategories)
		const subcategories= useSubcategoryStore((state)=> state.subcategories)

		const {control, register, handleSubmit, watch, reset, setValue, formState:{errors, isSubmitting, isDirty, dirtyFields}}= useProductForm(initialData)
	
	
	useEffect(() => {
	  fetchCategories();
	  fetchSubcategories();
	}, [fetchCategories, fetchSubcategories]);
	

	 const onSubmit = async (data) => {
     try {
 
     const finalData = initialData ? getDirtyValues(dirtyFields, data) : data;

console.log("FINAL FORM DATA:", finalData);

       await onSubmitHandler(finalData);

       toast.success(
         initialData
           ? "Product updated successfully"
           : "Product created successfully",
       );

       if (!initialData) {
         reset();
       }else{
		navigate("/admin/products")
	   }
     } catch (err) {
       toast.error(err.response?.data?.message || "Something went wrong");
     }
   };



  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

      <div
        className="
          flex
          flex-col
          gap-4
          lg:flex-row
          lg:items-start
          lg:justify-between
        "
      >
        <div>
          <h1
            className="
              text-4xl
              font-bold
              tracking-tight
            "
          >
            {title}
          </h1>

          <p
            className="
              mt-2
              text-muted-foreground
            "
          >
            {description}
          </p>
        </div>

        {/* Actions */}
        <div
          className="
            flex
            items-center
            gap-4
          "
        >
          <Button
            type="button"
            variant="outline"
            onClick={()=> navigate(-1)}
            disabled={isSubmitting}
          >
            Discard
          </Button>

          <Button type="submit" disabled={isSubmitting || !isDirty}>
            {isSubmitting ? "Saving..." : submitLabel}
          </Button>
        </div>
      </div>

      {/* Basic Information */}
      <BasicInformation control={control} errors={errors} register={register} watch={watch}/>

      {/* Organization */}
      <OrganizationAttributes
        control={control}
        errors={errors}
        watch={watch}
        setValue={setValue}
        categories={categories}
        subcategories={subcategories}
        sleeveOptions={SLEEVE_OPTIONS}
        fabricOptions={FABRIC_OPTIONS}
      />

      {/* Status */}
      <ProductStatusPanel control={control} />

      {/* Variants */}
      <VariantMatrix
        control={control}
        register={register}
        watch={watch}
        setValue={setValue}
        errors={errors}
      />
    </form>
  );
}

export default ProductForm
