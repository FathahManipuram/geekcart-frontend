import { generateSku } from "./generateSku";

export const buildVariants = ({
  productName = "",
  color = "",
  sizes = [],
  images = [],
  existingVariants = [],
}) => {
  return sizes.map((size, index) => {
    
    const existingVariant = existingVariants.find(
      (variant) => variant.color === color && variant.size === size,
    );

  
    // if (existingVariant) {
    //   return {
    //     ...existingVariant,

    //     images: existingVariant.images || images,
    //   };
    // }




if (existingVariant) {
  return {
    ...existingVariant,
    // FIX: Prioritize the incoming group images if they exist and are not empty.
    // Otherwise, fall back to the variant's existing images.
    images: images && images.length > 0 ? images : existingVariant.images || [],
  };
}
   
    return {
      size,

      color,

      sku: generateSku({
        productName,

        index,

        size,

        color,
      }),

      stock: 0,

      price: 0,

      salePrice: "",

      costPrice: "",

      lowStockThreshold: 5,

      images,

      isDefault: index === 0,

      isActive: true,
    };
  });
};