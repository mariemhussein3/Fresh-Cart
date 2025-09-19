"use server"
import { jwtDecode } from "jwt-decode";
import getMyToken from "src/utilities/getMyToken";
import  axios  from "axios";

export async function GetAllOrder() {
  const token=await getMyToken()
  if(!token){
       return null
  }
  const {id}:{id:string} =jwtDecode(token)
  
  const{data}=await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/orders/user/${id}`,{

  })
  return data;
}
