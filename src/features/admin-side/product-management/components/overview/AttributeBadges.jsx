import React from 'react'

const AttributeBadges = ({
	attributes=[]
}) => {
  return (
    <div className="flex flex-wrap gap-2">
      {attributes.map((attribute) => (
        <span
          key={attribute}
          className="
              rounded-full
              bg-muted
              px-3
              py-1
              text-xs
              font-medium
            "
        >
			{attribute}
		</span>
      ))}
    </div>
  );
}

export default AttributeBadges
