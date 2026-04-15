import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/dashboard/foter";

export const metadata: Metadata = {
  title: "MedVault — Patient Record System",
  description: "Clinical patient records management system",

};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}

       <Footer /> 
      </body>
    </html>
  );
}
