'use client'
import React, { useState } from 'react'
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
import { toast } from 'sonner'
import z from 'zod'
import { useRouter } from 'next/navigation'
export default function ForgetPassword() {
  const [isLoading,setIsLoading]=useState(false)

 const router= useRouter() 
const schema=z.object({
    email:z.email("email is required"),
  })
const formObj=useForm({
  resolver:zodResolver(schema)
});
const {control,handleSubmit,formState:{isSubmitting,isValid}}=formObj
async function  handleForgetPassword(values:z.infer<typeof schema>){
  setIsLoading(true)
 const res=await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/forgotPasswords`,{
    method:"post",
    body:JSON.stringify({
        email:values.email
    }),
    headers:{
        "Content-Type":"application/json",
    }
 } )
 const data =await res.json();
  setIsLoading(false)

 if(data.statusMsg=="success")
 {

   toast.success(data?.statusMsg,{position:"top-center",duration:1000})
   router.push("./verifyCode")
  }
  else{
    toast.error(data?.message,{position:"top-center",duration:1000})

 }
}
  return <>
<div className="lg:w-[30%] w-full mx-auto my-32 flex justify-center flex-col border border-slate-200 shadow-md  p-5">
      <h2 className='text-[25px]  font-normal text-slate-700 text-start my-5 mx-3'>  Forget Password</h2>
    <Form {...formObj} >
 <form className='px-3 flex flex-col items-center'onSubmit={handleSubmit(handleForgetPassword)} >
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

  <Button disabled={isSubmitting||!isValid}  type='submit' className='my-4 lg:w-3/4 w-full cursor-pointer btn'>{isLoading&&isSubmitting?<i className="fas fa-spinner fa-spin"></i>:"Send Email"}</Button>
 </form>
</Form>
</div>
  </>
}

