import React from "react";
import { Spinner } from "./ui/spinner";

const Loader = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Spinner />
    </div>
  );
};

export default Loader;
