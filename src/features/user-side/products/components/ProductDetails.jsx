import { useEffect, useMemo, useState } from "react";

import ProductGallery from "./ProductGallery";

import SizeSelector from "./SizeSelector";

import ProductActions from "./ProductActions";

import ProductAccordion from "./ProductAccordion";

import { useParams } from "react-router-dom";
//import { useProductStore } from "@/features/admin-side/product-management/store/product.store";
import VariantImageSelector from "./VariantImageSelector";
import { useCartStore } from "../../cart/store/cart.store";
import { toast } from "sonner";
import Loader from "@/shared/components/Loader";
import { useUserProductStore } from "../store/product.store";

const ProductDetails = () => {
  const { slug } = useParams();

const fetchCart = useCartStore((state) => state.fetchCart);
  const fetchProductDetails = useUserProductStore(
    (state) => state.fetchProductDetails,
  );

  const fetchSimilarProducts= useUserProductStore((state)=> state.fetchSimilarProducts)
  const productLoading = useUserProductStore((state) => state.loading);
  const productDetails = useUserProductStore((state) => state.productDetails);

  const addToCart = useCartStore((state) => state.addToCart);
  const loading = useCartStore((state) => state.loading);
  const isInCart= useCartStore((state)=> state.isInCart)

  const [selectedColor, setSelectedColor] = useState("");

  const [selectedSize, setSelectedSize] = useState("");

  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    fetchProductDetails(slug);
    fetchSimilarProducts(slug);
    fetchCart();
  }, [slug]);


  // const colors = useMemo(() => {
  //   return [
  //     ...new Set(
  //       (productDetails?.variants || []).map((variant) => variant.color),
  //     ),
  //   ];
  // }, [productDetails]);

  // console.log("Colors: ", colors);

  useEffect(() => {
    if (productDetails?.variants?.length > 0) {
      const firstVariant = productDetails.variants[0];

      setSelectedColor(firstVariant.color);

      setSelectedSize(firstVariant.size);
    }
  }, [productDetails]);

  const selectedColorVariants = useMemo(() => {
    return (
      productDetails?.variants?.filter(
        (variant) => variant.color === selectedColor,
      ) || []
    );
  }, [productDetails, selectedColor]);

  const selectedImages = selectedColorVariants[0]?.images || [];

 const currentVariant =
   selectedColorVariants.find((variant) => variant.size === selectedSize) ||
   selectedColorVariants[0];

  console.log("Current Variant: ", currentVariant);
  console.log("selectedColorVariants: ", selectedColorVariants)

const existsInCart= currentVariant ? isInCart(currentVariant._id) : false


  const availableSizes = selectedColorVariants.map((variant) => ({
    size: variant.size,

    stock: variant.stock,
  }));

  const handleAddToCart = async () => {
    try {
      if (!currentVariant) {
        return;
      }

      if (currentVariant.stock === 0) {
        toast.error("Out of stock");
        return;
      }

      const res = await addToCart({
        variantId: currentVariant._id,
        quantity: 1,
      });

      toast.success(res.message || "Added to cart");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add product");
    }
  };

  if(productLoading){
  	return <Loader/>
  }
  return (
    <>
      {productDetails && (
        <section
          className="
        px-4
        py-10
        md:px-8
        lg:px-16
      "
        >
          <div
            className="
          grid
          grid-cols-1
          gap-10
          lg:grid-cols-2
        "
          >
            {/* LEFT */}
            <ProductGallery images={selectedImages} />

            {/* RIGHT */}
            <div
              className="
            flex
            flex-col
            justify-between
          "
            >
              {/* Breadcrumb */}
              <p
                className="
              text-xs
              uppercase
              tracking-widest
              text-neutral-400
            "
              >
                {`GEEKCART / ${productDetails?.category?.name} / ${productDetails?.name}-${currentVariant?.color}`}
              </p>

              {/* Title */}
              <h1
                className="
              mt-4
              text-xl
              font-bold
              leading-tight
              text-neutral-900
              md:text-3xl
            "
              >
                {`${productDetails?.name} - ${currentVariant?.color}`}
              </h1>

              {/* Price */}
              <div
                className="
              mt-5
              flex
              items-center
              gap-3
            "
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-semibold">
                    ₹{currentVariant?.salePrice || currentVariant?.price}
                  </span>

                  {currentVariant?.salePrice && (
                    <span className="text-lg text-neutral-400 line-through">
                      ₹{currentVariant?.price}
                    </span>
                  )}
                </div>

                <div
                  className="
                h-1
                w-1
                rounded-full
                bg-neutral-400
              "
                />

                <span
                  className="
                text-sm
              "
                >
                  ★ 4.8 (52 reviews)
                </span>
              </div>

              {/* COLOR */}
              <div className="mt-8">
                <VariantImageSelector
                  variants={productDetails?.variants}
                  selectedColor={selectedColor}
                  onSelectColor={(color) => {
                    setSelectedColor(color);

                    const firstSize = productDetails?.variants?.find(
                      (variant) => variant.color === color,
                    );

                    if (firstSize) {
                      setSelectedSize(firstSize.size);
                    }
                  }}
                />
              </div>

              {/* SIZE */}
              <div className="mt-8">
                <SizeSelector
                  variants={availableSizes}
                  selectedSize={selectedSize}
                  onSelectSize={setSelectedSize}
                />
              </div>

              {/* ACTIONS */}
              <ProductActions
                isWishlisted={isWishlisted}
                loading={loading}
                onAddToCart={handleAddToCart}
                onWishlist={() => setIsWishlisted(!isWishlisted)}
                existsInCart={existsInCart}
                isActive={productDetails.isActive}
                currentVariant={currentVariant}
              />

              {/* ACCORDION */}
              <ProductAccordion product={productDetails} />
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ProductDetails;
