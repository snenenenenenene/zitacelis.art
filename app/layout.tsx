import { ReactNode } from "react";
import Navbar from "./components/Navbar";
import "./globals.css";
//TODO: Cleanup all code
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
        <Navbar />
        <div className="bg-white  rounded-xl flex w-full h-full relative">
          {children}
        </div>
      </body>
    </html>
  );
}
