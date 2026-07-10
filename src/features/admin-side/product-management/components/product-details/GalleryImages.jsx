import React from "react";

const GalleryImages = ({ product }) => {
  return (
    <div className="mt-8 flex justify-between gap-2 overflow-scroll rounded-xl border bg-white">
      {(product?.galleryImages || []).map((image) => (
        <img src={image} alt="galleryImage" className="w-50 object-contain" />
      ))}
    </div>
  );
};

export default GalleryImages;
