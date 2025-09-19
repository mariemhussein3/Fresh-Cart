import React from 'react'
import ProductApi from 'src/services/product.api'

import {  ProductType } from 'src/types/products.type';
import RatedAnimation from '../Animations/RatedAnimation/RatedAnimation';
export default async function MostRated() {
    const {payload}:{payload:ProductType}=await ProductApi()
   const ratedProducts=  payload.data.filter((ele)=>ele.ratingsAverage>=4.8).sort((a, b) => b.ratingsAverage - a.ratingsAverage);
       
  return <>
  <div className="my-10">
    <h2 className='text-start lg:text-[18px] text-[20px] text-slate-700 font-medium my-4 tracking-4 first-letter:text-red-600'>Bestseller</h2>
        <RatedAnimation ratedProducts={ratedProducts}/>
  </div>
  
  </>
}
