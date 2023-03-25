"use client";
import PocketBase from "pocketbase";
import { useEffect, useState } from "react";
export default function Page(context: any) {
  const name = context.params.name;
  const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKET_BASE_URL);
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
    <main className="flex flex-col bg-black w-full overflow-scroll h-full text-black font-sunflower">
      {collection && (
        <>
          <nav className="flex items-center justify-center w-screen pb-8 bg-black text-white">
            <h1 className="text-6xl underline lowercase ">
              {Object.keys(collection).length !== 0 ? (
                collection?.title
              ) : (
                <>loading</>
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
                  className="w-full h-full hover:scale-105 overflow-hidden cursor-pointer transition-all duration-500"
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
