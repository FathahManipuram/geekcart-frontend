import React from "react";

const UserAddressCard = ({ address }) => {
  if (!address) {
    return;
  }
  return (
    <div className="relative max-w-md rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
      <div className="mb-4 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-neutral-900">
          <h2 className="text-base font-semibold tracking-tight">
            {address?.addressLabel || "Address"}
          </h2>
        </div>
      </div>

      <div className="mb-3 space-y-1.5 border-b border-neutral-100 pb-3">
        <div className="flex items-center gap-2 text-sm font-medium text-neutral-800">
          <span>{address?.fullName || "No Name Provided"}</span>
        </div>

        {address?.phoneNumber && (
          <div className="flex items-center gap-2 text-xs font-normal text-neutral-500">
            <a
              href={`tel:${address.phoneNumber}`}
              className="hover:text-neutral-700 hover:underline"
            >
              {address.phoneNumber}
            </a>
          </div>
        )}
      </div>

      <address className="space-y-1 text-sm leading-relaxed text-neutral-600 not-italic">
        <p className="font-medium text-neutral-800">{address?.addressLine}</p>

        {address?.landmark && (
          <p className="text-xs text-neutral-500">
            <span className="font-medium text-neutral-400">Landmark:</span>{" "}
            {address.landmark}
          </p>
        )}

        <p className="pt-0.5">
          {address?.city}, {address?.state} —{" "}
          <span className="font-semibold tracking-wide text-neutral-800">
            {address?.pincode}
          </span>
        </p>

        <p className="pt-1 text-xs font-medium tracking-wider text-neutral-400 uppercase">
          {address?.country || "India"}
        </p>
      </address>
    </div>
  );
};
export default UserAddressCard;
