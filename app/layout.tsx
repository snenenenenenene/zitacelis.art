"use client";
import Link from "next/link";
import { ReactNode } from "react";
import { GiBleedingEye } from "react-icons/gi";
import "./globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-dark-primary overflow-hidden relative p-[3rem] w-screen h-screen dark:bg-dark-primary text-light-secondary dark:text-dark-secondary">
        <nav className="fixed md:justify-start justify-between  inset-0 w-screen h-[3rem] px-[3rem] items-center text-white text-3xl font-sunflower flex">
          <Link
            href="/shop"
            className="hover:bg-white px-8 py-3 rounded-xl hover:text-black transition-colors duration-500"
          >
            shop
          </Link>
          <Link
            href="/contact"
            className="hover:bg-white  px-8 py-3 rounded-xl hover:text-black transition-colors duration-500"
          >
            contact
          </Link>
          <Link
            href={"/"}
            className=" absolute z-50 left-1/2 -translate-x-1/2 text-5xl "
          >
            <GiBleedingEye className="font-outline-4 text-white stroke-black" />
          </Link>
        </nav>
        <div className="bg-white overflow-scroll rounded-xl flex w-full h-full relative">
          {children}
        </div>
      </body>
    </html>
  );
}
