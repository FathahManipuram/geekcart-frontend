import React, { useEffect } from "react";
import { useProductStore } from "../store/product.store";
import ProductDetailsHeader from "../components/product-details/ProductDetailsHeader";
import { useParams } from "react-router-dom";
import DetailsHero from "../components/product-details/DetailsHero";
import ProductSpecification from "../components/product-details/ProductSpecification";
import ProductDescription from "../components/product-details/ProductDescription";
import VariantDetailsTable from "../components/variant-details/VariantDetailsTable";
import { groupVariantsByColor } from "../utils/groupVariantsByColor";
import VariantImageGallery from "../components/variant-details/VariantImageGallery";

const ProductDetailsPage = () => {
  const { fetchProductDetails, productDetails } = useProductStore();
  const groupedVariants = groupVariantsByColor(productDetails?.variants);
  const { slug } = useParams();

  useEffect(() => {
    fetchProductDetails(slug);
  }, []);
  return (
    <>
      <div className="p- space-y-10">
        <ProductDetailsHeader product={productDetails} />

        <div className="grid grid-cols-1 gap-8 xl:grid-cols-[1.7fr_0.8fr]">
          {/* LEFT */}
          <DetailsHero product={productDetails} />

          {/* RIGHT */}
          <ProductSpecification product={productDetails} />
        </div>
        <ProductDescription product={productDetails} />

        <VariantImageGallery variants={groupedVariants} />
      </div>

      <div>
        <VariantDetailsTable variants={productDetails.variants} />
      </div>
    </>
  );
};

export default ProductDetailsPage;
