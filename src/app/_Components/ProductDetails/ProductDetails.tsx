"use client"
import Image from 'next/image';
import { productItem } from 'src/types/productDetails.type';

import AddBtn from '../AddBtn/AddBtn';
import React, { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import getUserCart from "src/Actions/CartActions/getUserCart.action";
import UpdateCart from "src/Actions/CartActions/UpdateCart.action";
import { CartData, Product } from "src/types/Cart.type";
import { CountCart } from "src/Context/CountCart";

import DetailsSlider from '../Sliders/DetailsSlider';
import WishListBtn from '../WishListBtn/WishListBtn';
import { Wix_Madefor_Text } from 'next/font/google';
const wixFont = Wix_Madefor_Text({
  weight:["400","500","600","700","800"]
});
export default function ProductDetails({product}:{product:productItem}) {
  const context=useContext(CountCart)
  const{title,description,imageCover,category:{name},price,ratingsAverage,images,_id}=product  
  const [products, setProducts] = useState<Product[]>([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  useEffect(() => {
    checkUserCart();
  }, []);
  if(!context){
     return <div>Error: CountCart context not found</div>;
  }
  const {setCountCart}=context
    if (!product) {
    return <div className='h-screen flex items-center justify-center'>
  <span className="loader"></span>
  </div>
  }
  async function checkUserCart() {
 
    const data: CartData = await getUserCart();    
    if (data.status == "success") {
      setProducts(data.data.products);
    } else {
    }
  }
  
  async function UpdateProduct(_id: string, count: number) {
        setUpdateLoading(true);
   setIsDisabled(true)
    const data = await UpdateCart(_id, count.toString());
    if (data.status == "success") {
   
      toast.success("product updated succussfully", {
        position: "top-center",
        duration: 2000,
      });

      setProducts(data.data.products);
      const sum = data.data.products.reduce(
        (total: number, item: { count: number }) => (total += item.count),
        0
      );      
      setCountCart(sum);
    } else {

      toast.error("faild updated", { position: "top-center", duration: 2000 });
    }
           setUpdateLoading(false);
       setIsDisabled(false)
  }
  const currentProduct = products.find((item) => item.product.id=== _id);


 
  return <>
   <div className={`flex justify-between items-start mt-20 lg:w-[75%] flex-col lg:flex-row mx-auto full gap-14 ${wixFont.className}`}>
        <div className="lg:w-[50%] w-full lg:block hidden overflow-hidden">
          <div className="relative group lg:mb-5">
            <Image src={imageCover} width={100} height={100}  alt={title} 
          className="w-full block h-96 object-contain"/>
          <span className='absolute top-0 right-[-50px] group-hover:right-[25px] group-hover:duration-500 group-hover:transition-all '>

        <WishListBtn id={_id}/>
          </span>
          </div>
<div className="grid grid-cols-2 gap-3">
    {images.map((image, index) => (
      <Image
        key={index}
        src={image}
        width={100}
        height={100}
        alt={title}
        className="w-full  block h-96 object-cover"
      />
    ))}
  </div>

            </div>
         <div className="w-full sm:w-[90%] mx-auto block lg:hidden overflow-hidden ">
<div className="relative group">

             <DetailsSlider images={images}/>
                     <span className='absolute top-0 right-[-50px] group-hover:right-[25px] group-hover:duration-500 group-hover:transition-all '>
  <WishListBtn id={_id}/>
</span>
</div>
         </div>

        <div className="lg:w-[50%] w-full flex gap-3 flex-col sticky top-30">
          <span className="text-[11px] text-gray-400 uppercase font-bold">freshcart</span>
          <h1 className="text-[26px] font-medium uppercase line-clamp-2">{title}</h1>
          <p className='text-gray-700 text-[16px] lg:text-[14px]'>{description}</p>
          <span>{name}</span>
          <div className="flex justify-between">
        <span className='text-[13px] text-gray-600'>LE {price}.00 EPG</span>
            <div className="">
              <i className="fa-solid fa-star pr-3 rating-color "></i>
              <span>{ratingsAverage}</span>
            </div>
          </div>
    <div className="">


            <span>Quantity ({(currentProduct?.count)||0} in cart)</span>

                       <div className="flex items-center justify-between border border-black w-[30%] py-3 px-3 my-5">
                          <button
                            disabled={isDisabled||(currentProduct?.count||0)==0}
                            onClick={() =>
                          UpdateProduct(
                                _id,
                                (currentProduct?.count||0)-1
                              )}
                            
                            className="inline-flex items-center disabled:text-gray-400 justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-black bg-white   focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                            type="button"
                          >
                            <span className="sr-only">Quantity button</span>
                            <svg
                              className="w-2 h-2 "
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 18 2"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M1 1h16"
                              />
                            </svg>
                          </button>
                          <div>
                              {updateLoading ? (
                                <span>
                                  <i className="fas fa-spinner fa-spin"></i>
                                </span>
                              ) : (
                                <span>{(currentProduct?.count||0)}</span>
                              )
                       }
                          </div>
                          <button
                            disabled={isDisabled}
                            onClick={() =>
                              UpdateProduct(
                               _id,
                              (currentProduct?.count||0)+1
                              )
                            }
                            className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 disabled:text-gray-400 text-sm font-medium text-black bg-white focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                            type="button"
                          >
                            <span className="sr-only">Quantity button</span>
                            <svg
                              className="w-2 h-2"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 18 18"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 1v16M1 9h16"
                              />
                            </svg>
                          </button>
                        </div>
    </div>

      <div className="w-full ">
 <AddBtn id={_id} icon={false}/>
      </div>
     
        </div>


      </div>
  </>
}

