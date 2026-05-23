import { Carousel, CarouselContent, CarouselItem } from '@/shared/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import React from 'react'
const banners = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1200",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=1200",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200",
  },
  {
    id: 4,
    image:
      "https://i.pinimg.com/1200x/12/e9/b3/12e9b39981199d89baa0a8955399c5a5.jpg",
  },
  {
    id: 5,
    image:
      "https://i.pinimg.com/736x/70/c3/d4/70c3d46e6b28d737ccb43baacc740024.jpg",
  },
];

const HomeBanner = () => {
   return (
     <div className="w-full">
       <Carousel
         plugins={[
           Autoplay({
             delay: 3000,
           }),
         ]}
         opts={{
           loop: true,
         }}
         className="w-full"
       >
         <CarouselContent>
           {banners.map((banner) => (
             <CarouselItem key={banner.id}>
               <div className="relative h-100 md:h-125 w-full overflow-hidden">
                 <img
                   src={banner.image}
                   alt="banner"
                   className="h-full w-full object-cover"
                 />

                 {/* Overlay */}
                 <div className="absolute inset-0 bg-black/20" />

                 {/* Text */}
                 <div className="absolute inset-0 flex items-center justify-center">
                   <h1 className="text-5xl md:text-8xl font-extrabold text-white tracking-wider text-center">
                     PREMIUM COLLECTION
                   </h1>
                 </div>
               </div>
             </CarouselItem>
           ))}
         </CarouselContent>

         {/* Dots */}
         <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2">
           {banners.map((_, index) => (
             <div key={index} className="h-2 w-2 rounded-full bg-white/70" />
           ))}
         </div>
       </Carousel>
     </div>
   );
}

export default HomeBanner
