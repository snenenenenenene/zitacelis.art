"use client";
import { AnimatePresence, motion, useAnimate } from "framer-motion";
import Link from "next/link";
import { useEffect } from "react";
//@ts-ignore
import { useStore } from "./utils/store";

export default function Home() {
  const [scope, animate] = useAnimate();

  const Img = ({ className, index }: { className: string; index: any }) => {
    return (
      <picture
        className={`${className} bg-black hover:scale-105 hover:filter-none grayscale hover:z-50 hover:shadow-2xl transition-all duration-500 cursor-pointer  absolute border rounded-full border-black overflow-hidden`}
      >
        {collections?.length > 0 && (
          <Link href={`/work/${collections[index]?.title}`}>
            <img
              src={`https://zita-website.pockethost.io/api/files/6w4ddsf4nwbdis4/${collections[index]?.expand.cover?.id}/${collections[index]?.expand.cover?.src}`}
              alt={`https://zita-website.pockethost.io/api/files/6w4ddsf4nwbdis4/${collections[index]?.expand.cover?.id}/${collections[index]?.expand.cover?.src}`}
              className="object-cover w-full h-full absolute inset-0"
            />
          </Link>
        )}
      </picture>
    );
  };

  const { collections, fetch } = useStore((state: any) => ({
    collections: state.collections,
    fetch: state.fetch,
  }));

  useEffect(() => {
    if (collections.length > 0) return;
    fetch();
    console.log(collections);
    animate(scope?.current, {
      y: "100%",
      transition: { duration: 20.5 },
      transitionEnd: {
        display: "none",
      },
      onAnimationEnd: {
        display: "none",
      },
    });
  }, []);

  return (
    <>
      {collections?.length === 0 && (
        <AnimatePresence>
          <motion.div
            ref={scope}
            initial={{ y: "0%" }}
            exit={{
              y: "100%",
              transition: { duration: 20.5 },
              display: "none",
            }}
            transition={{ duration: 100 }}
            className={`${
              collections?.length === 0 ? "hidden opacity-0" : "block"
            } top-0 absolute left-0 w-full h-full z-50 bg-black`}
          >
            <h2 className="text-[8rem] absolute top-1/2 left-1/2 text-white -translate-x-1/2 -translate-y-1/2 z-[60] filter font-sunflower leading-[6rem] w-[35rem] md:w-[30rem] text-center flex justify-center items-center">
              Zita Celis
            </h2>
          </motion.div>
        </AnimatePresence>
      )}

      <div className="text-[8rem] top-1/2 left-1/2 text-black -translate-x-1/2 -translate-y-1/2 z-20 filter font-sunflower fixed leading-[6rem] w-[35rem] md:w-[30rem] text-center flex justify-center items-center">
        Zita Celis
      </div>
      <Img
        data-name="cosplay"
        className=" lg:w-[15rem] xl:w-[35rem] w-[18rem] h-[17rem] md:h-[20rem] top-[14rem] md:top-[2rem] left-[2rem]"
        index={6}
      />
      <Img
        data-name="outside"
        className="w-[15rem] h-[15rem] md:w-[20rem] md:h-[20rem] bottom-[20rem] md:top-[25rem] left-[4.5rem] md:left-[4rem]"
        index={5}
      />
      <Img
        data-name="misc"
        className="w-[18rem] md:w-[25rem] h-[15rem] md:h-[15rem] bottom-[2rem] left-[18rem] md:left-[2rem] lg:left-[3rem] xl:left-[30rem]"
        index={4}
      />
      <Img
        data-name="scary"
        className=" w-[15rem] md:w-[20rem] h-[20rem] md:h-[30rem] lg:top-[1rem] top-[3rem] right-[1rem] md:right-[3rem] lg:right-[1rem]"
        index={3}
      />
      <Img
        data-name="flora"
        className="w-[14rem] h-[14rem] bottom-[2rem] right-[28rem] md:right-[5rem]"
        index={0}
      />
      <Img
        data-name="fauna"
        className="w-[12rem] h-[12rem] top-[45rem] md:top-[2rem] right-[1rem] md:right-[30rem]"
        index={2}
      />
    </>
  );
}
