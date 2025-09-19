  import { product, ProductType } from "src/types/products.type";

export default async function ProductApi() {
  let allProducts: product[] = [];
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/products`);

  const payload:ProductType = await res.json();
  const firstRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/products?page=1`);

  const { data: firstPage } = await firstRes.json();
  allProducts = [...firstPage];

    const secondRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/products?page=2`);
    const { data:secondPage } = await secondRes.json();
    allProducts = [...allProducts, ...secondPage];
    
  

  return {payload,allProducts};
}
