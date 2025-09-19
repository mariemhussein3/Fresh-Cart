"use client";
import React, { useContext  } from "react";
import { toast } from "sonner";
import { WhishList } from "src/Context/WishList.context";
import getMyToken from "src/utilities/getMyToken";
import { AddToWishList } from "src/Actions/WishListActions/AddToWishList.action";
import { GetUserWishList } from "src/Actions/WishListActions/GetUserWishList.action";
import { RemoveFromWishList } from "src/Actions/WishListActions/RemoveFromWishList.action";
export default function WishListBtn({ id }: { id: string }) {
  const context=useContext(WhishList)
  if(!context){
    return null
  }
  const { FavoriteId, setFavoriteId}=context
    const isFavorite = FavoriteId.includes(id);
  async function handleWishList(id: string) {
    if (!isFavorite) {
      const data = await AddToWishList(id);
      if (data.status == "success") {
        toast.success(data.message, { position: "top-center", duration: 2000 });
         //{ if need optimization
          // item=>old array and adding id 
        // setFavoriteId((item) => [...item, id]);}
            const token = await getMyToken();
            if (token) {
              const data = await GetUserWishList();
              if (data.status === "success") {
          const Id = data.data.map((item: {_id:string}) => item._id);
                setFavoriteId(Id);
              }
            }

      } else {
        toast.error(data.message, { position: "top-center", duration: 2000 });
      }
    } else {
      const data = await RemoveFromWishList(id);
      if (data.status == "success") {
        toast.success(data.message, { position: "top-center", duration: 2000 });
        // {if need optimization
      // setFavoriteId((item) => item.filter((idItem) => idItem !== id));}
          const token = await getMyToken();
          if (token) {
            const data = await GetUserWishList();
            if (data.status === "success") {
        const Id = data.data.map((item: {_id:string}) => item._id);
              setFavoriteId(Id);
            }
          }
      } else {
        toast.error(data.message, { position: "top-center", duration: 2000 });
      }
    }
  }


  return (
      <i
        onClick={() => handleWishList(id)}
        className={`${
          isFavorite ? "fa-solid text-red-500" : "fa-regular"
        } fa-heart text-[17px] cursor-pointer`}
      ></i>
  );
}
