import {productDetails } from 'src/types/productDetails.type'

export default async function productDetailsApi(id:string) {
const response=await fetch(`https://ecommerce.routemisr.com/api/v1/products/${id}`,{
       headers: {"Content-Type": "application/json"},
    })

const payload:productDetails=await response.json();
return payload;
}
