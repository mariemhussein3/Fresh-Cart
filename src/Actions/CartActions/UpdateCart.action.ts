"use server";

import getMyToken from "src/utilities/getMyToken";

export default async function UpdateCart(id: string,count:string) {
  const token = await getMyToken();
  if (!token) throw new Error("please login first");

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/cart/${id}`, {
    method: "PUT",
    headers: {
      token,
      "Content-Type": "application/json",
    },
    body:JSON.stringify({
        count
    })
  });
  const payload=await res.json()
  return payload
}
