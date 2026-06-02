import { AppInput } from '@/shared/components/AppInput'
import { Button } from '@/shared/components/ui/button'
import { Label } from '@/shared/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { useEffect} from 'react'
import { Controller, useForm } from 'react-hook-form'
import SingleImageUploader from '@/shared/helpers/SingleImageUploader'
import { Switch } from '@/shared/components/ui/switch'
import { useSubcategoryStore } from '../store/subcategory.store'


const SubcategoryForm = ({initialData= null, schema, onSubmit, onClose}) => {
 const categories = useSubcategoryStore((state) => state.categories);
 const fetchCategories = useSubcategoryStore((state) => state.fetchCategories);
	const {register, handleSubmit, reset, watch, control, formState:{errors, isDirty, isSubmitting}}= useForm({
		resolver: yupResolver(schema),
		defaultValues:{
			name:"",
			category: "",
      image: "",
			isActive: true,
		}
	})

	useEffect(()=>{
		if(initialData && categories.length > 0){
			reset({
				name: initialData.name || "",
				category: initialData.category?._id || initialData?.category || "",
        image: initialData.image || "",
				isActive: initialData.isActive ?? true,
			})
		}
	}, [initialData, reset, categories])


   useEffect(() => {
     fetchCategories();
   }, [fetchCategories]);

	const name= watch("name")
	const isActive= watch("isActive")

	const handleCancel= ()=>{
		reset({
			name: "",
			category: "",
      image: "",
			isActive: true,
		})
		onClose?.()
	}

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex">
        <div>
          <SingleImageUploader name="image" control={control} />
          {errors?.image && (
            <p className="text-xs text-red-500">{errors.image.message}</p>
          )}
        </div>

        <div className="flex flex-row gap-10">
          <div className="flex flex-col items-start gap-2">
            <span className="rounded-full bg-amber-100 px-4 py-1 text-xs font-semibold tracking-[0.2em] text-amber-800">
              {isActive ? "ACTIVE" : "INACTIVE"}
            </span>
            <h3 className="text-xl font-bold">{name || "Subcategory"}</h3>
          </div>
          <div>
            {initialData && (
              <Controller
                name="isActive"
                control={control}
                render={({ field }) => (
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            )}
          </div>
        </div>
      </div>
      <div className="space-y-1">
        <Label>SUBCATEGORY NAME</Label>
        <AppInput {...register("name")} placeholder="Eg: Print" />
        {errors?.name && (
          <p className="text-xs text-red-500">{errors.name.message}</p>
        )}
      </div>
      <div className="space-y-1">
        <Label>CATEGORY</Label>
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="w-full rounded-sm py-5">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>

              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category._id} value={String(category._id)}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors?.category && (
          <p className="text-xs text-red-500">{errors.category.message}</p>
        )}
      </div>
      <div className="space-y-3">
        <Button
          type="Submit"
          disabled={isSubmitting || (initialData && !isDirty)}
          className="w-full"
        >
          {isSubmitting
            ? "Saving..."
            : initialData
              ? "Update Subcategory"
              : "Save Subcategory"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={handleCancel}
          className="w-full"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}

export default SubcategoryForm
