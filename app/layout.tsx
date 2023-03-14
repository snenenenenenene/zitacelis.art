import { ReactNode } from "react";
import "./globals.css";

export const metadata = {
  title: "Zita Celis",
  description: "Photography Portfolio",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-light-primary dark:bg-dark-primary text-light-secondary dark:text-dark-secondary">
        {children}
      </body>
    </html>
  );
}
