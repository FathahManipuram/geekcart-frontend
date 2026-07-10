import React from "react";
import { useFieldArray } from "react-hook-form";
import { Button } from "@/shared/components/ui/button";
import VariantGroupCard from "./VariantGroupCard";
import VariantTable from "./VariantTable";
import { buildVariants } from "../utils/buildVariants";

const VariantMatrix = ({ control, register, errors, watch, setValue }) => {
  const { fields: groupFields, append } = useFieldArray({
    control,
    name: "variantGroups",
  });

  const handleRemoveVariant = (removeIndex) => {
    const currentVariants = watch("variants") || [];
    const removedVariant = currentVariants[removeIndex];
    const updatedVariants = currentVariants.filter(
      (_, index) => index !== removeIndex,
    );

    setValue("variants", updatedVariants, {
      shouldDirty: true,
    });

    const currentGroups = watch("variantGroups") || [];

    const updatedGroups = currentGroups
      .map((group) => {
        if (group.color !== removedVariant.color) {
          return group;
        }

        const updatedSizes = group.sizes.filter(
          (size) => size !== removedVariant.size,
        );

        return {
          ...group,
          sizes: updatedSizes,
        };
      })

      .filter((group) => group.sizes.length > 0);

    /**
     * Save Groups
     */
    setValue("variantGroups", updatedGroups, {
      shouldDirty: true,
    });
  };

  const handleRemoveGroup = (groupIndex) => {
    const currentGroups = watch("variantGroups") || [];

    const removedGroup = currentGroups[groupIndex];

    const updatedGroups = currentGroups.filter(
      (_, index) => index !== groupIndex,
    );

    setValue("variantGroups", updatedGroups, {
      shouldDirty: true,
    });

    const currentVariants = watch("variants") || [];

    // Remove Related Variants

    const updatedVariants = currentVariants.filter(
      (variant) => variant.color !== removedGroup.color,
    );

    setValue("variants", updatedVariants, {
      shouldDirty: true,
    });
  };

  // Generate Final Variants

  const handleGenerateVariants = () => {
    const groups = watch("variantGroups") || [];

    const existingVariants = watch("variants") || [];
    const productName = watch("name") || "";

    let finalVariants = [];

    groups.forEach((group) => {
      if (!group.color || !group.sizes?.length) {
        return;
      }

      const generatedVariants = buildVariants({
        productName,
        color: group.color,
        sizes: group.sizes,
        images: group.images,
        existingVariants: watch("variants") || [],
      });

      const mergedVariants = generatedVariants.map((generatedVariant) => {
        const existingVariant = existingVariants.find(
          (existing) =>
            existing.color === generatedVariant.color &&
            existing.size === generatedVariant.size,
        );

        if (existingVariant) {
          return {
            ...generatedVariant,

            stock: existingVariant.stock,

            price: existingVariant.price,

            costPrice: existingVariant.costPrice,

            lowStockThreshold: existingVariant.lowStockThreshold,

            isActive: existingVariant.isActive,

            isDefault: existingVariant.isDefault,

            images: generatedVariant.images || existingVariant.images,
          };
        }

        return generatedVariant;
      });

      finalVariants = [...finalVariants, ...mergedVariants];
    });

    setValue("variants", finalVariants, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const variants = watch("variants") || [];
  const variantGroups = watch("variantGroups") || [];
  const canGenerate =
    variantGroups.length > 0 &&
    variantGroups.every(
      (group) =>
        group.color && group.sizes?.length > 0 && group.images?.length > 0,
    );
  return (
    <div className="space-y-8 rounded-xl border bg-white p-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Variant Groups</h2>

        <Button
          type="button"
          onClick={() =>
            append({
              color: "",
              sizes: [],
              images: [],
            })
          }
        >
          Add Variant Group
        </Button>
      </div>

      {/* Variant Groups */}
      <div className="space-y-6">
        {groupFields.map((group, index) => (
          <VariantGroupCard
            key={group.id}
            index={index}
            control={control}
            watch={watch}
            setValue={setValue}
            register={register}
            errors={errors}
            onRemove={() => handleRemoveGroup(index)}
          />
        ))}
      </div>

      {/* Generate Variants */}
      <div>
        <Button
          type="button"
          onClick={handleGenerateVariants}
          disabled={!canGenerate}
        >
          Generate Variants
        </Button>
      </div>

      {/* Final Variants */}
      <VariantTable
        fields={variants}
        control={control}
        register={register}
        errors={errors}
        onRemove={handleRemoveVariant}
      />
    </div>
  );
};

export default VariantMatrix;
