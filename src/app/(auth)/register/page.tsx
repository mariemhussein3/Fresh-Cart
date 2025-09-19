import React from 'react'
import  Link  from 'next/link';
import RegisterDesign from './RegisterDesign';
 import { Metadata } from 'next';
 export const metadata: Metadata = {
   title: "Register",
 };
export default function Register() {
  return <>
<div className="lg:w-[30%] md:w-[50%] w-full  mx-auto my-20 border border-slate-200 shadow-md  p-5">
  <h2 className='text-[30px] font-normal text-slate-700 text-start my-5 '>Register</h2>
   <p className='text-[14px] font-medium my-3 text-slate-600 '>You have an account?<Link href="/login">
   <span className='text-main ms-2'>Login now</span></Link></p>
<RegisterDesign/>
</div>
  </>
}
