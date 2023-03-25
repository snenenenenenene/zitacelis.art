"use client";
import Link from "next/link";
import PocketBase from "pocketbase";
import { useEffect, useState } from "react";
//@ts-ignore
import ReactCurvedText from "react-curved-text";

export default function Home() {
  const Img = ({ className, index }: { className: string; index: any }) => {
    return (
      <picture
        className={`${className} bg-black hover:scale-125 hover:z-50 hover:shadow-2xl transition-all duration-500 cursor-pointer  absolute border rounded-full border-black overflow-hidden`}
      >
        {collections?.length > 0 && (
          <Link href={`/work/${collections[index]?.title}`}>
            <img
              src={`https://zita-website.pockethost.io/api/files/6w4ddsf4nwbdis4/${collections[index]?.expand.cover?.id}/${collections[index]?.expand.cover?.src}`}
              alt={`https://zita-website.pockethost.io/api/files/6w4ddsf4nwbdis4/${collections[index]?.expand.cover?.id}/${collections[index]?.expand.cover?.src}`}
              className="object-cover w-full h-full absolute inset-0"
            />
            <section className="absolute bottom-0 left-1/2 -translate-x-1/2 mb-10">
              <ReactCurvedText
                width={200}
                height={200}
                cx={10}
                cy={10}
                rx={80}
                ry={116}
                startOffset="0"
                text="LOAAALOL"
              />
            </section>
          </Link>
        )}
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
    <>
      <h1 className="text-[8rem] top-1/2 left-1/2 text-black -translate-x-1/2 -translate-y-1/2 z-20 filter font-sunflower fixed leading-[6rem] w-[35rem] md:w-[30rem] text-center flex justify-center items-center">
        Zita Celis
      </h1>
      <Img
        data-scroll
        data-scroll-speed="1"
        className="md:w-[35rem] w-[18rem] h-[17rem] md:h-[20rem] top-[14rem] md:top-[2rem] left-[2rem]"
        index={6}
      />
      <Img
        data-scroll
        data-name="outside"
        data-scroll-speed="4"
        className="w-[15rem] h-[15rem] md:w-[20rem] md:h-[20rem] top-[45rem] md:top-[25rem] left-[4.5rem] md:left-[4rem]"
        index={5}
      />
      <Img
        data-scroll
        data-scroll-speed="3"
        data-name="outside"
        className="w-[18rem] md:w-[25rem] h-[15rem] md:h-[15rem] bottom-[2rem] left-[18rem] md:left-[2rem] lg:left-[3rem] xl:left-[30rem]"
        index={4}
      />
      <Img
        data-scroll
        data-scroll-speed="1"
        data-name="scary"
        className=" w-[15rem] md:w-[20rem] h-[20rem] md:h-[30rem] top-[3rem] -right-[3rem] md:right-[1rem]"
        index={3}
      />
      <Img
        data-scroll
        data-scroll-speed="5"
        data-name="flora"
        className="w-[14rem] h-[14rem] bottom-[2rem] right-[16rem]"
        index={0}
      />
      <Img
        data-scroll
        data-scroll-speed="10"
        data-name="fauna"
        className="w-[12rem] h-[12rem] top-[45rem] md:top-[2rem] right-[1rem] md:right-[30rem]"
        index={2}
      />
    </>
  );
}
