import React from 'react'

const CategoryCard = ({title ,image}) => {
  return (
	<div className='relative'>
	 <img src={image} alt={title} 
	 />
	 <div className='absolute'>
		<p>{title}</p>
	 </div>
	</div>
  )
}

export default CategoryCard
