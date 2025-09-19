import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { TotalData } from "src/types/Total.type";
export default function BrandCard({brand}:{brand:TotalData}) {
  return <>
  <Link href={`/brands/${brand._id}`}>
     
        <div key={brand._id} className=" border border-gray-200 p-3">
         <div className="">
           <Image src={brand.image} width={100} height={100} alt="" className="w-full block" />
         </div>
          <p>{brand.name}</p>
      </div>
      </Link>
 
  
  </>
}
