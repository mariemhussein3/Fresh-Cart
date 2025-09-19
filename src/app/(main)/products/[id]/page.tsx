import React from "react";
import productDetailsApi from "src/services/productDetails.api";
import ProductDetails from "../../../_Components/ProductDetails/ProductDetails";
import { Metadata } from 'next';
import GetRelatedProducts from "src/Actions/Products/GetRelatedProducts";
import {  productItem } from "src/types/productDetails.type";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import WishListBtn from "src/app/_Components/WishListBtn/WishListBtn";
import AddBtn from "src/app/_Components/AddBtn/AddBtn";

  export const metadata: Metadata = {
    title: "Product Details",
  };
export default async function productDetails({
  params,
}:{
  params: Promise< { id: string }>;
}) {
  const { id } = await params;
  const data = await productDetailsApi(id);
  const product = data.data;  
if(!data) return <h1 className="text-center text-main">there is not data</h1>
const relatedProduct=await GetRelatedProducts(product.category._id);

  return (
    <>
      <ProductDetails product={product}/>

      <div className=" my-20">

         <h2 className=" px-1 text-start  lg:text-[18px] text-[20px] text-slate-700 font-medium my-4 tracking-4 first-letter:text-red-600">Related Products</h2>
      <div className="grid xl:grid-cols-5 md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-4">
       
         {relatedProduct.data.map((productCard:productItem)=>  <Card key={productCard._id} className="gap-3 relative group overflow-hidden rounded-sm">
     <Link href={`/products/${productCard._id}`}>
        <CardHeader >
          <Image src={productCard.imageCover} width={200} height={200} className="w-full " alt={productCard.title}></Image>
        </CardHeader>
        <CardContent>
          <CardDescription className="mt-2 font-medium line-clamp-1 text-[16px]">
            {productCard.title}
          </CardDescription>
        </CardContent>
        <CardFooter>
          <CardContent className="p-0 my-2 flex justify-between w-full text-[14px] ">
            <span className="text-main font-bold text-[13px]">{productCard.price}.00 EPG</span>
            <div className="">
              <i className="fa-solid fa-star pr-3 rating-color "></i>
              <span>{productCard.ratingsAverage}</span>
            </div>
          </CardContent>
        </CardFooter>
     </Link>
     <div className="px-3 top-10 right-[-40px] group-hover:right-0 absolute group-hover:transition-all  group-hover:duration-500 flex items-center justify-start flex-col gap-4">
     <WishListBtn id={productCard._id}/>
      <AddBtn id={productCard._id} icon={true}/>
     </div>
      </Card>)}
      </div>
      </div>

    </>
  );
}
