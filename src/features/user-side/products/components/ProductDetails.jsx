// src/features/products/components/ProductDetails.jsx

import { useEffect, useState } from "react";

import ProductGallery from "./ProductGallery";
import SizeSelector from "./SizeSelector";
import ColorSelector from "./ColorSelector";
import ProductActions from "./ProductActions";
import { useParams } from "react-router-dom";
import { useProductStore } from "@/features/admin-side/product-management/store/product.store";
import ProductAccordion from "./ProductAccordion";





const colors = [
  {
    value: "sky",
    hex: "#6ea6b2",
  },
  {
    value: "green",
    hex: "#5d735f",
  },
  {
    value: "teal",
    hex: "#0f4c5c",
  },
];



const ProductDetails = () => {

const {slug}= useParams()
  const fetchProductDetails= useProductStore((state)=> state.fetchProductDetails)
const productDetails= useProductStore((state)=> state.productDetails)

useEffect(()=>{
  fetchProductDetails(slug)
},[])

console.log("detailpageprodyct: ", productDetails)


  const [selectedSize, setSelectedSize] = useState("M");

  const [selectedColor, setSelectedColor] = useState("sky");

  const [isWishlisted, setIsWishlisted] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async () => {
    try {
      setIsLoading(true);

      // fake api request
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Added to cart");
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="px-4 md:px-8 lg:px-16 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* LEFT */}
        <ProductGallery coverImage={productDetails.coverImage} images={productDetails?.galleryImages}/>

        {/* RIGHT */}
        <div className="flex justify-between flex-col">
          {/* Breadcrumb */}
          <p className="text-xs tracking-widest uppercase text-neutral-400">
            {`GEEKCART / ${productDetails?.category?.name} / ${slug}`}
          </p>

          {/* Title */}
          <h1 className="text-xl md:text-3xl font-bold text-neutral-900 mt-4 leading-tight">
            {productDetails?.name}
          </h1>

          {/* Price */}
          <div className="flex items-center gap-3 mt-5">
            <span className="text-2xl font-semibold">₹{productDetails?.variants?.[0].price}</span>

            <div className="w-1 h-1 rounded-full bg-neutral-400" />

            <span className="text-sm">★ 4.8 (52 reviews)</span>
          </div>

          {/* Color Selector */}
          {/* <div className="mt-8">
            <ColorSelector
              colors={colors}
              selectedColor={selectedColor}
              onSelectColor={setSelectedColor}
            />
          </div> */}

          {/* Size Selector */}
          <div className="mt-8">
            <SizeSelector
            variants={productDetails?.variants}
              selectedSize={selectedSize}
              onSelectSize={setSelectedSize}
            />
          </div>

          {/* Actions */}
          <ProductActions
            isWishlisted={isWishlisted}
            isLoading={isLoading}
            onAddToCart={handleAddToCart}
            onWishlist={() => setIsWishlisted(!isWishlisted)}
          />

          {/* Accordion */}
          <ProductAccordion product={productDetails} />
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
