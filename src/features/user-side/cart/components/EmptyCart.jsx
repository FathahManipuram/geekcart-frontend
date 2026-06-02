import React from 'react'
import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";


const EmptyCart = () => {
  return (
    <section
      className="
        flex
        min-h-[70vh]
        flex-col
        items-center
        justify-center
      "
    >
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
        {/* ICON */}
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-neutral-100">
          <ShoppingBag className="h-10 w-10 text-neutral-400" />
        </div>

        {/* TITLE */}
        <h2 className="mt-8 text-3xl font-bold text-black">
          Your cart is empty
        </h2>

        {/* DESCRIPTION */}
        <p className="mt-3 max-w-md text-sm leading-6 text-neutral-500">
          Looks like you haven’t added anything yet. Discover premium styles
          curated for modern fashion.
        </p>

        {/* BUTTON */}
        <Link
          to="/collections"
          className="
      mt-8
      rounded-full
      bg-[#9B6C43]
      px-8
      py-3
      text-sm
      font-medium
      uppercase
      tracking-[0.15em]
      text-white
      transition
      hover:opacity-90
    "
        >
          Continue Shopping
        </Link>
      </div>
    </section>
  );
}

export default EmptyCart
