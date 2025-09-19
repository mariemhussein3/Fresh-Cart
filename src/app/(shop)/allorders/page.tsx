import { Metadata } from 'next';
import Image from 'next/image';
import React from 'react'
import { GetAllOrder } from 'src/Actions/OrdersActions/GetAllOrders'
import { AllOrders, CartItem } from 'src/types/Order.type';
  import { Wix_Madefor_Text } from 'next/font/google';
       const wixFont = Wix_Madefor_Text({
    weight:["400","500","600","700","800"]
    });
  export const metadata: Metadata = {
    title: "Orders",
    description: "Browse our best-selling products with amazing discounts.",
  };
export default async function Orders() {
    const data:AllOrders[] = await GetAllOrder()
    if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">No orders found</p>
      </div>
    );
  }
  return <>
  <div className="lg:w-3/4 mx-auto w-full my-16">
<h1 className={`text-[30px] text-slate-700 ${wixFont.className} tracking-4 my-3 `}>Your orders</h1>
 <div className="lg:w-[60%] md:w-[70%] w-full  flex flex-col gap-7">
{data.map((item)=><div key={item._id} className='flex flex-col w-full lg:bg-gray-50  py-4 lg:px-5'>
  <div className="flex flex-col w-full gap-5">
  {item.cartItems.map((order:CartItem)=><div key={order._id} className='flex justify-between items-center'>
<div className="left-side flex gap-2 items-center justify-center">
<div className="relative">
  <Image width={100} height={100} className='w-[85px] border-2 ' src={order.product.imageCover} alt={order.product.title}/>
  <span className='absolute top-[0px] -right-2 rounded-full p-[10px] flex items-center justify-center size-[10px] text-[9px] text-gray-100 bg-gray-500'>{order.count}</span>
</div>
<div className="flex flex-col justify-center items-start">
  <p>{order.product.title.split(" ").slice(0,2).join(" ")}</p>
  <span className='text-[13px] text-gray-500 font-medium'>{order.product.brand.name}</span>
</div>
</div>
<div className="right-side">
  <p className='text-[14px] text-main font-medium mb-6'>
{order.price*order.count}.00 EGP</p>
</div>
</div>
)}
</div>
<div className='flex items-center justify-between my-5 font-bold text-[16px]'>
<p className='text-slate-700'>Total Price  </p>
<span className='text-main'>
  <span className='text-[12px] text-gray-500'>
EGP
</span> {item.totalOrderPrice}.00 EGP</span>
</div>
</div>
)}
</div> 
  </div>
  
  </>
}
