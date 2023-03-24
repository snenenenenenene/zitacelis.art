"use client";
import PocketBase from "pocketbase";
import { useEffect, useState } from "react";

export default function Home() {
  const Img = ({ className, index }: { className: string; index: any }) => {
    return (
      <picture
        className={`${className} absolute overflow-hidden border-2 border-light-tertiary rounded`}
      >
        <img
          src={`https://zita-website.pockethost.io/api/files/6w4ddsf4nwbdis4/${collections[index]?.expand.cover?.id}/${collections[index]?.expand.cover?.src}`}
          alt={`https://zita-website.pockethost.io/api/files/6w4ddsf4nwbdis4/${collections[index]?.expand.cover?.id}/${collections[index]?.expand.cover?.src}`}
          className="object-cover w-full h-full"
        />
      </picture>
    );
  };

  const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKET_BASE_URL);

  const [collections, setCollections]: any = useState([]);

  useEffect(() => {
    pb.collection("collections")
      .getFullList({
        expand: "cover",
      })
      .then((res: any) => {
        console.log(res);
        setCollections(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div
      className="flex w-screen h-screen relative overflow-y-scroll "
      data-scroll-container
    >
      <h1 className="text-[14rem] font-outline-4 top-1/2 left-1/2 text-light-secondary -translate-x-1/2 -translate-y-1/2 z-20 filter font-sunflower absolute leading-[10.5rem] w-[30rem] text-center flex justify-center items-center">
        Zita Celis
      </h1>
      <Img
        data-scroll
        data-scroll-speed="1"
        className="w-[40rem] h-[24rem] top-[0rem] left-[0rem]"
        index={0}
      />
      <Img
        data-scroll
        data-scroll-speed="2"
        className="w-96 h-96 top-[30rem] left-[13rem]"
        index={5}
      />
      <Img
        data-scroll
        data-scroll-speed="30"
        className="w-96 h-96 top-[60rem] left-[2rem]"
        index={4}
      />
      <Img
        data-scroll
        data-scroll-speed="2"
        className="w-[20rem] h-[30rem] top-[5rem] right-[5rem]"
        index={3}
      />
      <Img
        data-scroll
        data-scroll-speed="5"
        className="w-[20rem] h-96 top-[40rem] right-[10rem]"
        index={6}
      />
      <Img
        data-scroll
        data-scroll-speed="10"
        className="w-[15rem] h-[15rem] top-[55em] right-[35rem]"
        index={2}
      />
    </div>
  );
}
