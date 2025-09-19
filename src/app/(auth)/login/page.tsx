import React from 'react'
import  Link  from 'next/link';
import LoginDesign from './LoginDesign'
 import { Metadata } from 'next';
 export const metadata: Metadata = {
   title: "Login",
 };
export default function Login() {
  
  return <>
  <div className="lg:w-[30%] md:w-[50%] w-full mx-auto my-28  border border-slate-200 shadow-md  p-5">
    <h2 className="text-[30px] font-normal text-slate-700 text-start my-5">Login</h2>
    <p className="text-[14px] font-medium my-2 text-slate-600">Don&apos;t have an account?<Link href="/register"><span className="text-main ms-2">Create account</span></Link></p>
    <LoginDesign/>
  </div>

  </>

}
