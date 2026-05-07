import React from 'react'
import premium from '../../../../assets/images/premium.png'

const HeroSection = () => {
  return (
	<section className='relative w-full h-screen md:h-100 bg-[#d6b28d] flex items-center justify-center overflow-hidden'>
		<h1 className='absolute text-[60px] md:text-[100px] font-extrabold text-white30 text-center leading-none'>
			PREMIUM <br/> COLLECTION
		</h1>

		<img src={premium} alt="hero" 
		className='relative z-10 h-[250px md:h-[350px] object-contain'/>
	</section>
  )
}

export default HeroSection
