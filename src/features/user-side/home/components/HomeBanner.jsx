import Loader from "@/shared/components/Loader";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/shared/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import React from "react";
const banners = [
  {
    id: 1,
    image:
      "https://i.pinimg.com/1200x/12/e9/b3/12e9b39981199d89baa0a8955399c5a5.jpg",
  },
  {
    id: 2,
    image:
      "https://i.pinimg.com/1200x/b7/0f/c2/b70fc26ba0b575e4dbd0738431e57ef5.jpg",
  },
  {
    id: 3,
    image:
      "https://i.pinimg.com/1200x/a5/cb/a6/a5cba69bf33ad5250bebdf0a78f8b41f.jpg",
  },
  {
    id: 4,
    image:
      "https://i.pinimg.com/736x/af/60/2e/af602e77cded53f345b4c9e02cbdd3d1.jpg",
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
              <div className="relative h-100 w-full overflow-hidden md:h-125">
                <img
                  src={banner.image}
                  alt="banner"
                  className="h-full w-full object-cover"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/20" />

                {/* Text */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <h1 className="text-center text-5xl font-extrabold tracking-wider text-white md:text-8xl">
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
};

export default HomeBanner;
