"use server"
import getMyToken from "src/utilities/getMyToken";

export default async function getUserCart() {
  const token = await getMyToken();
  
  if (!token) {
    throw new Error("please login first!");
  }
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/cart`, {
    method: "GET",
    headers: {
      token,
      "Content-Type": "application/json",
    },
  });
  const payload=await res.json()
  return payload;
}
