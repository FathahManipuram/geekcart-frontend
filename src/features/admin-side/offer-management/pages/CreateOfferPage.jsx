import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/shared/components/ui/button";
import OfferForm from "../components/form/OfferForm";
import { useProductStore } from "../../product-management/store/product.store";
import { useCategoryStore } from "../../category-management/store/category.store";
import { useSubcategoryStore } from "../../subcategory-management/store/subcategory.store";
import { useEffect } from "react";
import { useOfferStore } from "../store/offer.store";
import { toast } from "sonner";
import { offerSchema } from "../validations/offer.validation";

const CreateOfferPage = () => {
  const navigate = useNavigate();

  const fetchProducts = useProductStore((state) => state.fetchProducts);

  const products = useProductStore((state) => state.products);

  const fetchCategories = useCategoryStore((state) => state.fetchCategories);

  const categories = useCategoryStore((state) => state.categories);

  const fetchSubcategories = useSubcategoryStore(
    (state) => state.fetchSubcategories,
  );

  const subcategories = useSubcategoryStore((state) => state.subcategories);


const createOffer = useOfferStore((state) => state.createOffer);
const loading= useOfferStore((state)=> state.loading)

  useEffect(() => {
    fetchProducts({
      limit: 100,
    });

    fetchCategories();

    fetchSubcategories();
  }, []);

  
  const handleCreateOffer = async (payload) => {
    try {
      const res = await createOffer(payload);

      toast.success(res.message || "Offer created successfully");

      navigate("/admin/offers");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Offer creation failed");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <div>
          <h1 className="text-3xl font-bold">Create Offer</h1>

          <p className="text-muted-foreground">Create a new offer.</p>
        </div>

        <Button variant="outline" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} />
          Back
        </Button>
      </div>

      <OfferForm
        products={products}
        categories={categories}
        subcategories={subcategories}
        onSubmit={handleCreateOffer}
        validation={offerSchema}
        loading={loading}
      />
    </div>
  );
};

export default CreateOfferPage;
