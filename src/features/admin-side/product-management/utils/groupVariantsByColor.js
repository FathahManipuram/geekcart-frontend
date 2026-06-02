export const groupVariantsByColor = (variants = []) => {
  const grouped = {};

  variants.forEach((variant) => {
  
    if (!grouped[variant.color]) {
      grouped[variant.color] = {
        color: variant.color,

        images: variant.images || [],

        sizes: [],
      };
    }
	
    grouped[variant.color].sizes.push(variant.size);
  });

  return Object.values(grouped);
};
