import React from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, ArrowLeft, HelpCircle } from "lucide-react";

const ProductNotFound = () => {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center bg-white px-4 text-center sm:px-6 lg:px-8">
      <div className="relative mb-6">
        <div className="absolute inset-0 scale-150 rounded-full bg-gray-100 opacity-50 blur-xl" />
        <div className="relative rounded-2xl border border-gray-100 bg-gray-50 p-6 text-gray-400 shadow-sm">
          <ShoppingBag className="text-primary/60 h-16 w-16 stroke-[1.5]" />
          <div className="bg-primary absolute -right-1 -bottom-1 rounded-full border-4 border-white p-1.5 text-white shadow-sm">
            <HelpCircle className="h-4 w-4" />
          </div>
        </div>
      </div>

      <h1 className="text-primary text-2xl font-bold tracking-tight sm:text-3xl">
        Product Not Found
      </h1>

      <p className="mx-auto mt-3 max-w-md text-base leading-relaxed text-gray-500">
        Sorry, we couldn't find the product you're looking for. It may have been
        removed, is no longer available, or the link is incorrect.
      </p>

      <div className="mt-8 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
        <Link
          to="/collections"
          className="bg-primary hover:bg-primary/80 inline-flex items-center justify-center rounded-xl border border-transparent px-6 py-3 text-sm font-medium text-white shadow-sm transition-colors duration-200"
        >
          Continue Shopping
        </Link>

        <Link
          to="/"
          className="text-primary inline-flex items-center justify-center rounded-xl border bg-white px-6 py-3 text-sm font-medium transition-all duration-200 hover:border-gray-300 hover:bg-gray-50"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default ProductNotFound;
