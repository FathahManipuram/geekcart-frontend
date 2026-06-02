import React from 'react'

const SubCategoryImages = ({subcategory}) => {
  return (
    <div>
      <img
        src={subcategory.image || "https://placehold.co/56x56?text=No+Image"}
        alt={subcategory.name}
        className="
          w-12
          h-12
          rounded-xl
          object-cover
        "
      />
    </div>
  );
}

export default SubCategoryImages
