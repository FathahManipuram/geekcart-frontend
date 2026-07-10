import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EmptyWishlist = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-neutral-100">
        <Heart className="h-8 w-8 text-neutral-400" />
      </div>

      <h2 className="mt-8 text-4xl font-bold text-neutral-900">
        Your wishlist is currently empty
      </h2>

      <p className="mt-4 max-w-md text-neutral-500">
        Save your favorite products here and quickly access them whenever you're
        ready to purchase.
      </p>

      <button
        onClick={() => navigate("/collections")}
        className="mt-8 rounded-xl bg-[#9B6C43] px-8 py-3 font-medium text-white transition hover:bg-[#865a35]"
      >
        Explore Collections
      </button>
    </div>
  );
};

export default EmptyWishlist;
