// src/features/products/components/ColorSelector.jsx

const ColorSelector = ({ colors = [], selectedColor, onSelectColor }) => {
  return (
    <div>
      {/* Heading */}
      <p className="text-xs font-semibold tracking-widest uppercase mb-4">
        Colors
      </p>

      {/* Colors */}
      <div className="flex items-center gap-3">
        {colors.map((color) => (
          <button
            key={color.value}
            onClick={() => onSelectColor(color.value)}
            className={`w-8 h-8 rounded-full transition-all border-2 ${
              selectedColor === color.value
                ? "border-black scale-110"
                : "border-transparent"
            }`}
            style={{
              backgroundColor: color.hex,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorSelector;
