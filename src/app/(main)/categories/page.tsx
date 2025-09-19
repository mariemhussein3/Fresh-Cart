import Image from 'next/image';
import React from 'react'
import CategoriesApi from 'src/services/Categories.api'
import { Total, TotalData } from 'src/types/Total.type';
import { Metadata } from 'next';
  export const metadata: Metadata = {
    title: "Categories",
  };
  import { Wix_Madefor_Text } from 'next/font/google';
       const wixFont = Wix_Madefor_Text({
    weight:["400","500","600","700","800"]
    });
export default async function Categories() {

const res:Total= await CategoriesApi()
const data:TotalData[]=res.data

  return <div className="mt-10">
  
<div className="flex justify-between my-5 px-1">
<h2 className={`text-[30px] text-slate-700 ${wixFont.className} tracking-4 my-3`}>Collection</h2>
  <span className='text-[14px] text-gray-500'>{res.results} category</span>
</div>
<div className=" grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  grid-cols-1 gap-10 my-5 px-3">
  {data.map((item)=><div key={item._id} className='group overflow-hidden border p-3  rounded-sm shadow-sm'>
<Image src={item.image} alt="" width={100} height={100} className="w-full block  object-contain h-60 transition-transform duration-500 transform group-hover:scale-105 "/>
<div className="flex gap-3 justify-start items-center mt-5">
  <p className=''>{item.name}</p>
  <svg
  viewBox="0 0 14 10"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  aria-hidden="true"
  focusable="false"
  className="w-[15px] icon mt-[2px] icon-arrow transform transition-transform duration-300 group-hover:translate-x-1"
>
  <path
    fillRule="evenodd"
    clipRule="evenodd"
   d="M8.537.808a.5.5 0 01.817-.162l4 4a.5.5 0 010 .708l-4 4a.5.5 0 11-.708-.708L11.793 5.5H1a.5.5 0 010-1h10.793L8.646 1.354a.5.5 0 01-.109-.546z"
    fill="currentColor"
  />
</svg>
</div>
  </div>)}
</div>
  </div>
}
