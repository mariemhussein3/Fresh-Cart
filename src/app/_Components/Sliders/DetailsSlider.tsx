"use client";
import Image from "next/image";
import React from "react";
import Slider from "react-slick";

export default function DetailsSlider({ images }: { images: string[] }) {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
  };
  return (
    <>
      <div className=" w-3/4 mx-auto">
        <Slider {...settings}>
          {images.map((image) => {
            return (
             <div key={image}>
                 <Image
                src={image}
                alt="slider1"
                width={200}
                height={200}
                className="w-full object-cover h-96"
              ></Image>
             </div>
            );
          })}
        </Slider>
      </div>
    </>
  );
}
