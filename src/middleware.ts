import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
   const token= await getToken({req:request})
   if(token){

    if(request.nextUrl.pathname==="/login"||request.nextUrl.pathname==="/register"){
      return NextResponse.redirect(new URL('/', request.url))
    }
    else{

      return NextResponse.next()
    }
   }
   else{
    if(request.nextUrl.pathname==="/cart"||request.nextUrl.pathname==="/allorders"||request.nextUrl.pathname==="/wishlist"){
       return NextResponse.redirect(new URL('/login', request.url))
    }
    else{
      return NextResponse.next()
    }
   }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher:['/cart','/allorders','/wishlist','/login','/register']
}