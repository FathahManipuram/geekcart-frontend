import OfferCard from "./OfferCard";
import OfferCardSkeleton from "./OfferCardSkeleton";

const HomeOffersSection = ({ offers, loading }) => {
  return (
    <section className="space-y-8 p-8">
      <div className="p-4">
        <p className="text-primary font-semibold uppercase tracking-widest">
          Special Offers
        </p>

        <h2 className="mt-2 text-4xl font-bold">Deals You'll Love</h2>

        <p className="mt-2 text-muted-foreground">
          Save more with our latest product and collection offers.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2">
        {loading
          ? Array.from({ length: 2 }).map((_, i) => <OfferCardSkeleton key={i} />)
          : offers.map((offer) => <OfferCard key={offer._id} offer={offer} />)}
      </div>
    </section>
  );
};

export default HomeOffersSection;
