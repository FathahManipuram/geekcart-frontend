import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/shared/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import Loader from "@/shared/components/Loader";
import { useOfferStore } from "../store/offer.store";
import OfferForm from "../components/form/OfferForm";
import { useProductStore } from "../../product-management/store/product.store";
import { useCategoryStore } from "../../category-management/store/category.store";
import { useSubcategoryStore } from "../../subcategory-management/store/subcategory.store";

const UpdateOfferPage = () => {
  const navigate = useNavigate();
  const { offerId } = useParams();

  const offer= useOfferStore((state)=> state.offer)
  const getOfferDetails= useOfferStore((state)=> state.getOfferDetails)
  const updateOffer= useOfferStore((state)=> state.updateOffer)
  const loading= useOfferStore((state)=> state.loading)

const fetchProducts = useProductStore((state) => state.fetchProducts);
const products = useProductStore((state) => state.products);
const fetchCategories = useCategoryStore((state) => state.fetchCategories)
const categories = useCategoryStore((state) => state.categories);
const fetchSubcategories = useSubcategoryStore(
	(state) => state.fetchSubcategories,
  );
const subcategories = useSubcategoryStore((state) => state.subcategories);


  useEffect(() => {
	fetchProducts({
	  limit: 100,
	});

	fetchCategories();

	fetchSubcategories();
  }, []);

useEffect(()=>{
	getOfferDetails(offerId)
}, [])

  const handleUpdateOffer = async (payload) => {
    console.log("offerupdationdata; ", offerId, payload);
    try {
      const res = await updateOffer(offerId, payload);

      toast.success(res.message || "Offer updated successfullly");
      navigate("/admin/offers");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Updation failed");
    }
  };
  if (!offer) return <Loader />;
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 items-start md:flex-row md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Update Offer</h1>

          <p className="text-muted-foreground">Update your offer.</p>
        </div>

        <Button onClick={() => navigate(-1)} variant="outline">
          <ArrowLeft size={18} />
          Back
        </Button>
      </div>

      <OfferForm
        onSubmit={handleUpdateOffer}
        defaultValues={offer}
        loading={loading}
		products={products}
		categories={categories}
		subcategories={subcategories}
      />
    </div>
  );
};

export default UpdateOfferPage;
