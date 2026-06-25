import React from "react";
import { useNavigate } from "react-router-dom";

const CategoryCard = ({ image, subcategoryId, name, items }) => {
  const navigate= useNavigate()

  const handleClick= ()=>{
    navigate(`/collections?subcategory=${subcategoryId}`)
  }
  return (
    <div
      onClick={handleClick}
      className="relative overflow-hidden rounded-xl group cursor-pointer"
    >
      {/* Image */}
      <img
        src={image}
        alt={name}
        className="h-[220px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/35" />

      {/* Content */}
      <div className="absolute bottom-4 left-4 text-white">
        <h3 className="text-lg md:text-xl font-semibold">{name}</h3>

        <p className="text-xs tracking-widest opacity-80">{items}</p>
      </div>
    </div>
  );
};

export default CategoryCard;
