"use server"
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export default async function getMyToken(){
try{
  // local || production
  const EncryptedToken=  (await cookies()).get(`next-auth.session-token`)?.value|| (await cookies()).get(`__Secure-next-auth.session-token`)?.value
  if(!EncryptedToken) return null

 const decodedToken= await decode({
    token:EncryptedToken,
    secret:process.env.NEXTAUTH_SECRET!
  })  
  return decodedToken?.token||null;
}
catch{
return null
}
}