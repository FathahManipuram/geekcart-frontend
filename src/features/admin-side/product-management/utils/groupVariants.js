// export const groupVariants = (variants = []) => {
//   const grouped = {};

//   variants.forEach((variant) => {
//     const key = variant.color;

//     if (!grouped[key]) {
//       grouped[key] = {
//         color: variant.color,
//         sizes: [],
//         images: variant.images || [],
//         // Use fallbacks for base metrics if initialization values are empty
//         stock: variant.stock ?? 0,
//         price: variant.price ?? 0,
//         salePrice: variant.salePrice ?? "",
//         costPrice: variant.costPrice ?? "",
//       };
//     }

//     // Collect all size blocks belonging to this color identity
//     if (!grouped[key].sizes.includes(variant.size)) {
//       grouped[key].sizes.push(variant.size);
//     }
//   });

//   return Object.values(grouped);
// };
export const groupVariants = (variants = []) => {
  const grouped = {};

  variants.forEach((variant) => {
    const color = variant.color;

    /**
     * Create Group
     */
    if (!grouped[color]) {
      grouped[color] = {
        color,

        sizes: [],

        images: variant.images || [],

        /**
         * Pricing
         */
        stock: variant.stock || 0,

        price: variant.price || 0,

        salePrice: variant.salePrice || "",

        costPrice: variant.costPrice || "",
      };
    }

    /**
     * Add Size
     */
    grouped[color].sizes.push(variant.size);
  });

  return Object.values(grouped);
};