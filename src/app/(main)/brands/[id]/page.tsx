
import Image from 'next/image';
import React from 'react'
import { getSpecificBrands } from 'src/services/SpecificBrand.api';
import { Metadata } from 'next';
  export const metadata: Metadata = {
    title: "Brand Details",
  };
export default async function SpecificBrand({params}:{params:Promise<{id:string}>}) 
{
const {id}=await params ;
const data =await getSpecificBrands(id)
const brand=data.data

  return <>
<div className=" mx-auto items-center flex-col flex h-[80vh] justify-center w-3/4 ">
  
          <div className=" border border-gray-200 p-3 w-1/2">
           <div className="">
             <Image src={brand.image} width={100} height={100} alt="" className="w-full block" />
           </div>
            <p className='text-[30px] font-medium text-gray-800'>{brand.name}</p>
        </div>
</div>
  </>
}
