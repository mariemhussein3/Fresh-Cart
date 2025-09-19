'use client'
import Image from "next/image";
import Link from "next/link";
import { Button } from "src/components/ui/button";
import React from "react";
import Slider from "react-slick";
export default function MainHome() {
   const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
      fade: true, 
  };
  return <>
<div className="lg:min-h-[800px] min-h-screen">
  <div className="flex flex-col">
    <div className="flex flex-col w-full py-14 items-center lg:justify-between justify-center text-center gap-7">

      <h1 className="text-[50px] text-[#30362c] leading-[75px] tracking-4">Sustainable. Beautiful. Ethical.</h1>
     <Link href="/products"> <Button className="btn py-5 px-10 cursor-pointer btn:hover">Shop Now</Button></Link>
    </div>

   <div className=" justify-center items-center w-full lg:flex hidden">
      <div
        className="cover-1  h-[800px] w-1/2 bg-cover bg-center"
    
      ></div>
      <div
        className="cover-2  h-[800px] w-1/2 bg-cover bg-center"
       
      ></div>
    </div>
<div className="lg:hidden mt-10">
       <Slider {...settings}>
             <div >
                 <Image
                src="/images/bg-1.jpg"
                alt="slider1"
                width={200}
                height={200}
                className="w-full object-cover h-96 block"
              ></Image>
             </div>
               <div >
                 <Image
                src="/images/bg-2.jpg"
                alt="slider1"
                width={200}
                height={200}
                className="w-full object-cover h-96 block"
              ></Image>
             </div>
        </Slider>
</div>
  </div>
</div>
  </>
}
