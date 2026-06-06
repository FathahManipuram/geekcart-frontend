const PackageDetailsCard = ({ item }) => {
  return (
    <div className="bg-white border rounded-2xl p-6">
      <h3 className="uppercase text-xs tracking-widest mb-4">
        Package Details
      </h3>

      <div className="flex gap-4">
        <img
          src={item?.image}
          alt={item?.name}
          className="w-24 h-24 object-cover rounded-lg"
        />

        <div>
          <h4 className="font-semibold">{item?.name}</h4>

          <p className="text-sm text-muted-foreground mt-2">
            Size: {item?.size}
          </p>

          <p className="text-sm text-muted-foreground">Color: {item?.color}</p>

          <p className="font-semibold mt-3">
            ₹{item?.salePrice || item?.price}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PackageDetailsCard;
