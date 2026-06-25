import StatsCard from "@/shared/components/StatsCard";
import { formatCurrency } from "@/shared/utils/formatCurrency";
import {
  TicketPercent,
  BadgePercent,
  IndianRupee,
  TrendingUp,
} from "lucide-react";


const CouponStatsCards = ({stats}) => {
  
const cards = [
  {
    title: "Active Coupons",
    value: stats?.activeCoupon || 0,
    icon: TicketPercent,
  },
  {
    title: "Expired Coupons",
    value: stats?.expiredCoupon || 0,
    icon: BadgePercent,
  },
  {
    title: "Discount Given",
    value: formatCurrency(stats?.discountGiven || 0),
    icon: IndianRupee,
  },
  {
    title: "Most Used Coupon",
    value: stats?.mostUsedCoupon?.code || "",
    icon: TrendingUp,
  },
];
  return (
    <div className="grid md:grid-cols-4 gap-4">
      {cards.map((card) => (
        <StatsCard key={card.title} title={card.title} value={card.value} icon={card.icon}/>
      ))}
    </div>
  );
};

export default CouponStatsCards;
