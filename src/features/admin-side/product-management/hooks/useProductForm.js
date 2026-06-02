import { yupResolver } from "@hookform/resolvers/yup";
import { addProductSchema } from "../validations/product.validation";
import { useForm } from "react-hook-form";
import { groupVariants } from "../utils/groupVariants";

const useProductForm=(initialData= null)=>{
	const defaultValues = {
    name: "",
    description: "",
    coverImage: "",

    manufacturer: {
      name: "",
      address: "",
      email: "",
      phone: "",
    },

    category: "",
    subcategory: "",

    sleeve: "",
    fabric: "",

    isReturnable: true,
    returnWindowDays: 7,

    isActive: true,
    isFeatured: false,
    isLimited: false,

    variantGroups: [
      {
        color: "",

        sizes: [],

        images: [],

      },
    ],

    variants: [],
  };

	const mappedValues = initialData
    ? {
        ...defaultValues,
        ...initialData,

        category: initialData.category?._id || initialData.category || "",
        subcategory:
          initialData.subcategory?._id || initialData.subcategory || "",

        manufacturer: {
          ...defaultValues.manufacturer,
          ...(initialData.manufacturer || {}),
        },


        coverImage:
  initialData.coverImage || "",

        variantGroups: initialData?.variants
          ? groupVariants(initialData.variants)
          : [
              {
                color: "",

                sizes: [],

                images: [],
              },
            ],

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