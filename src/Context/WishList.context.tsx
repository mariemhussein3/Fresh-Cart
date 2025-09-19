"use client"
import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
  createContext
} from "react";
import getMyToken from "src/utilities/getMyToken";
import { GetUserWishList } from "src/Actions/WishListActions/GetUserWishList.action";
type WishlistContextType = {
  FavoriteId:string[],
  setFavoriteId: Dispatch<SetStateAction<string[]>>;
};
export const WhishList = createContext<WishlistContextType | null>(null);
export default function WishListFavoriteProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [FavoriteId, setFavoriteId] = useState<string[]>([]);
  async function getWishList() {
    const token = await getMyToken();
    if (token) {
      const data = await GetUserWishList();
      if (data.status === "success") {
  const Id = data.data.map((item: {_id:string}) => item._id);
        setFavoriteId(Id);
      }
    }
  }
  useEffect(() => {
    getWishList();
  }, []);
 
  return (
    <WhishList.Provider value={{ setFavoriteId, FavoriteId}}>
      {children}
    </WhishList.Provider>
  );
}
