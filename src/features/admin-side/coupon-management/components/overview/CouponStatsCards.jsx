import {
  TicketPercent,
  BadgePercent,
  IndianRupee,
  TrendingUp,
} from "lucide-react";

const cards = [
  {
    title: "Active Coupons",
    value: 24,
    icon: TicketPercent,
  },
  {
    title: "Expired Coupons",
    value: 18,
    icon: BadgePercent,
  },
  {
    title: "Discount Given",
    value: "₹1,42,800",
    icon: IndianRupee,
  },
  {
    title: "Most Used",
    value: "WELCOME100",
    icon: TrendingUp,
  },
];

const CouponStatsCards = () => {
  return (
    <div className="grid md:grid-cols-4 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div key={card.title} className="border rounded-xl p-5">
            <Icon size={22} />

            <p className="text-sm text-muted-foreground mt-2">{card.title}</p>

            <h2 className="text-2xl font-bold mt-1">{card.value}</h2>
          </div>
        );
      })}
    </div>
  );
};

export default CouponStatsCards;
