"use server"

export default async function FilteringProducts(sort:string) {

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/products/?sort=${sort}`);
  const payload=await res.json()
  return payload;
}
