"use client";
import { ReactNode, useRef } from "react";
import { LocomotiveScrollProvider } from "react-locomotive-scroll";
import "./globals.css";

// export const metadata = {
//   title: "Zita Celis",
//   description: "Photography Portfolio",
// };

export default function RootLayout({ children }: { children: ReactNode }) {
  const containerRef = useRef(null);

  return (
    <html lang="en">
      <body className="bg-dark-primary p-[3rem] dark:bg-dark-primary text-light-secondary dark:text-dark-secondary">
        <LocomotiveScrollProvider
          options={{
            smooth: true,
          }}
          containerRef={containerRef}
        >
          <div className="bg-light-primary rounded-xl overflow-hidden">
            {children}
          </div>
        </LocomotiveScrollProvider>
      </body>
    </html>
  );
}
