"use server"
import getMyToken from "src/utilities/getMyToken";

export default async function AddToCart(id: string) {
 try{
 const token = await getMyToken();
  if (!token) {
    throw new Error("please login first!");
  }
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/cart`, {
    method: "POST",
    headers: {
      token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      productId:id}),
  });
  const payload=await res.json()
  return payload;
 } catch(err){  
return err
 }
}
