import Head from "next/head";
import Link from "next/link";
import { ReactNode } from "react";
import { GiBleedingEye } from "react-icons/gi";
import "./globals.css";

export const metadata = {
  generator: "Next.js",
  applicationName: "Zita Celis",
  keywords: ["Senne Bels", "Photography", "Portfolio"],
  authors: [
    { name: "Zita Celis" },
    { name: "Senne Bels", url: "https://sennebels.xyz" },
  ],
  creator: "Zita Celis",
  publisher: "Senne Bels",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <Head>
        <link rel="shortcut icon" href="assets/sun.ico" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="" />
        <meta name="twitter:title" content="zitacelis.art" />
        <meta name="twitter:description" content="Photofolio" />
        <meta
          name="twitter:image"
          content="https://sennebels.xyz/assets/images/twitter-pic.png"
        />
        <meta name="twitter:site" content="@zitacelis" />
        <meta name="twitter:creator" content="@zitacelis" />
        <meta property="og:url" content="https://www.zitacelis.art" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="zitacelis.art" />
        <meta property="og:description" content="Photofolio" />
        <meta
          property="og:image"
          content="https://sennebels.xyz/assets/images/twitter-pic.png"
        />
      </Head>
      <body className="bg-dark-primary overflow-hidden relative p-[3rem] w-screen h-screen dark:bg-dark-primary text-light-secondary dark:text-dark-secondary">
        <nav className="fixed md:justify-start justify-between  inset-0 w-screen h-[3rem] px-[3rem] items-center text-white text-3xl font-sunflower flex">
          <Link
            href="/shop"
            className="hover:bg-white my-2 h-8 flex justify-center items-center px-8 py-3 rounded-xl hover:text-black transition-colors duration-500"
          >
            shop
          </Link>
          <Link
            href="/contact"
            className="hover:bg-white my-2 h-8 flex justify-center items-center px-8 py-3 rounded-xl hover:text-black transition-colors duration-500"
          >
            contact
          </Link>
          <Link
            href={"/"}
            className=" absolute z-50 left-1/2 -translate-x-1/2 text-4xl "
          >
            <GiBleedingEye className="font-outline-4 text-white hover:text-purple-300 transition-all duration-700 hover:scale-105 hover:rotate-12" />
          </Link>
        </nav>
        <div className="bg-white  rounded-xl flex w-full h-full relative">
          {children}
        </div>
      </body>
    </html>
  );
}
