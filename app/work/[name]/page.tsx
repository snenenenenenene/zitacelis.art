"use client";
import { AnimatePresence, motion } from "framer-motion";
import PocketBase from "pocketbase";
import { useEffect, useState } from "react";
export default function Page(context: any) {
  const name = context.params.name;
  const pb = new PocketBase(
    process.env.NEXT_PUBLIC_POCKET_BASE_URL
  ).autoCancellation(false);
  const [collection, setCollection]: any = useState({});
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData]: any = useState({});

  useEffect(() => {
    pb.collection("collections")
      .getFullList(1, { filter: `title="${name}"`, expand: "images" })
      .then((res: any) => {
        console.log(res[0]);
        setCollection(res[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <main className="flex flex-col bg-black h-full w-full text-black font-sunflower">
      <AnimatePresence>
        {Object.keys(collection).length === 0 && (
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
        )}
      </AnimatePresence>
      {collection && (
        <>
          <nav className="flex items-center justify-center w-full pb-8 bg-black text-white">
            <h1 className="text-6xl underline lowercase ">
              {Object.keys(collection).length !== 0 ? (
                collection?.title
              ) : (
                <p className="w-full">loading</p>
              )}
            </h1>
          </nav>
          <section className="w-full pt-10 md:pt-20 bg-white h-screen rounded-xl pb-20 px-10 md:px-20 grid md:grid-cols-3 grid-cols-1 gap-6">
            {Object.keys(collection).length !== 0 ? (
              collection?.expand?.images?.map((image: any, index: number) => (
                <picture
                  onClick={() => {
                    setModalData(image);
                    setShowModal(true);
                  }}
                  className="w-full max-h-[32rem] h-full hover:scale-105 overflow-hidden cursor-pointer transition-all duration-500"
                  key={index}
                >
                  <img
                    loading="lazy"
                    className="w-full h-full object-cover filter grayscale hover:filter-none transition-all duration-1000"
                    alt={image?.title}
                    src={`https://zita-website.pockethost.io/api/files/6w4ddsf4nwbdis4/${image?.id}/${image?.src}`}
                  />
                </picture>
              ))
            ) : (
              <section></section>
            )}
          </section>
          {showModal && (
            <div
              onClick={() => {
                setShowModal(false);
              }}
              className="fixed top-0 left-0 w-full h-full bg-black p-10 bg-opacity-50 z-50 flex justify-center items-center"
            >
              <section className="bg-white rounded-3xl">
                <picture className="w-1/2 h-1/2 overflow-hidden">
                  <img
                    loading="lazy"
                    className="w-full h-full object-cover"
                    alt={modalData?.title}
                    src={`https://zita-website.pockethost.io/api/files/6w4ddsf4nwbdis4/${modalData?.id}/${modalData?.src}`}
                  />
                </picture>
              </section>
            </div>
          )}
        </>
      )}
    </main>
  );
}
