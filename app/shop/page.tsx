"use client";
import { motion } from "framer-motion";
export default function Shop() {
  return (
    <div className="text-9xl p-10 text-black font-sunflower">
      <motion.div
        initial={{ y: "13%" }}
        animate={{ y: "100%" }}
        exit={{
          y: "100%",
          opacity: 0,
          transition: { duration: 0.2 },
        }}
        transition={{ duration: 0.5 }}
        className={`top-0 fixed left-0 w-screen h-screen z-50 bg-black`}
      />
      WIP
    </div>
  );
}
