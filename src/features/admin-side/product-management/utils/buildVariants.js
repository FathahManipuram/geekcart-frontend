import { generateSku } from "./generateSku";

export const buildVariants = ({
  sizes = [],
  color = "",
  productName = "",
  // sleeve = "",
  // fabric = "",
}) => {
  return sizes.map((size, index) => ({
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
    // sleeve,
    // fabric,
    isDefault: index === 0,
    isActive: true,
  }));
};
