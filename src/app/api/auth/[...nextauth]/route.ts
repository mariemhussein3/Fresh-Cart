import NextAuth, { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";
export const NextOption: NextAuthOptions = {
    pages:{
  signIn:"/login"
    },
  providers: [
    Credentials({
      name: "Credential",
      credentials: {
        email: {},
        password: {},
      },
      // handle login and must return
      async authorize(credentials) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/auth/signin`,
          {
            method: "post",
            body: JSON.stringify({

              email: credentials?.email,
              password: credentials?.password,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const payload = await res.json();
        if(payload.message=="success"){
          
          const decodeToken:{id:string}=jwtDecode(payload.token)
     return {
                      id: decodeToken.id,
            user:payload.user,
            token:payload.token
           }
      
           
        }
        
        else{
            throw new Error(payload.message)
        }
          
      },
    }),
  ],
  callbacks:{
    async jwt({ token, user }) {
       if(user){
         token.token=user?.token
        token.user=user.user 
       }
        
      return token

    },
     async session({ session, token }) {
        session.user=token.user 
          return session
    },
 
  }
};
const handler = NextAuth(NextOption);
export { handler as GET, handler as POST };