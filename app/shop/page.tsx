"use client";
import { motion } from "framer-motion";
import Products from "../components/Products";

export default function Shop() {
  return (
    <div className="text-9xl p-10 text-black font-sunflower">
      <motion.div
        initial={{ y: "0%" }}
        animate={{ y: "100%" }}
        transition={{ duration: 2 }}
        className={`top-0 fixed left-0 w-screen h-screen z-50 bg-black`}
      />

      <div className="text-lg font-george flex">
        <Products />
      </div>
    </div>
  );
}
