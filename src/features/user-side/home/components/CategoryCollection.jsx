import React, { useEffect } from "react";
import CategoryCard from "./CategoryCard";

const CategoryCollection = ({ subcategories }) => {
  useEffect(() => {});
  return (
    <section className="px-4 py-10 md:px-8 lg:px-12">
      {/* Heading */}
      <div className="mb-6">
        <h2 className="mt-2 text-4xl font-bold"> Curated Categories</h2>

        <div className="bg-primary mt-2 h-[3px] w-18" />
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
        {(subcategories || []).map((subcategory) => (
          <CategoryCard
            key={subcategory._id}
            subcategoryId={subcategory._id}
            image={subcategory.image}
            name={subcategory.name}
            items={subcategory.items}
          />
        ))}
      </div>
    </section>
  );
};

export default CategoryCollection;
