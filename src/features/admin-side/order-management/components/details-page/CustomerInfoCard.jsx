import { Mail, Phone } from "lucide-react";

const CustomerInfoCard = ({
  customer,
}) => {
  return (
    <div className="border rounded-lg p-5">
      <h3 className="font-semibold mb-4">
        Customer Information
      </h3>

      <div className="flex gap-4 items-center">
        <img
          src={customer?.avatar}
          alt={customer?.fullName}
          className="w-14 h-14 rounded-full"
        />

        <div>
          <h4 className="font-semibold">
            {customer?.fullName}
          </h4>
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