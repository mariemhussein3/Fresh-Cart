"use client";
import { useContext, useState } from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { CiMenuBurger } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { cn } from "src/lib/utils";
import { useSession } from "next-auth/react";
import UserData from "../UserData/UserData";
import { CountCart } from "src/Context/CountCart";
import { cva } from "class-variance-authority";
import { Wix_Madefor_Text } from 'next/font/google';
const wixFont = Wix_Madefor_Text({
weight:["400","500","600","700","800"]
});
export default function Navbar() {
  const pathName=usePathname()
  const router=useRouter()
  const {  status } = useSession();
const context=useContext(CountCart)
if(!context){
  throw new Error("Not Exit")
}

const {countCart}=context
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };
  const navigationMenuLinkStyle = cva(
  "inline-flex h-9 w-max items-center justify-center bg-transparent px-4 py-2 text-sm font-medium hover:text- focus:text-[var(--navbar-item)]"
);

  const navList: { path: string; content: string; isLogin: boolean }[] = [
    { path: "/", content: "Home", isLogin: false },
    { path: "/products", content: "All Products", isLogin: false },
    { path: "/categories", content: "Categories", isLogin: false },
    { path: "/brands", content: "Brands", isLogin: false },
    { path: "/allorders", content: "Orders", isLogin: true },
    { path: "/wishlist", content: "WishList", isLogin: true },
  ];
  const authList: { path: string; content: string }[] = [
    { path: "/login", content: "Login" },
  ];
  const icons: { icon: string }[] = [
    { icon: "fa-instagram" },
    { icon: "fa-facebook" },
    { icon: "fa-tiktok" },
    { icon: "fa-twitter" },
    { icon: "fa-linkedin" },
    { icon: "fa-youtube" },
  ];
  return (
    <div className={`w-full bg-white fixed top-0 left-0 z-50 shadow-md ${wixFont.className}`}>
      <NavigationMenu
        viewport={false}
        className="max-w-[90%] mx-auto justify-between py-4 items-center flex"
      >
                <button
          onClick={handleToggle}
          className="lg:hidden text-[30px] z-[7777]  order-0 text-black"
          aria-expanded={isChecked ? "true" : "false"}
    >
      {isChecked ? 
        <IoMdClose />
        : 
        <CiMenuBurger />
      }


        </button>
<div className="flex items-center justify-center 
             order-2 w-full 
             lg:justify-start lg:order-0 lg:w-auto ">
          <NavigationMenuList className="flex items-center mr-3">
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/" className="">
                <Image
                  src="/images/freshcart-logo.svg"
                  width={150}
                  height={150}
                  alt="logo"
                  className="lg:w-[150px] w-full "
                ></Image>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

        </NavigationMenuList>



 <NavigationMenuList className="flex justify-start">
        {navList.map((item) => {
            return (
              <NavigationMenuItem key={item.path}>
                {item.isLogin && status == "authenticated" && (
                  <>
         <NavigationMenuLink
  asChild
  className={cn(
    navigationMenuLinkStyle(),
    "bg-transparent lg:flex hidden outline-0  active:bg-transparent hover:bg-transparent ",
    pathName === item.path ?"activeEle":" itemlink"
  )}
>
  <Link href={item.path}>{item.content} </Link>
</NavigationMenuLink>
                  </>
                )}
                {!item.isLogin && (
                  <>
                    <NavigationMenuLink
                      asChild
                      className={cn(
                        navigationMenuLinkStyle(),
                          "bg-transparent lg:flex hidden outline-0   active:bg-transparent hover:bg-transparent ",
                          pathName === item.path ?"activeEle": " itemlink "
                      )}
                    >
                      <Link href={item.path}>{item.content}</Link>
                    </NavigationMenuLink>
                  </>
                )}
              </NavigationMenuItem>
            );
          })}
        
 </NavigationMenuList>


</div>
 
<div className="flex items-center lg:order-1 order-3">
          <NavigationMenuList className="flex items-center justify-end ">
     
  <NavigationMenuItem>
      {status == "authenticated" && (
            <Link href={"/cart"} >
            <div className="relative">
               <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 40 40"
      fill="none"
      className="size-[45px] text-gray-700 icon icon-cart"
         stroke="currentColor"
     strokeWidth=".23"
    >
      <path
        d={`${countCart==0 ?"m15.75 11.8h-3.16l-.77 11.6a5 5 0 0 0 4.99 5.34h7.38a5 5 0 0 0 4.99-5.33l-.78-11.61zm0 1h-2.22l-.71 10.67a4 4 0 0 0 3.99 4.27h7.38a4 4 0 0 0 4-4.27l-.72-10.67h-2.22v.63a4.75 4.75 0 1 1 -9.5 0zm8.5 0h-7.5v.63a3.75 3.75 0 1 0 7.5 0z":
          " M20.5 6.5a4.75 4.75 0 00-4.75 4.75v.56h-3.16l-.77 11.6a5 5 0 004.99 5.34h7.38a5 5 0 004.99-5.33l-.77-11.6h-3.16v-.57A4.75 4.75 0 0020.5 6.5zm3.75 5.31v-.56a3.75 3.75 0 10-7.5 0v.56h7.5zm-7.5 1h7.5v.56a3.75 3.75 0 11-7.5 0v-.56zm-1 0v.56a4.75 4.75 0 109.5 0v-.56h2.22l.71 10.67a4 4 0 01-3.99 4.27h-7.38a4 4 0 01-4-4.27l.72-10.67h2.22z"}`}
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
        <span className="absolute bottom-[7px] end-[7px] bg-[#dfba5b] rounded-full p-[8px] flex items-center justify-center size-[12px] text-[8px] text-gray-100 ">{countCart}</span>
            </div>
            </Link>
          )}
    </NavigationMenuItem>

<NavigationMenuItem className="lg:flex hidden ">
    {status === "loading" && (
    <span className="text-gray-500">  <span className="loader-auth "></span></span>
  )}

          {status === "unauthenticated" && (
            <>
              <div className="flex">
                {authList.map((item) => {
                  return (
                    <NavigationMenuItem key={item.path}>
                          <NavigationMenuLink
                      asChild
                      className={cn(
                        navigationMenuLinkStyle(),
                          "bg-transparent lg:flex hidden outline-0   active:bg-transparent hover:bg-transparent ",
                          pathName === item.path ?"activeEle": " itemlink "
                      )}
                    >
                      <Link href={item.path}>{item.content}</Link>
                    </NavigationMenuLink>
                    </NavigationMenuItem>
                  );
                })}
              </div>
            </>
          )}

          {status === "authenticated" && <UserData />}
</NavigationMenuItem>
        </NavigationMenuList>
</div>


      </NavigationMenu>
      {/* Responsive togglr */}
      <div  className={`flex flex-col w-[85%] items-start gap-7 h-screen 
    fixed top-[10%] left-0 z-50 bg-white pt-15 ps-5
    transform transition-all duration-500
    ${isChecked ? "-translate-x-0" : "-translate-x-full"} lg:hidden`}>

  {navList.map((item) => {
    return (
         
              <Link      onClick={(e) => {
    e.preventDefault()
    router.push(item.path) 
    setIsChecked(false)
  }}  key={item.path} href={item.path} className={cn(pathName === item.path? "activeEle":"itemlink")}>
                {item.content}
              </Link>
            );
          })}
          {status === "unauthenticated" && (
            <>
              {authList.map((item) => {
                return (
                  <Link key={item.path} href={item.path} className={cn(pathName === item.path? "activeEle":"itemlink")}>
                    {item.content}
                  </Link>
                );
              })}
            </>
          )}
          {status === "authenticated" && (
            <span className="lg:mx-4 cursor-pointer itemlink">Signout</span>
          )}
          <div className="flex gap-2 justify-self-end">
            {icons.map((icons) => {
              return (
                <i key={icons.icon} className={`fa-brands ${icons.icon} px-4`}></i>
              );
            })}
          </div>
      </div>

    </div>
  );
}
