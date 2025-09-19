import { Total } from 'src/types/Total.type';
export default async function CategoriesApi() {
  const response=await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/categories`)
  const data:Total=await response.json();
 return data;
}

  