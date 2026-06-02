import React from 'react'
import VariantRow from './VariantRow';


const VariantTable = ({
	fields= [],
	control,
	register,
	errors,
	onRemove,
}) => {
  
const variantsError = errors?.variants?.message
	if(fields.length === 0){
		return (
      <div className="rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground">
        Select a color, one or more sizes, and at least one image. then click{" "}
        <span className="font-semibold">Generate Variants</span>.
        {variantsError && (
          <p className="text-xs text-red-500">{variantsError}</p>
        )}
      </div>
    );
	}

  return (
    <div className="space-y-4">
      {fields.map((field, index) => (
        <VariantRow
          key={field.id}
          index={index}
          variant={field}
          control={control}
          register={register}
          errors={errors}
          onRemove={() => onRemove(index)}
        />
      ))}
    </div>
  );
}

export default VariantTable
