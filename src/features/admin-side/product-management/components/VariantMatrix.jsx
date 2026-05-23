import React from 'react'
import { useFieldArray } from 'react-hook-form'
import { buildVariants } from '../utils/buildVariants'
import VariantControls from './VariantControls'
import VariantTable from './VariantTable'

const VariantMatrix = ({control, register, errors, watch, setValue, }) => {
	const {fields, replace, remove}=useFieldArray({control, name: "variants"})

const handleGenerateVariants =()=>{
	const selectedSizes= watch("selectedSizes") || []
	const selectedColor= watch("selectedColor") || ""

	const productName= watch("name") || ""
	// const sleeve= watch("defaultAttributes.sleeve") || ""
	// const fabric= watch("defaultAttributes.fabric") || ""

	if(selectedSizes.length === 0 || !selectedColor) return

	const variants= 
	buildVariants({
		sizes: selectedSizes,
		color: selectedColor,
		productName,
		// sleeve,
		// fabric,
	})

	replace(variants)
}

  return (
    <div className="rounded-lg border bg-white p-8 space-y-8">
     <VariantControls
	 control={control}
	 watch={watch}
	 setValue={setValue}
	 onGenerate={handleGenerateVariants}
	 errors={errors}
	 />

	 <VariantTable
	 fields={fields}
	 control={control}
	 register={register}
	 errors={errors}
	 onRemove={remove}
	 />
    </div>
  );
}

export default VariantMatrix
