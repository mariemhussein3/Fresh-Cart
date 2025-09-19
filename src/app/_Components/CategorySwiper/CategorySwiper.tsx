"use client"
import { TotalData } from 'src/types/Total.type'
import Image from "next/image";
import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import { Autoplay } from 'swiper/modules';
export default function CategorySwiper({data}:{data:TotalData[]}) {

  return <>
        <h2 className='lg:text-[16px] text-[20px] text-slate-700  font-medium my-3 mb-8 tracking-4 text-center first-letter:text-red-600'>Shop Popular Categories</h2>
        <div className="w-[80%] mx-auto">

      

              <Swiper
      spaceBetween={0}
      slidesPerView={7}
      modules={[Autoplay]}
  autoplay={{delay:5000}}
   breakpoints={{
    0: {
      slidesPerView: 1,
    },
    640: {
      slidesPerView: 2, 
    },
    768: {
      slidesPerView: 3,
    },
    1024: {
      slidesPerView: 5, 
    },
    1280: {
      slidesPerView: 7, 
    },
  }}
    >
           {data.map((category) => (
                   <SwiperSlide  key={category._id}>
                   <Image
                src={category.image}
                alt={category.name}
                width={200}
                height={200}
                className="w-full object-cover lg:h-[160px] h-[360px]"
              ></Image>
              <p className="text-[14px] text-center text-slate-700 my-2">{category.name}</p>

                   </SwiperSlide>
 
          ))}
    
     </Swiper>
        </div>
  
  </>

}
