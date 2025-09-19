"use client";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import AddBtn from "src/app/_Components/AddBtn/AddBtn";
import { WhishList } from "src/Context/WishList.context";
import { productFavorite, WishlistType } from "src/types/WishList.type";
import getMyToken from "src/utilities/getMyToken";
import { GetUserWishList } from "src/Actions/WishListActions/GetUserWishList.action";
import { RemoveFromWishList } from "src/Actions/WishListActions/RemoveFromWishList.action";
import { FaTrashAlt } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import Empty from "src/app/_Components/Empty/Empty";

export default function WishList() {
    useEffect(() => {
    getAllFavorite();
  }, []);
  const [products, setProducts] = useState<productFavorite[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleted, setIsDeleted] = useState(false);
  const [loadingRowId, setLoadingRowId] = useState("");
  const context = useContext(WhishList);
  if (!context) {
    throw new Error("Not Exit")
  }
  const { setFavoriteId } = context;
  async function getAllFavorite() {
    const data: WishlistType = await GetUserWishList();
    if (data.status == "success") {
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }

    setProducts(data.data);
  }

  async function handleDeleteFavorite(id: string) {
    setIsDeleted(true);
    setLoadingRowId(id);
    const data = await RemoveFromWishList(id);
    if (data?.status == "success") {
      toast.success(data.message, { position: "top-center", duration: 2000 });
      setIsDeleted(false);
      getAllFavorite();
      const token = await getMyToken();
      if (token) {
        const data = await GetUserWishList();
        if (data?.status === "success") {
          const Id = data.data.map((item: {_id:string}) => item._id);
          setFavoriteId(Id);
        }
      }
    } else {
      toast.error(data.message, { position: "top-center", duration: 2000 });
      setIsDeleted(false);
    }
  }
    if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <span className="loader"></span>
      </div>
    )
  }


  return (
    <>
      {products.length > 0 ? (
        <div className="lg:w-[90%] w-full mx-auto my-16 ">
          <div className=" relative overflow-x-auto shadow-md  mt-3">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 lg:table hidden">
              <thead className="text-xs w-full text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-center">
                <tr className=" w-full">
                  <th scope="col" className="px-6 py-3 w-[35%] text-start">
                    Product Name
                  </th>
                  <th scope="col" className="px-6 py-3 w-[35%]">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3 w-[30%]"></th>
                </tr>
              </thead>
              <tbody className="text-center">
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className=" border-b relative dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    {loadingRowId === product.id && (
                      <div className="absolute inset-0 flex items-center justify-center bg-[#efebe97b] z-10">
                        <span className="loader2"></span>
                      </div>
                    )}

                    <td className="px-6 py-4 flex gap-3 items-center">
                      <div>
                        <button
                          disabled={isDeleted}
                          className="  rounded-full size-[28px]  flex items-center justify-center border-2 border-[#dfba5b] cursor-pointer hover:border-[#bc9c48] transition-colors"
                          onClick={() => handleDeleteFavorite(product.id)}
                        >
                          <div className="transition-colors hover:text-[#bc9c48] text-[#dfba5b] text-[15px]">
                            <FaTrashAlt />
                          </div>
                        </button>
                      </div>
                      <Link href={`products/${product.id}`}>
                        <Image
                        width={100}
                        height={100}
                          src={product.imageCover}
                          className="w-32 max-w-full max-h-full"
                          alt={product.title}
                        />
                      </Link>
                         <Link href={`products/${product.id}`}>
                        <p className="w-40 relative hover:text-[#c3a14c]  hover:after:absolute hover:after:content-[''] hover:after:top-7 hover:after:left-0 hover:after:w-[70%] hover:after:h-[2px] after:bg-[#c3a14c] hover:after:ms-6 hover:transition-all hover:duration-300  hover:after:transition-all hover:after:duration-300 "> {product.title.split(" ").slice(0, 2).join("")}</p>
                         </Link>
                    </td>

                    <td className="px-6 py-4 font-semibold text-main dark:text-white">
                      {product.price} $
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      <div className="lg:w-[60%] w-full">
                        <AddBtn icon={false} id={product.id} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* resposive */}
                   <table className="w-full text-sm text-left rtl:text-right text-gray-500  dark:text-gray-400 block lg:hidden">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-center">
                <tr>
                  <th scope="col" className="px-6 py-3 w-full text-start">
                    Product Name
                  </th>
                </tr>
              </thead>
              <tbody className="text-center bg-gray-50">
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className=" border-b relative flex flex-col dark:bg-gray-800 dark:border-gray-700 bg-gray-50 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    {loadingRowId === product.id && (
                      <td className="absolute inset-0 flex items-center justify-center bg-[#efebe97b] z-10">
                        <span className="loader2"></span>
                      </td>
                    )}

                    <td className="px-2 py-2 pb-0 flex gap-3 items-center ">
                      <div className="items-center flex justify-center w-1/2">
                        <button
                          disabled={isDeleted}
                          className=" rounded-full  p-1  flex items-center justify-center border-2 border-[#dfba5b] cursor-pointer hover:border-[#bc9c48] transition-colors"
                          onClick={() => handleDeleteFavorite(product.id)}
                        >
                          <div className="transition-colors hover:text-[#bc9c48] text-[#dfba5b] text-[12px]">
                            <FaTrashAlt />
                          </div>
                        </button>
                      <Link href={`products/${product.id}`}>
                        <Image
                        width={200}
                        height={200}
                          src={product.imageCover}
                          className="w-full"
                          alt={product.title}
                        />
                      </Link>
                      </div>
                        <div className="flex flex-col items-center justify-center w-1/2">
                           <Link href={`products/${product._id}`}> <p className="w-full relative hover:text-[#c3a14c] 
     after:absolute after:content-[''] after:top-7 after:left-1/2 
      after:h-[2px] after:bg-[#c3a14c] after:w-0 hover-after:w-[40%]
     hover:after:-translate-x-1/2 after:transition-all after:duration-300
     hover:after:bg-[#c3a14c] hover:after:w-full">
    {product.title}
  </p></Link>
                              <p className="py-4 font-semibold text-gray-900 dark:text-white">
                     Price : <span className="text-main">{product.price} $</span>
                    </p>
                        </div>
                    </td>

               
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white mb-3">
                      <div className=" w-full">
                        <AddBtn icon={false} id={product.id} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
       <Empty isComponent={false}/>
      )}
    </>
  );
}
