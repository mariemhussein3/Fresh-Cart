"use client"
import React, { useContext, useState } from 'react'
 
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginFormType } from 'src/types/Login.type'
import { schema } from './Login.schema'
import { signIn } from 'next-auth/react'
import { toast } from 'sonner'
import { CountCart } from 'src/Context/CountCart'
import { CartData } from 'src/types/Cart.type'
import getUserCart from 'src/Actions/CartActions/getUserCart.action'
import getMyToken from 'src/utilities/getMyToken'
import  Link  from 'next/link';
export default function LoginDesign() {
      const context=useContext(CountCart)
      if(!context){
        throw new Error("Not Exit")
      }
      const {setCountCart}=context
    const [isLoading,setIsLoading]=useState(false)
    const formObj=useForm({
      resolver:zodResolver(schema)
    });
    const {control,handleSubmit, formState:{isSubmitting,isValid}}=formObj
    async function  handleLogin(data:LoginFormType){
      setIsLoading(true)
     const res=await signIn('credentials',{
        email:data.email,
        password:data.password,
        redirect:false,
      })  
    if(res?.ok){
      toast.success("welcome at home",{position:"top-center",duration:1000})
      location.href="./"
      const token=await getMyToken();
      if(token){
      const data:CartData=await getUserCart()
      const sum=data.data.products.reduce((total,item)=>total+=item.count,0)
      setCountCart(sum)
    }
    }
    else{
      toast.error(res?.error,{position:"top-center",duration:1000})
    }
    setIsLoading(false)
}
  return<>
  
  <div className="">
    <Form {...formObj} >
 <form className='w-full flex flex-col items-center'onSubmit={handleSubmit(handleLogin)} >
   <FormField
    control={control}
    name="email"
    render={({field}) => (
      <FormItem  className='my-5 w-full'>
        <FormLabel >Enter Your Email</FormLabel>
        <FormControl>
       <Input {...field} type='email'/>
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
   <FormField
    control={control}
    name="password"
    render={({field}) => (
      <FormItem  className='my-2 w-full'>
         <div className="flex justify-between items-center">
        <FormLabel >Enter Your Password</FormLabel>
  </div>
        <FormControl>
       <Input {...field} type='password'/>
        </FormControl>
        <FormMessage />
<div className="flex justify-end">
      <Link href='/forgetPassword'>
  <p className='cursor-pointer hover:underline hover:underline-offset-4 hover:text-[#2e497eb5] text-[14px] font-medium my-2 text-main'>Forget Password</p>
  </Link>
</div>
      </FormItem>
    )}
  />

  <Button type='submit' disabled={isSubmitting||!isValid} className='my-4 w-full cursor-pointer btn text-[14px]'> {isLoading&&isSubmitting?<i className="fas fa-spinner fa-spin"></i>:"Login"}</Button>
 
 </form>
</Form>

</div>
  </>
}
