const ReturnProductCard = ({ returnRequest }) => {
  const item = returnRequest?.itemSnapshot;

  return (
    <div className="bg-white border rounded-xl p-6">
      <h2 className="text-lg font-semibold mb-6">Product Details</h2>

      <div className="flex flex-col lg:flex-row gap-6">
        <img
          src={item?.image}
          alt={item?.name}
          className="w-52 h-52 object-cover rounded-lg border"
        />

        <div className="flex-1">
          <h3 className="text-3xl font-semibold">{item?.name}</h3>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-6">
            <div>
              <p className="text-xs uppercase text-muted-foreground">Size</p>

              <p className="font-medium mt-1">{item?.size || "-"}</p>
            </div>

            <div>
              <p className="text-xs uppercase text-muted-foreground">Color</p>

              <p className="font-medium mt-1">{item?.color || "-"}</p>
            </div>

            <div>
              <p className="text-xs uppercase text-muted-foreground">
                Purchase Price
              </p>

              <p className="font-medium mt-1">₹{item?.priceAtPurchase}</p>
            </div>
          </div>

          <div className="mt-8">
            <p className="text-xs uppercase text-muted-foreground">
              Return Reason
            </p>

            <p className="mt-2 font-medium">{returnRequest?.reason}</p>
          </div>

          {returnRequest?.customerComment && (
            <div className="mt-8">
              <p className="text-xs uppercase text-muted-foreground">
                Customer Comment
              </p>

              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {returnRequest.customerComment}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReturnProductCard;
