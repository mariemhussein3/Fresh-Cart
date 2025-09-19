import type { Metadata } from "next";
import { Encode_Sans_Expanded } from "next/font/google";
import "./globals.css";
import Navbar from "./_Components/Navbar/Navbar";
import "@fortawesome/fontawesome-free/css/all.min.css"
import Footer from "./_Components/Footer/Footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Toaster } from "src/components/ui/sonner";
import SessionProvider from "src/MySessionProvider/MySessionProvider";
import CountCartProvider from "src/Context/CountCart";
import WishListFavoriteProvider from "src/Context/WishList.context";
const encodeFont = Encode_Sans_Expanded({
weight:["400","500","600"]
});
export const metadata: Metadata = {
  title: "Home",
  description: "E-commerce By Next",
 keywords: ['Next.js', 'E-commerce','Route'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${encodeFont.className}  antialiased`}
      >
      <SessionProvider>
<CountCartProvider>
           <WishListFavoriteProvider>
             <Navbar/>
     <div className="max-w-[90%] mx-auto px-2 pt-[78px] min-h-screen ">
         {children}
           <Toaster />
     </div>
     <Footer/>
           </WishListFavoriteProvider>
</CountCartProvider>
      </SessionProvider>
      </body>
    </html>
  );
}
