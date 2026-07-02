import { useEffect, useState } from "react";

import Breadcrumbs from "@/shared/components/Breadcrumbs";

import EmptyWishlist from "../components/EmptyWishlist";

import WishlistCard from "../components/Wishlist.Card";
import { useWishlistStore } from "../store/store.wishlist";
import ConfirmModal from "@/shared/components/ConfirmModal";
import Loader from "@/shared/components/Loader";
import { toast } from "sonner";
import { useCartStore } from "../../cart/store/cart.store";


const WishlistPage = () => {
  const wishlist = useWishlistStore((state) => state.wishlist);
const loading= useWishlistStore((state)=> state.loading)
  const fetchWishlist = useWishlistStore((state) => state.fetchWishlist);
  const removeFromWishlist = useWishlistStore((state) => state.removeFromWishlist);
  const fetchCart = useCartStore((state)=> state.fetchCart)

const addToCart= useCartStore((state)=> state.addToCart)

  useEffect(() => {
    fetchWishlist();
    fetchCart()
  }, []);

  console.log("whislistpage: ", wishlist)


  const handleRemoveItem =async(variantId)=>{
    try{
      const res= await removeFromWishlist(variantId)
      toast.success(res.message || "Product removed from wishlist")
    }catch(err){
      toast.error(err.response?.data?.message || "Failed to remove")
    }
  }

  const handleMoveToCart = async (variantId) => {
    try {
      const res = await addToCart({
        variantId,
        quantity: 1,
      });
    await removeFromWishlist(variantId)
      toast.success(res.message || "Added to cart");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add to cart");
    }
  };

// if(loading){
//   return <Loader/>
// }
if (wishlist.length === 0) {
  return <EmptyWishlist />;
}
  return (
    <section className="px-4 py-10 md:px-8 lg:px-12">
      <Breadcrumbs
        items={[
          {
            label: "Home",
            link: "/",
          },
          {
            label: "Wishlist",
          },
        ]}
      />

      {/* HEADER */}
      <div className="mt-6">
        <h1 className="text-5xl font-bold">My Wishlist</h1>

        <p className="mt-3 text-sm uppercase tracking-[0.2em] text-[#9B6C43]">
          {wishlist?.length || 0} Items Saved
        </p>
      </div>

      {/* GRID */}
      <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-3 xl:grid-cols-4">
        {wishlist.map((item) => (
          <WishlistCard
            key={item.variantId._id}
            item={item}
            onRemove={handleRemoveItem}
            onMoveToCart={handleMoveToCart}
          />
        ))}
      </div>
    </section>
  );
};

export default WishlistPage;
