import { formatCurrency } from "@/shared/utils/formatCurrency";
import React from "react";

const UserFinancialCard = ({ wallet }) => {
  return (
    <div className="rounded-2xl bg-gradient-to-r from-[#4E3A16] to-[#8B5E3C] p-6 text-white">
      <h2 className="text-xl font-bold">Financial Portfolio</h2>

      <div className="mt-8 grid grid-cols-2 gap-8">
        <div>
          <p className="text-sm opacity-70">Wallet Balance</p>

          <h3 className="mt-2 text-4xl font-bold">{`₹${formatCurrency(wallet?.balance)}`}</h3>
        </div>
      </div>
    </div>
  );
};

export default UserFinancialCard;
