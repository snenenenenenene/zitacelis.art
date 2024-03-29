"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";
import { GiCartwheel } from "react-icons/gi";
import CartSummary from "../components/CartSummary";
import { useStore } from "../utils/store";

export default function Layout({ children }: { children: ReactNode }) {
  const { openCart, toggleOpenCart } = useStore((state) => {
    return {
      openCart: state.openCart,
      toggleOpenCart: state.toggleOpenCart,
    };
  });
  return (
    <div className=" w-full h-full flex relative">
      <section className="fixed z-[60] right-[3rem] h-full top-0 ">
        <button
          onClick={() => toggleOpenCart()}
          className=" text-4xl p-1 hover:rotate-45 right-0 absolute hover:bg-white rounded-full hover:text-black transition-all duration-500 text-white  "
        >
          <GiCartwheel />
        </button>
        {openCart && (
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute shadow shadow-gray-500 top-[3.5rem] translate-y-full right-1 p-10 bg-black border-white border-2 w-[30rem] h-5/6 rounded-xl"
          >
            <CartSummary />
          </motion.div>
        )}
      </section>
      {children}
    </div>
  );
}
