"use client"
import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { signOut, useSession } from 'next-auth/react'


export default function UserData() {
    const {data}=  useSession();
    
    function logoutHandle(){
        signOut({
            callbackUrl:'/login'
        })
    }
  return<> 
  <DropdownMenu modal={false}>
          <DropdownMenuTrigger>
           <Avatar className='mx-4'>
  <AvatarImage src="https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>
          </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>{data?.user?.name}</DropdownMenuLabel> 
    <DropdownMenuSeparator />
    <DropdownMenuItem>     <span onClick={logoutHandle} className="cursor-pointer text-green-800">Sigout</span></DropdownMenuItem>
  </DropdownMenuContent>

</DropdownMenu>
   </>
}
