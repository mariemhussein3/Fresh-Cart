"use server"

export default async function GetRelatedProducts(cartId:string) {

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/products/?category[in]=${cartId}`);
  const payload=await res.json()
  return payload;
}
