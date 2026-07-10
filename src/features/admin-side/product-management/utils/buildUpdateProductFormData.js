export const buildUpdateProductFormData = (data) => {
  const formData = new FormData();

  if (data.name !== undefined) {
    formData.append("name", data.name?.trim());
  }

  if (data.description !== undefined) {
    formData.append("description", data.description);
  }

  if (data.coverImage !== undefined) {
    if (data.coverImage instanceof File) {
      formData.append("coverImage", data.coverImage);
    } else if (typeof data.coverImage === "string") {
      formData.append("existingCoverImage", data.coverImage);
    }
  }

  if (data.category !== undefined) {
    formData.append("category", data.category);
  }

  if (data.subcategory !== undefined) {
    formData.append("subcategory", data.subcategory);
  }

  if (data.sleeve !== undefined) {
    formData.append("sleeve", data.sleeve || "");
  }

  if (data.fabric !== undefined) {
    formData.append("fabric", data.fabric || "");
  }

  if (data.manufacturer !== undefined) {
    formData.append("manufacturer", JSON.stringify(data.manufacturer));
  }

  if (data.isReturnable !== undefined) {
    formData.append("isReturnable", String(data.isReturnable));
  }

  if (data.returnWindowDays !== undefined) {
    formData.append("returnWindowDays", String(data.returnWindowDays));
  }

  if (data.isActive !== undefined) {
    formData.append("isActive", String(data.isActive));
  }

  if (data.isFeatured !== undefined) {
    formData.append("isFeatured", String(data.isFeatured));
  }

  if (data.isLimited !== undefined) {
    formData.append("isLimited", String(data.isLimited));
  }

  if (data.variantGroups !== undefined) {
    const sanitizedGroups = data.variantGroups.map((group, groupIndex) => {
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
    });

    formData.append("variantGroups", JSON.stringify(sanitizedGroups));
  }

  if (data.variants !== undefined) {
    const sanitizedVariants = data.variants.map((variant) => ({
      ...variant,

      images: (variant.images || []).filter(
        (image) => typeof image === "string",
      ),
    }));

    formData.append("variants", JSON.stringify(sanitizedVariants));
  }

  return formData;
};
