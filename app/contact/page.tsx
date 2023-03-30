"use client";
import { AnimatePresence, motion } from "framer-motion";

import { useEffect, useState } from "react";
import CheckoutForm from "../components/CheckoutForm";

export default function Contact() {
  const [showCopy, setShowCopy] = useState(false);

  useEffect(() => {
    // axios
    //   .get(
    //     "https://graph.facebook.com/v3.2/17841405309211844?fields=business_discovery.username(bluebottle){followers_count,media_count}&access_token={access-token}"
    //   )
    //   .then((resp) => {
    //     console.log(resp);
    //   });
  }, []);

  return (
    <motion.main
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: "0%", opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full p-10 text-black flex sm:flex-row flex-col"
    >
      {/* <motion.div
        initial={{ y: "13%" }}
        animate={{ y: "100%" }}
        exit={{
          y: "100%",
          opacity: 0,
          transition: { duration: 0.2 },
        }}
        transition={{ duration: 0.5 }}
        className={`top-0 fixed left-0 w-screen h-screen z-50 bg-black`}
      /> */}
      <section className="flex flex-col h-full w-full">
        <h1 className="text-4xl font-sunflower mb-4">Contact me</h1>
        <a
          className="text-xl underline-offset-[4px] transition-all duration-500  hover:underline-offset-[2px] font-george cursor-pointer underline"
          onClick={() => {
            setShowCopy(true);
            navigator.clipboard.writeText("zita25celis@gmail.com");
            setTimeout(() => {
              setShowCopy(false);
            }, 2000);
          }}
        >
          zita25celis@gmail.com
        </a>

        <a
          className="text-xl font-george underline-offset-[4px] transition-all duration-500  hover:underline-offset-[2px]  cursor-pointer underline"
          href="https://www.linkedin.com/in/zitacelis/"
        >
          my linkedin
        </a>
        <a
          className="text-xl font-george underline-offset-[4px] transition-all duration-500  hover:underline-offset-[2px]  cursor-pointer underline"
          href="https://instagram.com/zitacelis.jpg"
        >
          my instagram
        </a>
        <CheckoutForm />
      </section>
      <section className="w-full flex mt-auto sm:mt-0">
        <picture className="mx-auto w-full h-full rounded-xl overflow-hidden">
          <img
            alt="me"
            src="/assets/me.jpeg"
            className="w-full h-full object-cover filter grayscale hover:filter-none transition-all duration-1000"
          />
        </picture>
      </section>
      <AnimatePresence>
        {showCopy && (
          <motion.div
            key={"copyBox"}
            initial={{ y: "0%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{
              y: "100%",
              opacity: 0,
              transition: { duration: 0.2 },
            }}
            transition={{ duration: 0.5 }}
            className={`bottom-0 fixed left-0 w-full transition-all z-50 duration-1000 font-sunflower text-4xl text-white bg-black h-20 flex justify-center items-center`}
          >
            Copied email to clipboard
          </motion.div>
        )}
      </AnimatePresence>
    </motion.main>
  );
}
