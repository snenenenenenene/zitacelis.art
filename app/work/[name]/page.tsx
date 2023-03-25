"use client";
import PocketBase from "pocketbase";
import { useEffect, useState } from "react";

export default function Page(context: any) {
  const name = context.params.name;
  const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKET_BASE_URL);
  const [collection, setCollection]: any = useState({});

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
    <main className="flex flex-col w-full h-full px-20 pt-20 text-black font-sunflower">
      {collection && (
        <>
          <h1 className="text-8xl">{collection?.title}</h1>
          <section className="w-full h-full flex gap-x-10">
            {collection?.expand?.images?.map((image: any, index: number) => (
              <picture
                className="w-[20rem] h-[40rem] overflow-hidden"
                key={index}
              >
                <img
                  loading="lazy"
                  className="w-full h-full object-cover"
                  alt={image?.title}
                  src={`https://zita-website.pockethost.io/api/files/6w4ddsf4nwbdis4/${image?.id}/${image?.src}`}
                />
              </picture>
            ))}
          </section>
        </>
      )}
    </main>
  );
}
