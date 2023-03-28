import Link from "next/link";
import { ReactNode } from "react";
import { GiBleedingEye } from "react-icons/gi";
import "./globals.css";

export const metadata = {
  title: "Zita Celis",
  generator: "Next.js",
  category: "Photography",
  description: "Photofolio",
  icons: [
    {
      rel: "icon",
      href: "assets/favicon.ico",
      url: "assets/favicon.ico",
    },
  ],
  twitter: {
    card: "summary_large_image",
    site: "https://www.zitacelis.art",
    title: "zitacelis.art",
    description: "Photofolio",
    creator: "@zitacelis",
    images: [
      {
        url: "https://nextjs.org/og.png",
        width: 800,
        height: 600,
      },
      {
        url: "blob:https://vercel.com/f6cb8460-0d93-4f59-8fda-e484add0ea60",
        width: 800,
        height: 600,
      },
    ],
  },
  applicationName: "Zita Celis",
  keywords: ["Zita Celis", "Senne Bels", "Photography", "Portfolio"],
  authors: [
    { name: "Zita Celis" },
    { name: "Senne Bels", url: "https://sennebels.xyz" },
  ],
  creator: "Zita Celis",
  publisher: "Senne Bels",
  robots: {
    index: true,
    googleBot: {
      index: true,
    },
  },
  openGraph: {
    title: "Zita Celis",
    creators: ["Zita Celis", "Senne Bels"],
    releaseDate: "2023-03-28",

    countryName: "Belgium",
    firstName: "Zita",
    lastName: "Celis",
    username: "zitacelis",
    emails: "zita25celis@gmail.com",
    tags: ["Photography", "Portfolio", "Zita Celis", "Senne Bels"],
    description: "Photofolio",
    url: "https://www.zitacelis.art",
    images: [
      {
        url: "https://nextjs.org/og.png",
        width: 800,
        height: 600,
      },
      {
        url: "blob:https://vercel.com/f6cb8460-0d93-4f59-8fda-e484add0ea60",
        width: 800,
        height: 600,
      },
    ],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-dark-primary overflow-hidden relative p-[3rem] w-screen h-screen dark:bg-dark-primary text-light-secondary dark:text-dark-secondary">
        <nav className="fixed md:justify-start justify-between gap-x-4 inset-0 w-screen h-[3rem] px-[3rem] items-center text-white text-3xl font-sunflower flex">
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
