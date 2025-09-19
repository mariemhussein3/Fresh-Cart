"use client"
import React, { useRef, useState } from 'react'
import { product } from 'src/types/products.type';
import { Input } from 'src/components/ui/input';
import ProductCard from 'src/app/_Components/ProductCard/ProductCard';
import { motion } from 'framer-motion';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu';
export default function FilteringProducts({res}:{res:{allProducts:product[]}}) {
    const ref=useRef<HTMLInputElement>(null)
    const [search, setSearch] = useState("");
    const[sorted,setSorted]=useState("")
    function handleSearch() {
      if (ref.current) {
        setSearch(ref.current.value);
      }
    }
    const FilterSearch= res.allProducts?.filter((product:{category:{name:string},title:string})=>product.category.name.toLowerCase().includes(search.toLowerCase())
    ||
    product.title.toLowerCase().includes(search.toLowerCase())
  ) || []
  let productsToShow = search ? FilterSearch : res.allProducts;
  // sort products
  function handleSorted(sortItem:string){
setSorted(sortItem)
  }
  if(sorted=="low"){
     productsToShow = productsToShow.sort((a, b) => a.price - b.price);
  }
  else if(sorted=="high")
  {
     productsToShow = productsToShow.sort((a, b) => b.price - a.price);

  }
  return (
    <div className='mt-15'>
        <div className='lg:w-[35%] mx-auto w-full my-4'>
              <Input ref={ref} onChange={handleSearch} className='focus-visible:border-gray-600 focus-visible:ring-none focus-visible:ring-[0px] rounded-none  border-gray-600 py-5' placeholder='Search By Title or Name Product'/>
          </div>
            <div className="flex justify-between items-center ">
           <DropdownMenu  modal={false}>

  <DropdownMenuTrigger className="flex items-center justify-center rounded-none "> 
<div className="border border-gray-200 shadow-md flex items-center justify-center gap-3  px-4 py-2">

  <p className="mb-1 text-slate-700 font-medium text-[14px]">  {sorted === "high"
          ? "Price: High to Low"
          : sorted === "low"
          ? "Price: Low to High"
          : "Default Sorting"}</p>
        <svg
      aria-hidden="true"
      focusable="false"
      className="w-3 h-3 text-gray-600"
      viewBox="0 0 10 6"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.354.646a.5.5 0 0 0-.708 0L5 4.293 1.354.646a.5.5 0 1 0-.708.708l4 4a.5.5 0 0 0 .708 0l4-4a.5.5 0 0 0 0-.708"
        fill="currentColor"
      />
    </svg>
</div>
    </DropdownMenuTrigger>
  <DropdownMenuContent className='mt-2 ml-2  py-3 pb-3 rounded-none absolute z-50 w-[13rem]'  >
    <DropdownMenuItem  className="rounded-none text-slate-700 font-medium"  onClick={() => setSorted("")}>Default sorting</DropdownMenuItem>
    <DropdownMenuItem className="rounded-none text-slate-700 font-medium" onClick={ ()=>handleSorted("high")}>To High Price</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem  className="rounded-none text-slate-700 font-medium" onClick={ ()=>handleSorted("low")}>To Low Price</DropdownMenuItem>

  </DropdownMenuContent>
</DropdownMenu>
            <span className='text-[14px] text-gray-500'>{productsToShow.length} Product</span>
          </div>
           <div className="grid xl:grid-cols-5 md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-4 my-5">
             
    {productsToShow.map((productCard)=>(
<motion.div
key={productCard._id}
                         className=""
                         initial={{ y: 120, opacity:1 }}
                         whileInView={{ y: 0, opacity: 1 }}
                         transition={{ duration: 1 }}
                         viewport={{ once: true,amount:.6}}
           
                       >
                       <ProductCard  productCard={productCard}/>
                       </motion.div>
    ))}
 </div>
    </div>
  )
}
