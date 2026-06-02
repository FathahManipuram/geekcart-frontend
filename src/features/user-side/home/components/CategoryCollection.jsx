import React, { useEffect } from 'react'
import CategoryCard from './CategoryCard';

const CategoryCollection = ({subcategories}) => {

	useEffect(()=>{
		
	})
  return (
    <section className="px-4 md:px-8 lg:px-12 py-10">
      {/* Heading */}
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-semibold text-neutral-900">
          Curated Categories
        </h2>

        <div className="w-14 h-[2px] bg-black mt-2" />
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
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
}

export default CategoryCollection;
