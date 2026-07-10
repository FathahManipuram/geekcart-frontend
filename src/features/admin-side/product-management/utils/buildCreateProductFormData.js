export const buildCreateProductFormData = (data) => {
  const formData = new FormData();

  formData.append("name", data.name?.trim());

  formData.append("description", data.description);

  if (data.coverImage instanceof File) {
    formData.append("coverImage", data.coverImage);
  }

  formData.append("category", data.category);

  formData.append("subcategory", data.subcategory);

  formData.append("sleeve", data.sleeve || "");

  formData.append("fabric", data.fabric || "");

  formData.append("manufacturer", JSON.stringify(data.manufacturer || {}));

  formData.append("isReturnable", String(data.isReturnable));

  formData.append("returnWindowDays", String(data.returnWindowDays));

  formData.append("isActive", String(data.isActive));

  formData.append("isFeatured", String(data.isFeatured));

  formData.append("isLimited", String(data.isLimited));

  const sanitizedGroups = (data.variantGroups || []).map(
    (group, groupIndex) => {
      const existingImages = [];

      (group.images || []).forEach((image) => {
        if (typeof image === "string") {
          existingImages.push(image);
        } else if (image instanceof File) {
          formData.append(`variantGroupImages_${groupIndex}[]`, image);
        }
      });

      return {
        color: group.color,

        sizes: group.sizes,

        images: existingImages,
      };
    },
  );

  formData.append("variantGroups", JSON.stringify(sanitizedGroups));

  const sanitizedVariants = (data.variants || []).map((variant) => ({
    ...variant,

    images: (variant.images || []).filter((image) => typeof image === "string"),
  }));

  formData.append("variants", JSON.stringify(sanitizedVariants));

  return formData;
};
