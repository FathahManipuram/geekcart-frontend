import { ArrowRight, Minus, Plus, X } from "lucide-react";
import { useCartStore } from "../store/cart.store";
import { useEffect } from "react";
import CartItemCard from "../components/CartItemCard";
import EmptyCart from "../components/EmptyCart";
import Breadcrumbs from "@/shared/components/Breadcrumbs";
import { useNavigate } from "react-router-dom";


const CartPage = () => {
  const fetchCart = useCartStore((state) => state.fetchCart);
  const clearCart= useCartStore((state)=> state.clearCart)
  const items = useCartStore((state) => state.items);
  const summary = useCartStore((state) => state.summary);
const navigate= useNavigate()
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);
  
if (!items.length) {
  return <EmptyCart/>;
}

  return (
    <section
      className="
        min-h-screen
        bg-[#f7f5f2]
        px-4
        py-10

        md:px-8

        lg:px-14
      "
    >
      <div className="mb-3">
        <Breadcrumbs
          items={[
            {
              label: "Home",
              link: "/",
            },
            {
              label: "Cart",
            },
          ]}
        />
      </div>
      {/* TOP */}
      <div
        className="
          mb-10
          flex
          flex-col
          gap-5

          md:flex-row
          md:items-end
          md:justify-between
        "
      >
        {/* LEFT */}
        <div>
          <p
            className="
              text-[11px]
              uppercase
              tracking-[0.3em]
              text-[#9B6C43]
            "
          >
            Your Selection
          </p>

          <h1
            className="
              text-4xl
              font-bold
              tracking-tight

              md:text-6xl
            "
          >
            Your Cart
          </h1>
        </div>

        {/* RIGHT */}
        {items.length !== 0 && (
          <button
            className="
            text-xs
            uppercase
            tracking-[0.2em]
            text-neutral-400
            transition

            hover:text-black
          "
            onClick={() => clearCart()}
          >
            Clear Cart
          </button>
        )}
      </div>

      {/* MAIN */}
      <div
        className="
          grid
          gap-10
          lg:grid-cols-[1fr_360px]
        "
      >
        {/* CART ITEMS */}
        <CartItemCard key={items.id} items={items} />

        {items.length !== 0 && (
          <>
            {/* SUMMARY */}
            <aside
              className="
            h-fit
            rounded-3xl
            bg-white
            p-8
            shadow-sm
          "
            >
              <h2
                className="
              text-3xl
              font-semibold
            "
              >
                Summary
              </h2>

              {/* PRICE DETAILS */}
              <div className="mt-8 space-y-5">
                <div
                  className="
                flex
                items-center
                justify-between
                text-sm
              "
                >
                  <span className="text-neutral-500">Subtotal</span>

                  <span className="font-medium">
                    ₹ {summary.subtotal?.toFixed(2)}
                  </span>
                </div>

                <div
                  className="
                flex
                items-center
                justify-between
                text-sm
              "
                >
                  <span className="text-neutral-500">Discount</span>

                  <span className="font-medium text-red-500">
                    -₹ {summary.discount?.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* DIVIDER */}
              <div className="my-8 border-t" />

              {/* TOTAL */}
              <div
                className="
              flex
              items-center
              justify-between
            "
              >
                <span
                  className="
                text-lg
                font-semibold
              "
                >
                  Total
                </span>

                <span
                  className="
                text-2xl
                font-bold
                text-[#9B6C43]
              "
                >
                  ₹ {summary.total?.toFixed(2)}
                </span>
              </div>

              {/* BUTTON */}
              <button
              onClick={()=> navigate("/checkout/shipping")}
                className="
              mt-10
              flex
              w-full
              items-center
              justify-center
              gap-3
              rounded-full
              bg-[#9B6C43]
              px-6
              py-4
              text-xs
              font-semibold
              uppercase
              tracking-[0.2em]
              text-white
              transition

              hover:opacity-90
            "
              >
                Proceed To Checkout
                <ArrowRight size={18} />
              </button>
            </aside>
          </>
        )}
      </div>
    </section>
  );
};

export default CartPage;
