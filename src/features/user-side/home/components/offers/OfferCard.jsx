import { Clock3 } from "lucide-react";
import { Badge } from "@/shared/components/ui/badge";

const OFFER_STYLES = {
  Product: {
    badge: "Product Offer",
    background: "bg-card",
    border: "border-primary/20",
    accent: "bg-primary",
  },

  Category: {
    badge: "Category Offer",
    background: "bg-secondary",
    border: "border-primary/20",
    accent: "bg-primary",
  },

  Subcategory: {
    badge: "Collection Offer",
    background: "bg-muted",
    border: "border-primary/20",
    accent: "bg-primary",
  },
};

const OfferCard = ({ offer }) => {
  const style = OFFER_STYLES[offer.offerType];

  const remainingDays = Math.max(
    0,
    Math.ceil(
      (new Date(offer.expiryDate) - new Date()) / (1000 * 60 * 60 * 24),
    ),
  );

  return (
    <div
      className={`group relative overflow-hidden rounded-3xl border ${style.border} ${style.background} p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
    >
      <div
        className={`absolute top-0 right-0 h-28 w-28 rounded-full ${style.accent} opacity-10 blur-3xl`}
      />

      <Badge className="bg-primary text-primary-foreground">
        {style.badge}
      </Badge>

      <h2 className="text-primary mt-6 text-3xl font-bold">
        {offer.discountType === "PERCENTAGE"
          ? `${offer.discountValue}% OFF`
          : `₹${offer.discountValue} OFF`}
      </h2>

      <h3 className="mt-4 text-lg font-semibold">{offer.name}</h3>

      <p className="text-muted-foreground mt-2 line-clamp-2 text-sm">
        {offer.description}
      </p>

      <div className="mt-6 flex items-center justify-between">
        <div className="text-muted-foreground flex items-center gap-2 text-sm">
          <Clock3 className="h-4 w-4" />
          Ends in {remainingDays} days
        </div>
      </div>
    </div>
  );
};

export default OfferCard;
