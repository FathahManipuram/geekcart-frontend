import { yupResolver } from "@hookform/resolvers/yup";
import { addProductSchema } from "../validations/product.validation";
import { useForm } from "react-hook-form";

export const useProductForm=(initialData= null)=>{
	const defaultValues = {
    name: "",
    description: "",
    coverImage: "",
    galleryImages: [],

    manufacturer: {
      name: "",
      address: "",
      email: "",
      phone: "",
    },

    category: "",
    subcategory: "",

    // defaultAttributes: {
    //   sleeve: "",
    //   fabric: "",
    // },
    sleeve: "",
    fabric: "",

    isReturnable: true,
    returnWindowDays: 7,

    isActive: true,
    isFeatured: false,
    isLimited: false,

    selectedSizes: [],
    selectedColor: "",
    variants: [],
  };

	const mappedValues = initialData
    ? {
        ...defaultValues,
        ...initialData,

        category: initialData.category?._id || initialData.category || "",
        subcategory:
          initialData.subcategory?._id || initialData.subcategory || "",

        galleryImages: initialData.galleryImages || [],

        manufacturer: {
          ...defaultValues.manufacturer,
          ...(initialData.manufacturer || {}),
        },

        selectedSizes:
          initialData.selectedSizes ||
          initialData.variants?.map((variant) => variant.size) ||
          [],

        selectedColor:
          initialData.selectedColor || initialData.variants?.[0]?.color || "",

        variants: initialData.variants || [],
      }
    : defaultValues;
  
  
const form = useForm({
    resolver: yupResolver(
      addProductSchema
    ),
    defaultValues:
      mappedValues,
    mode: "onSubmit",
    reValidateMode:
      "onChange",
  });

  return form;
}

export default useProductForm