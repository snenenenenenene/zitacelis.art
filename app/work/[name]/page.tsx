import { images } from "@/data/images";
import Image from "next/image";
export default function Project(context: any) {
  const name = context.params.name;

  const collection = images.find((image) => image.title === name);

  return (
    <main className="flex flex-col w-screen h-screen pt-32 relative">
      {collection && (
        <>
          <div className={`gap-x-4 h-5/6 px-12 flex overflow-x-scroll w-full`}>
            <section className="w-full h-full relative rounded-xl overflow-hidden">
              <Image
                src={collection.coverPath}
                alt="fauna-showcase-pic"
                className=" w-[100vw] overflow-hidden object-cover"
                fill
              />
            </section>
            {collection.images && collection.images.map(() => <></>)}
          </div>
          <div className="h-1/6"></div>
        </>
      )}
    </main>
  );
}
