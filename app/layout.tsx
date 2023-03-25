"use client";
import { ReactNode } from "react";
import "./globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-dark-primary overflow-hidden p-[3rem] w-screen h-screen dark:bg-dark-primary text-light-secondary dark:text-dark-secondary">
        <div className="bg-white rounded-xl flex w-full h-full relative">
          {children}
        </div>
      </body>
    </html>
  );
}
