const OfferBadge = ({ offerType }) => {
  return (
    <span className="inline-flex rounded-full bg-white/20 px-3 py-1 text-xs font-semibold tracking-wide text-white uppercase">
      {offerType} Offer
    </span>
  );
};

export default OfferBadge;
