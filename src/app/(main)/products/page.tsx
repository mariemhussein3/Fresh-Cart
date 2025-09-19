import { Metadata } from 'next';
import React from 'react'

import ProductApi from 'src/services/product.api';
  import { product, ProductType } from "src/types/products.type";
import FilteringProducts from '../../_Components/FilteringProduct/FilteringProducts';
import { Encode_Sans_Expanded } from 'next/font/google';
  
  export const metadata: Metadata = {
    title: "All Products",
  };
    const encodeFont = Encode_Sans_Expanded({
  weight:["400","500","600"]
  });

export default async function Products() {

const res:{payload:ProductType,allProducts:product[]}= await ProductApi();

  return <>
   <div className= {`${encodeFont.className}  mt-10  antialiased`}>
<FilteringProducts res={res}/>
   </div>

  </>
}
