"use client";
import { motion } from "framer-motion";
import Products from "../components/Products";

export default function Shop() {
  return (
    <div className="text-9xl p-10 text-black font-sunflower w-full overflow-scroll">
      {/* //TODO: ADD SURPRISE AND ON-DEMAND BUTTON FOR WOOD BLOCKS */}
      {/* //TODO: ADD PHOTO'S FOR PHOTOGRAPHY SHOP */}
      {/* //TODO: ADD CATEGORY FILTER FOR WOOD/PHOTOS  */}

      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: "0%", opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-lg font-george w-full justify-center flex"
      >
        <Products />
      </motion.div>
    </div>
  );
}
