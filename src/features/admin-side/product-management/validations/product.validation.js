import { phoneNumber } from "@/shared/validations/address.base";
import { color, costPrice, description, fabric, imageField, images, lowStockThreshold, price, productName, salePrice, size, sku, sleeve, stock } from "@/shared/validations/base.validation"
import * as yup from "yup"

const basicInformationSchema = yup.object({
  name: productName().required("Product name is required"),
  description: description().required("Description is required"),
  coverImage: imageField().required("Cover image is required"),
  galleryImages: images().min(3, "At least 3 images are required"),
  manufacturer: yup.object({
    name: yup.string().trim().required("Manufacturer name is required"),
    address: yup.string().trim().required("Manufacturer address is required"),
    email: yup
      .string()
      .trim()
      .email("Invalid email")
      .required("Manufacturer email is required"),
    phone: phoneNumber().required("Manufacturer phone is required"),
  }),
  isReturnable: yup.boolean().default(true),
  returnWindowDays: yup
    .number()
    .typeError("Return window days must be a number")
    .integer("Return window days must be a whole number")
    .min(1, "Return window days must be at least 1")
    .default(7),
});

const organizationAttributesSchema = yup.object({
  category: yup.string().trim().required("Please select a category"),
  subcategory: yup.string().trim().required("Please select a subcategory"),
  sleeve: sleeve().required("Please select a sleeve type"),
  fabric: fabric().required("Please select a fabric type"),
});

const productStatusSchema = yup.object({
  isActive: yup.boolean().default(true),
  isFeatured: yup.boolean().default(false),
  isLimited: yup.boolean().default(false),
});

const variantSchema = yup.object({
  size: size().required("Size is required"),
  color: color().required("Color is required"),
  sku: sku().required("SKU is required"),
  stock: stock().required("Stock is required"),
  price: price().required("Price is required"),
  salePrice: salePrice(),
  costPrice: costPrice(),
  lowStockThreshold: lowStockThreshold(),
  isDefault: yup.boolean().default(false),
  isActive: yup.boolean().default(true),
});


const variantMatrixSchema = yup.object({
  selectedSizes: yup
    .array()
    .of(yup.string())
    .min(1, "Select at least one size"),

  selectedColor: yup.string().trim().required("Please select a color"),

  variants: yup
    .array()
    .of(variantSchema)
    .min(1, "Generate at least one variant")
    .required("At least one variant is required"),
});


export const addProductSchema= 
basicInformationSchema
.concat(organizationAttributesSchema)
.concat(productStatusSchema)
.concat(variantMatrixSchema)



