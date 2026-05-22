import React from 'react'

const GalleryImages = ({product}) => {
  return (
    <div
      className="
        rounded-xl
        border
        bg-white
		flex gap-2
		justify-between
		mt-8
		overflow-scroll

      "
    >
      {product.galleryImages.map((image) => (
        <img
          src={image}
          alt="galleryImage"
          className="
          w-50
          object-contain
        "
        />
      ))}
    </div>
  );
}

export default GalleryImages
