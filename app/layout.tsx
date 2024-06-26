import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

// components
import Navbar from "./components/Navbar/Navbar";
import RegisterModal from "./components/modals/RegisterModal";
import LoginModal from "./components/modals/LoginModal";
import RentModal from "./components/modals/RentModal";
import SearchModal from "./components/modals/SearchModal";


// providers
import ToasterProvider from "./providers/ToasterProvider";

const font = Nunito({subsets: ['latin']})

export const metadata: Metadata = {
  title: "RapidStay",
  description: "Rent a house or book a place to stay, look no futher",
};


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={font.className}>

          <ToasterProvider/>
          <SearchModal/>
          <RentModal/>
          <LoginModal/>
          <RegisterModal/>
          <Navbar/>
 
    
       <div className="pb-20 pt-28"> 
        {children}
       </div>
        </body>
    </html>
  );
}
