import StatsCard from "@/shared/components/StatsCard";
import { TicketPercent, Tag, Package, Boxes } from "lucide-react";

const OfferStatsCards = ({ stats = {} }) => {
  const cards = [
    {
      title: "Total Offers",
      value: stats.totalOffers || 0,
      icon: TicketPercent,
    },
    {
      title: "Active Offers",
      value: stats.activeOffers || 0,
      icon: Tag,
    },
    {
      title: "Product Offers",
      value: stats.productOffers || 0,
      icon: Package,
    },
    {
      title: "Category Offers",
      value: stats.categoryOffers || 0,
      icon: Boxes,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <StatsCard
          key={card.title}
          title={card.title}
          value={card.value}
          icon={card.icon}
        />
      ))}
    </div>
  );
};

export default OfferStatsCards;
