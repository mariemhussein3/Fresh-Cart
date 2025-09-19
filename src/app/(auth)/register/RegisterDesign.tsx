"use client"
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
import { schema } from './Register.schema'
import { RegisterFormType } from 'src/types/Register.type'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { RegisterAction } from 'src/Actions/RegisterAction/Register.action'
export default function RegisterDesign() {
    
const [isLoading,setIsLoading]=useState(false)
const router=useRouter();
const formObj=useForm({
  resolver:zodResolver(schema)
});
const {control,handleSubmit, formState:{isSubmitting,isValid}}=formObj
async function  handleRegister(data:RegisterFormType){
    setIsLoading(true)
const res=await RegisterAction(data)
if(res.message=="success"){
    toast.success("Your Register Successed",{position:"top-center",duration:2000})
    router.push("/login")
}
else{
    toast.error(res.message,{position:"top-center",duration:2000})
  }
  setIsLoading(false)
}

  return <>
  
      <Form {...formObj} >
 <form className=''onSubmit={handleSubmit(handleRegister)} >
   <FormField
    control={control}
    name="name"
    render={({field}) => (
      <FormItem className='my-5'>
        <FormLabel className='text-slate-700'>Enter Your Name</FormLabel>
        <FormControl>
       <Input {...field} type='text'/>
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
   <FormField
    control={control}
    name="email"
    render={({field}) => (
      <FormItem  className='my-5'>
        <FormLabel className='text-slate-700' >Enter Your Email</FormLabel>
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
      <FormItem  className='my-5'>
        <FormLabel className='text-slate-700' >Enter Your Password</FormLabel>
        <FormControl>
       <Input {...field} type='password'/>
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
   <FormField
    control={control}
    name="rePassword"
    render={({field}) => (
      <FormItem  className='my-5'>
        <FormLabel className='text-slate-700' >Enter RePassword</FormLabel>
        <FormControl>
       <Input {...field} type='password'/>
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
   <FormField
    control={control}
    name="phone"
    render={({field}) => (
      <FormItem  className='my-5'>
        <FormLabel className='text-slate-700' >Enter Your Phone</FormLabel>
        <FormControl>
       <Input {...field} type='tel'/>
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
   <Button type='submit' disabled={isSubmitting||!isValid} className='my-4 w-full cursor-pointer btn'> {isLoading&&isSubmitting?<i className="fas fa-spinner fa-spin"></i>:"Register"}</Button>
 </form>
</Form>
  </>
}
