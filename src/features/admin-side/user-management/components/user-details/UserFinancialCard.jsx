import { formatCurrency } from "@/shared/utils/formatCurrency";
import React from "react";

const UserFinancialCard = ({wallet}) => {
  return (
    <div
      className="
        rounded-2xl
        p-6
        text-white
        bg-gradient-to-r
        from-[#4E3A16]
        to-[#8B5E3C]
      "
    >
      <h2 className="font-bold text-xl">Financial Portfolio</h2>

      <div className="grid grid-cols-2 gap-8 mt-8">
        <div>
          <p className="text-sm opacity-70">Wallet Balance</p>

          <h3 className="text-4xl font-bold mt-2">{`₹${formatCurrency(wallet?.balance)}`}</h3>
        </div>
      </div>
    </div>
  );
};

export default UserFinancialCard;
