import StatsCard from "@/shared/components/StatsCard";
import SalesSummarySkeleton from "./skeletons/SalesSummarySkeleton";
import {
  ShoppingBag,
  Package,
  IndianRupee,
  Wallet,
  BadgePercent,
  TicketPercent,
  Ban,
  RotateCcw,
  Undo2,
} from "lucide-react";

const SalesSummaryCards = ({ summary, loading }) => {
  if (loading) {
    return <SalesSummarySkeleton />;
  }

  const cards = [
    {
      title: "Total Orders",
      value: summary?.overallSalesCount ?? 0,
      icon: ShoppingBag,
    },
    {
      title: "Items Sold",
      value: summary?.itemsSold ?? 0,
      icon: Package,
    },
    {
      title: "Gross Sales",
      value: `₹${(summary?.grossSales ?? 0).toFixed(2)}`,
      icon: IndianRupee,
    },
    {
      title: "Net Sales",
      value: `₹${(summary?.netSales ?? 0).toFixed(2)}`,
      icon: Wallet,
    },
    {
      title: "Offer Discount",
      value: `₹${(summary?.offerDiscount ?? 0).toFixed(2)}`,
      icon: BadgePercent,
    },
    {
      title: "Coupon Discount",
      value: `₹${(summary?.couponDiscount ?? 0).toFixed(2)}`,
      icon: TicketPercent,
    },
    {
      title: "Cancelled Items",
      value: summary?.cancelledItems ?? 0,
      icon: Ban,
    },
    {
      title: "Returned Items",
      value: summary?.returnedItems ?? 0,
      icon: Undo2,
    },
    {
      title: "Refunded Amount",
      value: `₹${(summary?.refundedAmount ?? 0).toFixed(2)}`,
      icon: RotateCcw,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {cards?.map((card) => (
        <StatsCard
          key={card?.title}
          icon={card?.icon}
          title={card?.title}
          value={card?.value}
        />
      ))}
    </div>
  );
};

export default SalesSummaryCards;
