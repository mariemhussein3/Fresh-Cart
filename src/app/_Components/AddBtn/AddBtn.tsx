"use client"
import React, { useContext, useState } from 'react'
import { toast } from 'sonner';
import AddToCart from 'src/Actions/CartActions/AddToCart.action'
import { Button } from 'src/components/ui/button'
import { CountCart } from 'src/Context/CountCart';
import { CartData } from 'src/types/Cart.type';
import { FaCartShopping } from "react-icons/fa6";
export default function AddBtn({id,icon}:{id:string,icon:boolean}) {
  const context=useContext(CountCart)
  if(!context){
    throw new Error("Not Exit")
  }
  const {setCountCart}=context
  const [isLoading, setIsLoading] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)
 async function checkAddProduct(id:string){
  setIsLoading(true)
  setIsDisabled(true)
    const data:CartData=await AddToCart(id);
if(data.status=="success"){
  setIsLoading(false)
    setIsDisabled(false)

  toast.success(data.message,{position:"top-center",duration:2000})
       const sum = data.data.products.reduce(
        (total: number, item: { count: number }) => (total += item.count),
        0
      );
      setCountCart(sum);
}
else{
  setIsLoading(false)
    setIsDisabled(false)

  toast.error(data.message,{position:"top-center",duration:2000})
}
  }
// CartData
  return<>
           {!icon&& <Button disabled={isDisabled} onClick={()=>{checkAddProduct(id)}} className='disabled:bg-[#dfba5be8] rounded-none py-[21px] px-[1.2em] btn w-full cursor-pointer mt-2 text-[.8em]'>{isLoading?<i className="fas fa-spinner fa-spin"></i>:"ADD TO CART"}</Button>}
            {icon&&
            <FaCartShopping className="cursor-pointer hover:text-red-600" onClick={()=>{checkAddProduct(id)}}/>
            }
  </>
}
