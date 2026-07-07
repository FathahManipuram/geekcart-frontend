import { Phone, User } from "lucide-react";
import React from "react";

const UserAddressCard = ({ address }) => {
  if(!address){
    return 
  }
  return (
    <div className="relative bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm max-w-md transition-all hover:shadow-md">
      <div className="flex items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2 text-neutral-900">
          <h2 className="font-semibold text-base tracking-tight">
            {address?.addressLabel || "Address"}
          </h2>
        </div>
      </div>

      <div className="border-b border-neutral-100 pb-3 mb-3 space-y-1.5">
        <div className="flex items-center gap-2 text-neutral-800 text-sm font-medium">
          <span>{address?.fullName || "No Name Provided"}</span>
        </div>

        {address?.phoneNumber && (
          <div className="flex items-center gap-2 text-neutral-500 text-xs font-normal">
            <a
              href={`tel:${address.phoneNumber}`}
              className="hover:underline hover:text-neutral-700"
            >
              {address.phoneNumber}
            </a>
          </div>
        )}
      </div>

      <address className="not-italic text-sm text-neutral-600 space-y-1 leading-relaxed">
        <p className="text-neutral-800 font-medium">{address?.addressLine}</p>

        {address?.landmark && (
          <p className="text-xs text-neutral-500">
            <span className="font-medium text-neutral-400">Landmark:</span>{" "}
            {address.landmark}
          </p>
        )}

        <p className="pt-0.5">
          {address?.city}, {address?.state} —{" "}
          <span className="font-semibold text-neutral-800 tracking-wide">
            {address?.pincode}
          </span>
        </p>

        <p className="text-xs text-neutral-400 font-medium tracking-wider uppercase pt-1">
          {address?.country || "India"}
        </p>
      </address>
    </div>
  );
}
export default UserAddressCard;
