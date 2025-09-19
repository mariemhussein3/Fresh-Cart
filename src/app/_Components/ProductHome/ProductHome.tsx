import React from 'react'
import ProductApi from 'src/services/product.api';
import { product, ProductType } from 'src/types/products.type';
import { Button } from 'src/components/ui/button'
import ProductCard from '../ProductCard/ProductCard';
import Link from 'next/link';

export default async function ProductHome() {
      const {payload}:{payload:ProductType}=await ProductApi()
       const  productsHome=  payload.data.slice(0,10)
       
  return  <div className="my-7">
    <div className="my-10">
          <h2 className='text-start lg:text-[18px] text-[20px] text-slate-700 font-medium my-4 tracking-4 first-letter:text-red-600'>Our Products</h2>
          <div className="grid xl:grid-cols-5 md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-4 ">
               {productsHome.map((productCard:product)=><ProductCard key={productCard._id} productCard={productCard}/>)}
            </div>
    </div>
           <div className="flex justify-center text-center mx-auto lg:w-[70%] w-full">

            <Link href="/products"> <Button className="text-center cursor-pointer px-[50px] rounded-none w-full text-[13px] py-[21px] btn">VIEW ALL</Button></Link>
           </div>
    </div>
}
