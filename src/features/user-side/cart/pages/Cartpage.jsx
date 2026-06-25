import { ArrowRight, Minus, Plus, X } from "lucide-react";
import { useCartStore } from "../store/cart.store";
import { useEffect, useState } from "react";
import CartItemCard from "../components/CartItemCard";
import EmptyCart from "../components/EmptyCart";
import Breadcrumbs from "@/shared/components/Breadcrumbs";
import { useNavigate } from "react-router-dom";
import { useCheckoutStore } from "../../checkout/store/checkout.store";
import { toast } from "sonner";
import Modal from "@/shared/components/Modal";
import CheckoutValidationModal from "../../checkout/components/CheckoutValidationModal";
import Loader from "@/shared/components/Loader";
import { formatCurrency } from "@/shared/utils/formatCurrency";

const CartPage = () => {
  const [showValidationModal, setShowValidationModal] = useState(false);
  const [issues, setIssues] = useState(null);

  const fetchCart = useCartStore((state) => state.fetchCart);
  const clearCart = useCartStore((state) => state.clearCart);
  const items = useCartStore((state) => state.items);
  const summary = useCartStore((state) => state.summary);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const validateCheckout = useCheckoutStore((state) => state.validateCheckout);
  const loading= useCartStore((state)=> state.loading)
  const navigate = useNavigate();
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const handleCheckout = async () => {
    try {
      const result = await validateCheckout();

      if (!result.valid) {
        setIssues(result.issues);
        setShowValidationModal(true);
        return;
      }

      navigate("/checkout/shipping");
    } catch (err) {
      console.log(err);
      toast.error("Unable to validate checkout");
    }
  };

  const handleRemoveItem = async (variantId) => {
    await removeFromCart(variantId);

    const updatedValidation = await validateCheckout();

    if (updatedValidation.valid) {
      setShowValidationModal(false);
      navigate("/checkout/shipping");
      return;
    }

    setIssues(updatedValidation.issues);
  };

if(loading){
  return <Loader/>
}
  if (!items.length) {
    return <EmptyCart />;
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

                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-500">Delivery Charge</span>
                  <span
                    className={
                      summary.deliveryCharge === 0
                        ? "text-green-600 font-medium"
                        : ""
                    }
                  >
                    {summary.deliveryCharge === 0
                      ? "Free"
                      : `₹${formatCurrency(summary.deliveryCharge)}`}
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
                onClick={handleCheckout}
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

      <Modal
        open={showValidationModal}
        onOpenChange={setShowValidationModal}
        title="Checkout Validation"
      >
        <CheckoutValidationModal
          issues={issues}
          onRemoveItem={handleRemoveItem}
          onClose={() => setShowValidationModal(false)}
        />
      </Modal>
    </section>
  );
};

export default CartPage;
