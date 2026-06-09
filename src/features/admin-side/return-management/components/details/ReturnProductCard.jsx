const ReturnProductCard = ({ returnRequest }) => {
  const item = returnRequest?.orderItem;

  return (
    <div className="bg-white border rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-semibold">Product Details</h2>

        <span className="text-xs bg-muted px-2 py-1 rounded">ITEM</span>
      </div>

      <div className="flex gap-6">
        <img
          src={item?.image}
          alt={item?.name}
          className="
            w-40 h-40
            rounded-lg
            object-cover
            border
          "
        />

        <div className="flex-1">
          <h3 className="text-2xl font-semibold">{item?.name}</h3>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <div>
              <p className="text-xs text-muted-foreground uppercase">Size</p>

              <p>{item?.size}</p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground uppercase">Color</p>

              <p>{item?.color}</p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground uppercase">Price</p>

              <p>₹{item?.salePrice ?? item?.price}</p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground uppercase">
                Return Reason
              </p>

              <p>{returnRequest?.reason}</p>
            </div>
          </div>

          {returnRequest?.comment && (
            <div className="mt-8">
              <p className="text-xs text-muted-foreground uppercase mb-2">
                Customer Comment
              </p>

              <p className="text-sm text-muted-foreground">
                {returnRequest.comment}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReturnProductCard;
