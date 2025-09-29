"use client";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import ClearCart from "src/Actions/CartActions/ClearCart.action";
import getUserCart from "src/Actions/CartActions/getUserCart.action";
import { RemoveProduct } from "src/Actions/CartActions/RemoveProductCart.action";
import UpdateCart from "src/Actions/CartActions/UpdateCart.action";
import { CartData, Product } from "src/types/Cart.type";
import { Button } from "src/components/ui/button";
import { CountCart } from "src/Context/CountCart";
import { FaTrashAlt } from "react-icons/fa";
import Link from "next/link";
import Empty from "src/app/_Components/Empty/Empty";
import Image from "next/image";
export default function Cart() {
  const [products, setProducts] = useState<Product[]>([]);
  const [totalPrice, settotalPrice] = useState(0);
  const [idProduct, setIdProduct] = useState("");
  const [loadingRowId, setLoadingRowId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleted, setIsDeleted] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
const context=useContext(CountCart)
if(!context){
   throw new Error("Not Exit")
}
const {setCountCart}=context
  async function checkUserCart() {
    const data: CartData = await getUserCart();
    
    settotalPrice(data.data.totalCartPrice)
    if (data.status == "success") {
      setProducts(data.data.products);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }

  async function deleteProduct(id: string) {
    setIsDeleted(true);
    setLoadingRowId(id);
    const data = await RemoveProduct(id);
    if (data.status == "success") {
      setProducts(data.data.products);
      checkUserCart();
      toast.success("product deleted succussfully", {
        position: "top-center",
        duration: 2000,
      });
      setIsDeleted(false);
           const sum = data.data.products.reduce(
        (total: number, item: { count: number }) => (total += item.count),
        0
      );
      setCountCart(sum);
    } else {
      toast.error("faild deleted", { position: "top-center", duration: 2000 });
      setIsDeleted(false);
    }
  }

  async function UpdateProduct(id: string, count: number) {
    setLoadingRowId(id);
    setIdProduct(id);
    setUpdateLoading(true);
    setIsDisabled(true);
    setIsDeleted(true);
    const data = await UpdateCart(id, count.toString());
    if (data.status == "success") {
      checkUserCart();
      toast.success("product updated succussfully", {
        position: "top-center",
        duration: 2000,
      });
      setProducts(data.data.products);
      setUpdateLoading(false);
      setIsDisabled(false);
      setIsDeleted(false);

      // count cart
      const sum = data.data.products.reduce(
        (total: number, item: { count: number }) => (total += item.count),
        0
      );
      setCountCart(sum);
    } else {
      toast.error("faild updated", { position: "top-center", duration: 2000 });
      setUpdateLoading(false);
      setIsDisabled(false);
      setIsDeleted(false);
    }
    setLoadingRowId("");
  }

  async function clear() {
    setBtnLoading(true);
    setBtnDisabled(true);
    const data = await ClearCart();
    if (data.message == "success") {
      checkUserCart();
      toast.success("clear cart succussfully", {
        position: "top-center",
        duration: 2000,
      });
      setProducts([]);
      setBtnLoading(false);
      setBtnDisabled(false);
      setCountCart(0)
    } else {
      toast.error("faild clear items", {
        position: "top-center",
        duration: 2000,
      });
      setBtnLoading(false);
      setBtnDisabled(false);
    }
  }
  
  useEffect(() => {
    checkUserCart();
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <span className="loader"></span>
      </div>
    );
  }
  return (
    <>
      {products.length > 0 ? (
        <div className="lg:w-[80%] mx-auto my-16 w-full">
          <div className="flex  justify-between items-center mb-8">
            <div className="flex flex-col">
               <h2 className="text-[35px] text-gray-900 font-medium"> Your cart</h2>
              <Link href="/home"><p className="text-[13px] font-light underline underline-offset-[5px]">Continue shopping</p></Link>
            </div>
            <Button
              onClick={() => clear()}
              disabled={btnDisabled}
              className="disabled:bg-[#bc9c48] cursor-pointer rounded-none text-[.8em] btn"
            >
              {btnLoading ? (
                <i className="fas fa-spinner fa-spin "></i>
              ) : (
                "CLEAR CART ITEM"
              )}
            </Button>
         
          </div>
          <div className="relative overflow-x-auto shadow-sm  mt-3 mb-10 lg:block hidden  ">
            <table className="w-full  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
              <thead className="text-xs border-b  border-b-gray-300 text-gray-500 uppercase  dark:bg-gray-700 dark:text-gray-400 text-center">
                <tr className="">
                  <th scope="col" className="px-6 py-3 lg:w-[50%] text-start">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3 lg:w-[25%] ">
                    Quantity
                  </th>
                  <th scope="col" className="px-6 py-3 lg:w-[25%] ">
                    Subtotal
                  </th>
                </tr>
              </thead>
              <tbody className="text-center ">
                {products.map((product) => (
                  <>
                    <tr
                      key={product.product.id}
                      className="bg-white border-b relative  dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      {loadingRowId === product.product.id && (
                        <div className="absolute inset-0 items-center flex justify-center bg-[#efebe97b] z-10">
                          <span className="loader2"></span>
                        </div>
                      )}
                      <td className="px-6 py-4 flex gap-3 items-center lg:flex-row flex-col">
            <div className="flex flex-row items-center justify-center">
              <td>
                          <button
                          disabled={isDeleted}
                          className="  rounded-full size-[28px]  flex items-center justify-center border-2 border-[#dfba5b] cursor-pointer hover:border-[#bc9c48] transition-colors"
                          onClick={() => deleteProduct(product.product.id)}
                        >
                             <div className="transition-colors hover:text-[#bc9c48] text-[#dfba5b] text-[15px]">
                                                 <FaTrashAlt />
                                               </div>
                        </button>
            </td>
                        <Image height={100} width={100}
                          src={product.product.imageCover}
                          className="w-16 md:w-32 max-w-full max-h-full "
                          alt="Apple Watch"
                        />
            </div>
                    <div className="flex flex-col items-start justify-center">
                          <Link href={`products/${product.product.id}`}> <p className="w-full relative hover:text-[#c3a14c] 
     after:absolute after:content-[''] after:top-7 after:left-1/2 
      after:h-[2px] after:bg-[#c3a14c] after:w-0 hover-after:w-[40%]
     hover:after:-translate-x-1/2 after:transition-all after:duration-300
     hover:after:bg-[#c3a14c] hover:after:w-full">
    {product.product.title}
  </p></Link>
                          <p className=" py-4 font-semibold text-black dark:text-white text-[15px]">
                       Price : <span className="text-main text-[13px]">{product.price}.00 $</span>
                      </p>
                    </div>
                      </td>
                      <td className="px-6 py-4 ">
                        <div className="flex items-center justify-center">
                          <button
                            disabled={isDisabled}
                            onClick={() =>
                              UpdateProduct(
                                product.product.id,
                                product.count - 1
                              )
                            }
                            className="inline-flex items-center disabled:text-gray-500 justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
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
                            {idProduct === product.product.id ? (
                              updateLoading ? (
                                <span>
                                  <i className="fas fa-spinner fa-spin"></i>
                                </span>
                              ) : (
                                <span>{product.count}</span>
                              )
                            ) : (
                              <span>{product.count}</span>
                            )}
                          </div>
                          <button
                            disabled={isDisabled}
                            onClick={() =>
                              UpdateProduct(
                                product.product.id,
                                product.count + 1
                              )
                            }
                            className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 disabled:text-gray-500 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
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
                      </td>
                    
                      <td className="px-6 py-4 font-semibold  dark:text-white text-main">
                        {product.price * product.count}.00 $
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>
          {/* responsive */}
   <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-3 mb-10 lg:hidden">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
              <thead className="text-xs text-gray-500 uppercase border-b border-gray-300 dark:bg-gray-700 dark:text-gray-400 text-center">
                <tr>
                  <th scope="col" className="px-6 py-3 w-full text-start">
                    Product
                  </th>
                </tr>
              </thead>
              <tbody className="text-center">
                {products.map((product) => (
                  <>
                    <tr
                      key={product.product.id}
                      className="bg-white border-b relative  dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      {loadingRowId === product.product.id && (
                        <div className="absolute items-center inset-0 flex justify-center bg-[#efebe97b] z-10">
                          <span className="loader2"></span>
                        </div>
                      )}
                      <td className="px-6 py-4 flex gap-5 items-center flex-row ">
            <div className="flex  items-center justify-center">
                          <button
                          disabled={isDeleted}
                          className="  rounded-full  p-1  flex items-center justify-center border-2 border-[#dfba5b] cursor-pointer hover:border-[#bc9c48] transition-colors"
                          onClick={() => deleteProduct(product.product.id)}
                        >
                             <div className="transition-colors hover:text-[#bc9c48] text-[#dfba5b] text-[12px]">
                                                 <FaTrashAlt />
                                               </div>
                        </button>
                        <Image height={100} width={100}
                          src={product.product.imageCover}
                          className="w-full"
                          alt={product.product.title}
                        />
            </div>
                    <div className="flex flex-col items-start justify-center w-full">
                        <Link href={`products/${product.product.id}`}> <p className="w-full relative hover:text-[#c3a14c] 
     after:absolute after:content-[''] after:top-7 after:left-1/2 
      after:h-[2px] after:bg-[#c3a14c] after:w-0 hover-after:w-[40%]
     hover:after:-translate-x-1/2 after:transition-all after:duration-300
     hover:after:bg-[#c3a14c] hover:after:w-full">
    {product.product.title}
  </p></Link>
                          <p className=" py-4 font-semibold text-black dark:text-white text-[15px]">
                       Price : <span className="text-[10px] text-gray-600">{product.count}X</span> <span className="text-main text-[13px]">{product.price}.00 $</span>
                      </p>
                          <div className="border border-gray-700 py-2 px-[6px] w-[50%] ">
                        <div className="flex items-center justify-between">
                          <button
                            disabled={isDisabled}
                            onClick={() =>
                              UpdateProduct(
                                product.product.id,
                                product.count - 1
                              )
                            }
                            className="inline-flex items-center disabled:text-gray-500 justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
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
                            {idProduct === product.product.id ? (
                              updateLoading ? (
                                <span>
                                  <i className="fas fa-spinner fa-spin"></i>
                                </span>
                              ) : (
                                <span>{product.count}</span>
                              )
                            ) : (
                              <span>{product.count}</span>
                            )}
                          </div>
                          <button
                            disabled={isDisabled}
                            onClick={() =>
                              UpdateProduct(
                                product.product.id,
                                product.count + 1
                              )
                            }
                            className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 disabled:text-gray-500 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
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
                    </div>
                      </td>
                  
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>
          <div className='flex items-end flex-col border-t pt-15 lg:px-10 '>
  <div className="flex items-center justify-center mb-4">

            <p className="font-semibold text-[15px]">Subtotal : 
   </p>
   <span className="text-main font-semibold ms-2"> {totalPrice}.00 $</span>
           </div>
           <Link href="/payment"><Button className='btn cursor-pointer  rounded-none py-4 px-12 text-[.8em] uppercase'>Checkout</Button></Link>
         
          </div>
        </div>
      ) : (
       <Empty isComponent={true}/>
      )}
    </>
  );
}
