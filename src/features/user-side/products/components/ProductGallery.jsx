// src/features/products/components/ProductGallery.jsx

import { useEffect, useState } from "react";

import ProductZoomImage from "./ProductZoomImage";

const ProductGallery = ({ images = [], coverImage }) => {
  const [selectedImage, setSelectedImage] = useState(coverImage);

useEffect(()=>{
  setSelectedImage(coverImage||images?.[0] || "")
}, [coverImage, images])
  return (
    <div className="flex flex-col md:flex-row gap-4 lg:gap-6 items-start">
      {/* Thumbnails */}
      <div className="flex md:flex-col gap-3 order-2 md:order-1">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(image)}
            className={`overflow-hidden rounded-lg border transition-all cursor-pointer ${
              selectedImage === image
                ? "border-black ring-2 ring-black"
                : "border-transparent"
            }`}
          >
            <img
              src={image}
              alt={`thumbnail-${index}`}
              className="
  w-14 h-14
  md:w-16 md:h-16
  object-cover
"
            />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="flex-1 w-full order-1 md:order-2">
        <div className="bg-[#f3f0eb] rounded-2xl">
          <ProductZoomImage image={selectedImage} />
        </div>
      </div>
    </div>
  );
};

export default ProductGallery;
