import { useEffect, useState } from "react";
import ProductZoomImage from "./ProductZoomImage";

const ProductGallery = ({ images = [], coverImage }) => {
  const [selectedImage, setSelectedImage] = useState(coverImage);

  useEffect(() => {
    setSelectedImage(coverImage || images?.[0] || "");
  }, [coverImage, images]);
  return (
    <div className="flex flex-col items-start gap-4 md:flex-row lg:gap-6">
      {/* Thumbnails */}
      <div className="order-2 flex gap-3 md:order-1 md:flex-col">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(image)}
            className={`cursor-pointer overflow-hidden rounded-lg border transition-all ${
              selectedImage === image
                ? "border-black ring-2 ring-black"
                : "border-transparent"
            }`}
          >
            <img
              src={image}
              alt={`thumbnail-${index}`}
              className="h-14 w-14 object-cover md:h-16 md:w-16"
            />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="order-1 w-full flex-1 md:order-2">
        <div className="rounded-2xl bg-[#f3f0eb]">
          <ProductZoomImage image={selectedImage} />
        </div>
      </div>
    </div>
  );
};

export default ProductGallery;
