import React from 'react'
 import { Metadata } from 'next';
import MostRated from 'src/app/_Components/MostRated/MostRated';
import CategorySlider from 'src/app/_Components/Sliders/CategorySlider';
import MainHome from 'src/app/_Components/MainHome/MainHome';
import ProductHome from 'src/app/_Components/ProductHome/ProductHome';
import { Wix_Madefor_Text } from 'next/font/google';
  export const metadata: Metadata = {
    title: "Home",
  };
     const wixFont = Wix_Madefor_Text({
  weight:["400","500","600","700","800"]
  });
export default function Home() {
  return <div className={`${wixFont.className} min-h-screen`}>
  <MainHome/>
  <CategorySlider/>
  <MostRated/>
  <ProductHome/>

  </div>
}
