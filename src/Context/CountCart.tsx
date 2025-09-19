"use client"
import React, { createContext, useState, ReactNode, Dispatch, SetStateAction, useEffect } from "react"
import getUserCart from "src/Actions/CartActions/getUserCart.action"
import { CartData } from "src/types/Cart.type"
import getMyToken from "src/utilities/getMyToken"
type CountCartContextType = {
  countCart: number
  setCountCart: Dispatch<SetStateAction<number>>
}
export const CountCart = createContext<CountCartContextType | null>(null)
export default function CountCartProvider({ children }: { children: ReactNode }) {
  const [countCart, setCountCart] = useState(0)
 async function getCart(){
const token=await getMyToken();
if(token){
const data:CartData=await getUserCart()
const sum=data.data.products.reduce((total,item)=>total+=item.count,0)
setCountCart(sum)
}
  }
  useEffect(()=>{
    getCart();
  },[])
  return (
    <CountCart.Provider value={{ countCart, setCountCart }}>
      {children}
    </CountCart.Provider>
  )
}
