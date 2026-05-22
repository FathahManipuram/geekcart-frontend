import React from 'react'
import { Card, CardContent } from './ui/card';

const StatsCard = ({
  title,
  value,
  icon: Icon,
  iconClassName = "text-[#8B5E3C]",
  className = "",
  valueClassName = "text-xl",
  titleClassName = "tracking-[0.1em]",
}) => {
  return (
    <Card
      className={`
        rounded-2xl
        bg-white
        shadow-sm
        ${className}
      `}
    >
      <CardContent className="">
        {/* Icon */}
        {Icon && (
          <div className="mb-5">
            <Icon size={18} className={iconClassName} />
          </div>
        )}

        {/* Value */}
        <h3 className={`font-bold leading-none ${valueClassName}`}>
          {String(value).padStart(2, "0")}
        </h3>

        {/* Title */}
        <p
          className={`
		  	mt-2
            text-xs
            uppercase
            text-muted-foreground
            font-medium
			${titleClassName}
			 `}
        >
          {title}
        </p>
      </CardContent>
    </Card>
  );
};

export default StatsCard
