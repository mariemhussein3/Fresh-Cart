"use server"
import getMyToken from "src/utilities/getMyToken";

export async function CreateCheckoutOrder(cartId: string, shippingAddress:unknown) {
  const token = await getMyToken();
  if (!token) {
    throw new Error("please login!!!");
  }
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/orders/checkout-session/${cartId}?url=http://localhost:3000`,{
    method: "POST",
    headers:{
        token,
        "Content-Type": "application/json",
    },
    body:JSON.stringify({shippingAddress})
  });
  const payload=await res.json();
  return payload;
}
