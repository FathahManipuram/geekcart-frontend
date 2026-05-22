import { AppInput } from '@/shared/components/AppInput';
import { Button } from '@/shared/components/ui/button';
import { Label } from '@/shared/components/ui/label';
import { Switch } from '@/shared/components/ui/switch';
import MultipleImageUploader from '@/shared/helpers/MultipleImageUploader';
import { Trash2 } from 'lucide-react';
import React from 'react'
import { Controller } from 'react-hook-form';

const VariantRow = ({
	index,
	variant,
	control,
	register,
	errors,
	onRemove,
}) => {


  return (
    <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 rounded-xl border p-4">
      <div>
        <Label>VARIANT</Label>
        <p className="mt-3 font-semibold">
          {variant.size} / {variant.color}
        </p>
      </div>

      <div>
        <Label>SKU</Label>
        <AppInput value={variant.sku} readOnly className="mt-2 bg-muted" />
      </div>

      <div>
        <Label>STOCK</Label>
        <AppInput
          type="number"
          min="0"
          {...register(`variants.${index}.stock`, {
            valueAsNumber: true,
          })}
          className="mt-2"
        />
        {errors?.variants?.[index]?.stock && (
          <p className="mt-1 text-xs text-red-500">
            {errors.variants[index].stock.message}
          </p>
        )}
      </div>

      <div>
        <Label>Price</Label>
        <AppInput
          type="number"
          min="0"
          step="0.01"
          {...register(`variants.${index}.price`, { valueAsNumber: true })}
          className="mt-2"
        />
        {errors?.variants?.[index]?.price && (
          <p className="mt-1 text-xs text-red-500">
            {errors.variants[index].price.message}
          </p>
        )}
      </div>

      <div>
        <Label>ACTIVE</Label>
        <div className="mt-4">
          <Controller
            name={`variants.${index}.isActive`}
            control={control}
            render={({ field }) => (
              <Switch
                checked={field.value ?? true}
                onCheckedChange={field.onChange}
              />
            )}
          />
        </div>
      </div>

      <div className="lg:col-span-2 flex items-end justify-end">
        <Button
          type="button"
          variant="outline"
          onClick={onRemove}
          className="gap-2 text-red-600"
        >
          <Trash2 size={16} />
          Remove
        </Button>
      </div>
    </div>
  );
}

export default VariantRow
