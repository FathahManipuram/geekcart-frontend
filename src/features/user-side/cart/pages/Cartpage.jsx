import { ArrowRight, Minus, Plus, X } from "lucide-react";

const cartItems = [
  {
    id: 1,

    name: "The Malabar Linen Shirt",

    subtitle: "Natural Sandstone — Size M",

    price: 185,

    quantity: 1,

    image:
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=1200&auto=format&fit=crop",
  },

  {
    id: 2,

    name: "Pleated Atelier Trouser",

    subtitle: "Deep Espresso — Size 32",

    price: 240,

    quantity: 1,

    image:
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1200&auto=format&fit=crop",
  },
];

const CartPage = () => {
  /**
   * Totals
   */
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const discount = 100;

  const total = subtotal - discount;

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
              mt-2
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
        <button
          className="
            text-xs
            uppercase
            tracking-[0.2em]
            text-neutral-400
            transition

            hover:text-black
          "
        >
          Clear Cart
        </button>
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
        <div className="space-y-8">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="
                border-b
                border-neutral-200
                pb-8
              "
            >
              <div
                className="
                  flex
                  flex-col
                  gap-5

                  sm:flex-row
                "
              >
                {/* IMAGE */}
                <div
                  className="
                    overflow-hidden
                    rounded-2xl
                    bg-white
                  "
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="
                      h-44
                      w-full
                      object-cover

                      sm:w-44
                    "
                  />
                </div>

                {/* CONTENT */}
                <div className="flex-1">
                  <div
                    className="
                      flex
                      flex-col
                      gap-4

                      sm:flex-row
                      sm:items-start
                      sm:justify-between
                    "
                  >
                    {/* LEFT */}
                    <div>
                      <h2
                        className="
                          text-2xl
                          font-semibold
                        "
                      >
                        {item.name}
                      </h2>

                      <p
                        className="
                          mt-1
                          text-sm
                          text-neutral-500
                        "
                      >
                        {item.subtitle}
                      </p>
                    </div>

                    {/* PRICE */}
                    <p
                      className="
                        text-xl
                        font-semibold
                        text-[#9B6C43]
                      "
                    >
                      ${item.price.toFixed(2)}
                    </p>
                  </div>

                  {/* ACTIONS */}
                  <div
                    className="
                      mt-8
                      flex
                      flex-col
                      gap-4

                      sm:flex-row
                      sm:items-center
                      sm:justify-between
                    "
                  >
                    {/* QUANTITY */}
                    <div
                      className="
                        flex
                        w-fit
                        items-center
                        rounded-full
                        border
                        border-neutral-300
                        bg-white
                      "
                    >
                      <button
                        className="
                          flex
                          h-10
                          w-10
                          items-center
                          justify-center
                        "
                      >
                        <Minus size={15} />
                      </button>

                      <span
                        className="
                          min-w-[40px]
                          text-center
                          text-sm
                          font-medium
                        "
                      >
                        {item.quantity}
                      </span>

                      <button
                        className="
                          flex
                          h-10
                          w-10
                          items-center
                          justify-center
                        "
                      >
                        <Plus size={15} />
                      </button>
                    </div>

                    {/* REMOVE */}
                    <button
                      className="
                        flex
                        items-center
                        gap-2
                        text-xs
                        uppercase
                        tracking-[0.2em]
                        text-neutral-400
                        transition

                        hover:text-black
                      "
                    >
                      <X size={14} />
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

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

              <span className="font-medium">${subtotal.toFixed(2)}</span>
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
                -${discount.toFixed(2)}
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
                text-4xl
                font-bold
                text-[#9B6C43]
              "
            >
              ${total.toFixed(2)}
            </span>
          </div>

          {/* BUTTON */}
          <button
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
              text-sm
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
      </div>
    </section>
  );
};

export default CartPage;
