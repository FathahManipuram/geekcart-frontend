import React from "react";
import { useNavigate } from "react-router-dom";

const Logo = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1
        onClick={() => navigate("/")}
        className="cursor-pointer text-xl font-extrabold tracking-tighter"
      >
        GeekCart
      </h1>
    </div>
  );
};

export default Logo;
