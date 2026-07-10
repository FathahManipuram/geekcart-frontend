import { nanoid } from "nanoid";

export const generateSku = ({
  productName = "",
  index = 0,
  size = "",
  color = "",
}) => {
  const prefix = (
    productName.replace(/[^a-zA-Z0-9]/g, "").slice(0, 3) || "PRD"
  ).toUpperCase();
  const sequence = String(index + 1).padStart(3, "0");
  const sizeCode = (size || "NA").toUpperCase();
  const colorCode = (color || "NA")
    .replace(/\s+/g, "")
    .slice(0, 3)
    .toUpperCase();

  const uniqueCode = nanoid(4).toUpperCase();

  return `${prefix}-${sequence}-${sizeCode}-${colorCode}-${uniqueCode}`;
};
