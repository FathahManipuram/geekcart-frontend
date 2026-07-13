import { useEffect, useMemo, useState } from "react";
import ProductGallery from "./ProductGallery";
import SizeSelector from "./SizeSelector";
import ProductActions from "./ProductActions";
import ProductAccordion from "./ProductAccordion";
import { useParams, useSearchParams } from "react-router-dom";
import VariantImageSelector from "./VariantImageSelector";
import { useCartStore } from "../../cart/store/cart.store";
import { toast } from "sonner";
import Loader from "@/shared/components/Loader";
import { useUserProductStore } from "../store/product.store";
import Breadcrumbs from "@/shared/components/Breadcrumbs";
import { useWishlist } from "../../wishlist/hooks/useWishlist";
import { formatCurrency } from "@/shared/utils/formatCurrency";
import ProductNotFound from "./ProductNotFound";

const ProductDetails = () => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const { isWishlisted, handleWishlist } = useWishlist();

  const variantId = searchParams.get("variant");

  const fetchCart = useCartStore((state) => state.fetchCart);
  const fetchProductDetails = useUserProductStore(
    (state) => state.fetchProductDetails,
  );

  const fetchSimilarProducts = useUserProductStore(
    (state) => state.fetchSimilarProducts,
  );
  const productLoading = useUserProductStore((state) => state.loading);
  const productDetails = useUserProductStore((state) => state.productDetails);
  const error= useUserProductStore((state)=> state.error)

  const addToCart = useCartStore((state) => state.addToCart);
  const loading = useCartStore((state) => state.loading);
  const isInCart = useCartStore((state) => state.isInCart);

  const [selectedColor, setSelectedColor] = useState("");

  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    fetchProductDetails(slug);
    fetchSimilarProducts(slug);
    fetchCart();
  }, [slug]);


  useEffect(() => {
    if (!productDetails?.variants?.length) return;

    if (variantId) {
      const selectedVariant = productDetails.variants.find(
        (variant) => variant._id === variantId,
      );

      if (selectedVariant) {
        setSelectedColor(selectedVariant.color);
        setSelectedSize(selectedVariant.size);
        return;
      }
    }

    const firstVariant = productDetails.variants[0];

    setSelectedColor(firstVariant.color);
    setSelectedSize(firstVariant.size);
  }, [productDetails, variantId]);

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

  const existsInCart = currentVariant ? isInCart(currentVariant?._id) : false;

  const availableSizes = selectedColorVariants.map((variant) => ({
    size: variant.size,

    stock: variant.stock,
  }));

  const isUnavailable =
    !productDetails?.isActive ||
    currentVariant?.isActive === false ||
    currentVariant?.isDeleted === true;

  const isOutOfStock = currentVariant?.stock === 0;

  const handleAddToCart = async () => {
    try {
      if (!currentVariant) return;

      if (isUnavailable) {
        toast.error("Item unavailable");
        return;
      }

      if (isOutOfStock) {
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

  const discountPercentage = currentVariant?.salePrice
    ? Math.round(
        ((currentVariant?.price - currentVariant?.salePrice) /
          currentVariant?.price) *
          100,
      )
    : 0;

  if (productLoading) {
    return <Loader />;
  }

 if (error === "Product not found") {
   return <ProductNotFound />;
 }
  return (
    <>
      {productDetails && (
        <section className="px-4 py-10 md:px-8 lg:px-16">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            {/* LEFT */}
            <ProductGallery images={selectedImages} />

            {/* RIGHT */}
            <div className="flex flex-col justify-between">
              {/* Breadcrumb */}
              <Breadcrumbs
                items={[
                  {
                    label: "GEEKCART",
                    link: "/",
                  },
                  {
                    label: "Collections",
                    link: "/collections",
                  },
                  {
                    label: productDetails.category?.name,
                    link: `/collections?category=${productDetails.category?._id}`,
                  },
                  {
                    label: productDetails.name,
                  },
                ]}
              />

              {/* Title */}
              <h1 className="mt-4 text-xl leading-tight font-bold text-neutral-900 md:text-3xl">
                {`${productDetails?.name || ""} - ${currentVariant?.color || ""}`}
              </h1>

              {/* Price */}
              <div className="mt-5 flex items-center gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-semibold">
                    ₹
                    {formatCurrency(
                      currentVariant?.salePrice || currentVariant?.price,
                    )}
                  </span>
                </div>

                {currentVariant?.salePrice < currentVariant?.price && (
                  <>
                    <span className="text-lg text-neutral-400 line-through">
                      ₹{formatCurrency(currentVariant?.price)}
                    </span>

                    <span className="text-xs font-medium text-green-600">
                      {discountPercentage}% OFF
                    </span>
                  </>
                )}
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

              {/* STOCK STATUS */}
              <div className="mt-4">
                {isUnavailable ? (
                  <p className="text-sm font-medium text-red-600">
                    Item unavailable
                  </p>
                ) : isOutOfStock ? (
                  <p className="text-sm font-medium text-red-600">
                    Out of stock
                  </p>
                ) : currentVariant?.stock <= 5 ? (
                  <p className="text-sm font-medium text-orange-500">
                    {currentVariant.stock === 1
                      ? "Last item remaining"
                      : `Only ${currentVariant.stock} left`}
                  </p>
                ) : (
                  <p className="text-sm font-medium text-green-600">In stock</p>
                )}
              </div>

              {/* ACTIONS */}
              <ProductActions
                isWishlisted={isWishlisted(currentVariant?._id)}
                loading={loading}
                onAddToCart={handleAddToCart}
                onWishlist={() =>
                  handleWishlist(productDetails._id, currentVariant?._id)
                }
                existsInCart={existsInCart}
                isUnavailable={isUnavailable}
                isOutOfStock={isOutOfStock}
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
