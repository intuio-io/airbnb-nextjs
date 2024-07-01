import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

// components
import Navbar from "./components/Navbar/Navbar";
import RegisterModal from "./components/modals/RegisterModal";
import LoginModal from "./components/modals/LoginModal";
import RentModal from "./components/modals/RentModal";
import SearchModal from "./components/modals/SearchModal";
import ConfirmModal from "./components/modals/ConfirmModal";
import Footer from "./components/Footer";


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
          <ConfirmModal />
          <Navbar/>
 
    
       <div className="pt-28 pb-20"> 
        {children}
       </div>
       
        <Footer/>
        </body>
    </html>
  );
}
