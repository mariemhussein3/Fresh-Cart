"use server"

import { RegisterFormType } from "src/types/Register.type";


export async function RegisterAction(data:RegisterFormType) {
    const res=await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/signup`,{
  method:"post",
  body:JSON.stringify(data),
  headers:{
    'Content-Type':'application/json',

  }
})
const payload=await res.json();
  return payload;
}
