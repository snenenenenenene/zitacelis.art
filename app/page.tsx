import Image from "next/image";
import { Navbar } from "./components/Navbar";

export default function Home() {
  const images = [
    "/assets/fauna/_MG_0019.jpg",
    "/assets/flora/_MG_8959.jpg",
    "/assets/architecture/_MG_9835.jpg",
    "/assets/photoshoots/cosplay/_MG_0125.jpg",
    "/assets/photoshoots/scary_movie/_MG_0237.jpg",
    "/assets/still lives/_MG_9769.jpg",
  ];

  return (
    <main className="flex flex-col w-screen h-screen pt-32 relative">
      <Navbar />
      <div
        className={`gap-x-4 h-5/6 px-12 flex overflow-x-scroll`}
        style={{ width: `${95 * images.length}vw` }}
      >
        {images.map((image) => (
          <section
            key={image}
            className="w-full h-full relative rounded-xl overflow-hidden"
          >
            <Image
              alt="fauna-showcase-pic"
              className=" w-[100vw] overflow-hidden object-cover"
              fill
              src={image}
            />
          </section>
        ))}
      </div>
      <div className="h-1/6"></div>
    </main>
  );
}
