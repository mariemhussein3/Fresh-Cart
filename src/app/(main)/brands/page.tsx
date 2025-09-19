import React from "react";
import BrandCard from "src/app/_Components/BrandCard/BrandCard";
import { getAllBrands } from "src/services/Brands.api";
import { Total, TotalData } from "src/types/Total.type";
import { Metadata } from 'next';
  export const metadata: Metadata = {
    title: "Brands",
  };
  import { Wix_Madefor_Text } from 'next/font/google';
         const wixFont = Wix_Madefor_Text({
      weight:["400","500","600","700","800"]
      });
export default async function Brands() {

  const res:Total = await getAllBrands();  
  const brandItem:TotalData[]=res.data
  return (
    <>
    <div className="my-10 w-3/4 mx-auto">

      <div className="flex  items-center justify-between my-2 px-1">
<h2 className={`text-[30px] text-slate-700 ${wixFont.className} tracking-4 my-3`}>Brands</h2>
  <span className='text-[14px] text-gray-500'>{res.results} brand</span>
</div>
      <div className=" grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  grid-cols-1 gap-10 ">
      {brandItem.map((brand)=><BrandCard brand={brand} key={brand._id}/>)}
      </div>
    </div>
    </>
  );
}
