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

export default function ResetPassword() {
    const [isLoading,setIsLoading]=useState(false)

    const router=useRouter();
 const schema=z.object({
      
    email:z.email("email is required"),
    newPassword:z.string().nonempty("email is required").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,"Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:")}
)
const formObj=useForm({
  resolver:zodResolver(schema)
});
const {control,handleSubmit,formState:{isSubmitting,isValid}}=formObj
async function  handleResetPassword(values:z.infer<typeof schema>){
    setIsLoading(true)
 const res=await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/resetPassword`,{
    method:"put",
    body:JSON.stringify({
        email:values.email,
        newPassword:values.newPassword
    }),
    headers:{
        "Content-Type":"application/json",
    }
 } )
 const data =await res.json();
 setIsLoading(false);
 if(data.token)
 {

   toast.success(data?.status,{position:"top-center",duration:1000})
   router.push("/login")
  }
  else{
    toast.error(data?.message,{position:"top-center",duration:1000})

 }
}
  return <>
<div className="lg:w-[30%] w-full mx-auto my-32 shadow-md p-5 border border-slate-200">
  <h2 className='text-[25px]  font-normal text-slate-700 text-start my-5 mx-3'>Reset Your Password</h2>
    <Form {...formObj} >
 <form className='px-3 flex flex-col items-center'onSubmit={handleSubmit(handleResetPassword)} >
   <FormField
    control={control}
    name="email"
    render={({field}) => (
      <FormItem  className='my-5 w-full'>
        <FormLabel >Email</FormLabel>
        <FormControl>
       <Input {...field} type='email' className='w-full'/>
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
   <FormField
    control={control}
    name="newPassword"
    render={({field}) => (
      <FormItem  className='my-5  w-full'>
        <FormLabel >New Password</FormLabel>
        <FormControl>
       <Input {...field} type='password'/>
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />

  <Button type='submit' disabled={isSubmitting||!isValid}  className='my-4 lg:w-3/4 w-full cursor-pointer btn'>{isLoading&&isSubmitting?<i className="fas fa-spinner fa-spin"></i>:"Reset Password"}</Button>
 </form>
</Form>
</div>
  </>

}