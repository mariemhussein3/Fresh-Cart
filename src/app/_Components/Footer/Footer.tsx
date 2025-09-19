import Link from 'next/link'
import React from 'react'
import { Button } from 'src/components/ui/button'
import { Input } from 'src/components/ui/input'

export default function Footer() {

    return <>
     <footer className="">
       <div className='main-footer bg-[#FBF8F2]  py-12'>
            <div className="w-[90%] mx-auto">
              <div className=" flex items-start lg:flex-row flex-col justify-between text-start gap-5">
                <div className="lg:w-1/4 md:w-1/2 w-full p-2">
                    <h2 className='mb-3  text-slate-800 font-medium '>
                      Features
                    </h2>
                  <Link href="/">  <p  className='mb-3 text-slate-600 hover:underline hover:underline-offset-4 '>Home</p></Link>
                  <Link href="/products">  <p  className='mb-3 text-slate-600  hover:underline hover:underline-offset-4'>Products</p></Link>
                  <Link href="/categories">  <p  className='mb-3 text-slate-600  hover:underline hover:underline-offset-4'>Categories</p></Link>
                  <Link href="/brands">  <p  className='mb-3 text-slate-600 hover:underline hover:underline-offset-4 '>Brands</p></Link>
                </div>


                 <div className="lg:w-1/4 md:w-1/2 w-full p-2">
                    <h2 className='mb-3 text-slate-800 font-medium  '>
                      Instructions
                    </h2>
                    <p className="mb-3 text-slate-600">Store Policy</p>
                    <p className="mb-3 text-slate-600">Shipping & Returns</p>
                    <p className="mb-3 text-slate-600">FAQ</p>

                </div>
                 <div className="lg:w-1/4 md:w-1/2 w-full p-2 flex flex-col lg:items-center">
                    <h2 className='mb-3 text-slate-800  font-medium'>
                     Our Social Media
                    </h2>
                            <ul className='list-unstyled  flex   lg:justify-center gap-2 m-0'>
                    <li><i className="fa-brands  fa-facebook text-slate-600   rounded-full  flex  justify-center "></i></li>
                    <li><i className="fa-brands fa-twitter text-slate-600   rounded-full  flex  justify-center "></i></li>
                    <li><i className="fa-brands fa-linkedin text-slate-600   rounded-full  flex  justify-center "></i></li>
                    <li><i className="fa-brands fa-instagram text-slate-600   rounded-full  flex  justify-center "></i></li>
                    <li><i className="fa-brands fa-tiktok text-slate-600   rounded-full  flex  justify-center "></i></li>
                    <li><i className="fa-brands fa-youtube text-slate-600   rounded-full  flex  justify-center "></i></li>
                  </ul>
                </div>
                      <div className="lg:w-1/4 md:w-1/2  w-full p-2">
                    <h2 className='mb-3 text-slate-800  font-medium'>
                      Contact us
                    </h2>
                   <Input type="email" className="border-slate-800 mt-1 rounded-none py-5 w-full" placeholder="  Enter Your Email"/>
                   <Button className="btn w-full my-6 py-5">Submit</Button>
                </div>
              </div>
            </div>
      </div>
     
     </footer>
  </>
}
