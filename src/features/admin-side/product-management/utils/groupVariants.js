export const groupVariants = (variants = []) => {
  const grouped = {};

  variants.forEach((variant) => {
    const color = variant.color;

    //Create Group

    if (!grouped[color]) {
      grouped[color] = {
        color,

        sizes: [],

        images: variant.images || [],

        // Pricing

        stock: variant.stock || 0,

        price: variant.price || 0,

        salePrice: variant.salePrice || "",

        costPrice: variant.costPrice || "",
      };
    }

    // Add Size

    grouped[color].sizes.push(variant.size);
  });

  return Object.values(grouped);
};
