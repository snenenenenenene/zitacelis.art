"use client";
import { motion } from "framer-motion";
import { ReactNode, useState } from "react";
import { GiCartwheel } from "react-icons/gi";
import CartSummary from "../components/CartSummary";

export default function Layout({ children }: { children: ReactNode }) {
  const [showCart, setShowCart] = useState(false);
  return (
    <div className=" w-full h-full flex">
      <section className="fixed z-[60] right-[3rem] top-0 ">
        <button
          onClick={() => setShowCart((showCart) => !showCart)}
          className=" text-4xl p-1 hover:rotate-45 right-0 absolute hover:bg-white rounded-full hover:text-black transition-all duration-500 text-white  "
        >
          <GiCartwheel />
        </button>
        {showCart && (
          <motion.div
            initial={{ x: "100%", y: "100%", opacity: 0 }}
            animate={{ x: 0, y: "100%", opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute  shadow shadow-gray-500 -bottom-[3.5rem] translate-y-full right-1 p-10 bg-black border-white border-2 w-[30rem] h-[47rem] rounded-xl"
          >
            <CartSummary />
          </motion.div>
        )}
      </section>
      {children}
    </div>
  );
}
