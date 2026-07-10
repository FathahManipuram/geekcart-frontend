import { useState } from "react";

const ProductZoomImage = ({ image }) => {
  const [position, setPosition] = useState({
    x: 50,
    y: 50,
  });

  const [isZoomed, setIsZoomed] = useState(false);

  const handleMouseMove = (e) => {
    // Disable on mobile
    if (window.innerWidth < 768) return;

    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();

    const x = ((e.clientX - left) / width) * 100;

    const y = ((e.clientY - top) / height) * 100;

    setPosition({ x, y });
  };

  return (
    <div
      className="relative overflow-hidden rounded-2xl bg-[#f3f0eb] md:cursor-zoom-in"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => {
        if (window.innerWidth >= 768) {
          setIsZoomed(true);
        }
      }}
      onMouseLeave={() => setIsZoomed(false)}
    >
      <img
        src={image || null}
        alt="product"
        className={`h-87.5 w-full object-cover transition-transform duration-300 ease-out will-change-transform sm:h-112.5 md:h-162.5 ${isZoomed ? "scale-150" : "scale-100"} `}
        style={{
          transformOrigin: `${position.x}% ${position.y}%`,
        }}
      />
    </div>
  );
};

export default ProductZoomImage;
