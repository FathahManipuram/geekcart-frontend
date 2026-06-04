const AddressSelectionModal = ({ addresses, selectedAddressId, onSelect }) => {
  return (
    <div className="space-y-4">
      {addresses.map((address) => (
        <label
          key={address._id}
          className={`
            flex gap-4 border rounded-lg p-4 cursor-pointer
            ${
              selectedAddressId === address._id
                ? "border-primary bg-primary/5"
                : ""
            }
          `}
        >
          <input
            type="radio"
            checked={selectedAddressId === address._id}
            onChange={() => onSelect(address)}
			className="accent-primary"
          />

          <div>
            <h3 className="font-medium">{address.fullName}</h3>

            <p className="text-sm text-gray-600">{address.addressLine}</p>

            <p className="text-sm text-gray-600">
              {address.city}, {address.state}
            </p>

            <p className="text-sm text-gray-600">{address.pincode}</p>
          </div>
        </label>
      ))}
    </div>
  );
};

export default AddressSelectionModal;
