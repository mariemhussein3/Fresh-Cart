"use server"

import getMyToken from "src/utilities/getMyToken"

export async function RemoveFromWishList(id:string){
try{
    const token =await getMyToken();
if(!token){
    throw new Error ("please login first!!")
}
const res =await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/wishlist/${id}`,{
    method:"DELETE",
    headers:{
         token,
      "Content-Type": "application/json",
    },
});
const payload=await res.json()
return payload
}
catch(err){
return err;
}

}