import React from 'react'
import { Button } from 'src/components/ui/button'
import  Link  from 'next/link';
import { Wix_Madefor_Text } from 'next/font/google';
   const wixFont = Wix_Madefor_Text({
  weight:["400","500","600","700","800"]
  });
export default function Empty({isComponent}:{isComponent:boolean}) {
  return<>
<div className={`w-[70%] flex flex-col justify-center items-center mt-26 mx-auto ${wixFont.className}`}>


<div className="flex gap-7 flex-col justify-center items-center">
          
 {isComponent&& <h1 className='text-[45px] text-slate-700 tracking-4 text-center'>Your cart is empty
</h1>}
   {!isComponent&& <h1 className='text-[45px] text-slate-700 tracking-4 text-center'>Your Wishlist is empty
</h1>}        


<Link href="/"><Button className="cursor-pointer btn rounded-none px-[30px] py-5 text-[15px]">Continue shopping</Button></Link>
</div>
</div>

  </>
}
