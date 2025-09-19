"use server"
import getMyToken from "src/utilities/getMyToken";

export async function CreateCashOrder(id: string, shippingAddress:{phone:string,city:string,details:string}) {
  const token = await getMyToken();
  if (!token) {
    throw new Error("please login!!!");
  }
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/orders/${id}`,{
    method: "POST",
    headers:{
        token,
        "Content-Type": "application/json",
    },
    body:JSON.stringify({"shippingAddress":shippingAddress})
  });
  const payload=await res.json();
  
  return payload;
}
