import { Mail, Phone } from "lucide-react";

const CustomerInfoCard = ({ customer }) => {
  return (
    <div className="rounded-lg border p-5">
      <h3 className="mb-4 font-semibold">Customer Information</h3>

      <div className="flex items-center gap-4">
        <img
          src={customer?.avatar}
          alt={customer?.fullName}
          className="h-14 w-14 rounded-full"
        />

        <div>
          <h4 className="font-semibold">{customer?.fullName}</h4>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <p className="flex gap-2">
          <Mail size={16} />
          {customer?.email}
        </p>

        <p className="flex gap-2">
          <Phone size={16} />
          {customer?.phoneNumber}
        </p>
      </div>
    </div>
  );
};

export default CustomerInfoCard;
