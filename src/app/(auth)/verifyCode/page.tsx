'use client'
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import z from 'zod'
import { useRouter } from 'next/navigation'
export default function VerifyCode() {
  const [isLoading,setIsLoading]=useState(false)
  
 const router= useRouter()
 
const schema=z.object({
    resetCode:z.string().nonempty("resetCode is required"),
  })
const formObj=useForm({
  resolver:zodResolver(schema)
});
const {control,handleSubmit,formState:{isSubmitting,isValid}}=formObj
async function  handleVerifyCode(values:z.infer<typeof schema>){
  setIsLoading(true);
 const res=await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/verifyResetCode`,{
    method:"post",
    body:JSON.stringify({
        resetCode:values.resetCode
    }),
    headers:{
        "Content-Type":"application/json",
    }
 } )
 const data =await res.json();
 setIsLoading(false);
 
 if(data.status=="Success")
 {

   toast.success(data?.status,{position:"top-center",duration:2000})
   router.push("/resetPassword")
  }
  else{
    toast.error(data?.message,{position:"top-center",duration:2000})
    router.push("/forgetPassword")

 }
}
  return <>
<div className="lg:w-[30%] w-full mx-auto my-32 flex justify-center flex-col border border-slate-200 shadow-md p-5 ">
   <h2 className='text-[25px]  font-normal text-slate-700 text-start my-5 mx-3'>Enter Your Code</h2>
    <Form {...formObj} >
 <form className='px-3 w-full'onSubmit={handleSubmit(handleVerifyCode)} >
   <FormField
    control={control}
    name="resetCode"
    render={({field}) => (
      <FormItem  className='my-5'>
        <FormControl className=''>
     <InputOTP maxLength={6} {...field}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
  </InputOTPGroup>
  <InputOTPSeparator />
  <InputOTPGroup>
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />

  <Button disabled={isSubmitting||!isValid}  type='submit' className='my-4 w-full lg:w-3/4 cursor-pointer btn'>{isLoading&&isSubmitting?<i className="fas fa-spinner fa-spin"></i>:"Verify Code"}</Button>
 </form>
</Form>
</div>
  </>
}

