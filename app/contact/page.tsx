"use client";
export default function Contact() {
  return (
    <main className="w-full p-10 text-black flex sm:flex-row flex-col">
      <section className="flex flex-col w-full">
        <h1 className="text-4xl font-sunflower mb-4">Contact me</h1>
        <a
          className="text-xl font-george cursor-pointer underline"
          onClick={() => {
            navigator.clipboard.writeText("zitacelis25@gmail.com");
          }}
        >
          zitacelis25@gmail.com
        </a>

        <a
          className="text-xl font-george cursor-pointer underline"
          href="https://www.linkedin.com/in/zitacelis/"
        >
          my linkedin
        </a>
        <a
          className="text-xl font-george cursor-pointer underline"
          href="https://instagram.com/zitacelis.jpg"
        >
          my instagram
        </a>
      </section>
      <section className="w-full flex mt-auto sm:mt-0">
        <picture className="mx-auto w-full h-full overflow-hidden">
          <img
            alt="me"
            src="/assets/1.jpg"
            className="w-full h-full object-cover filter grayscale hover:filter-none transition-all duration-1000"
          />
        </picture>
      </section>
    </main>
  );
}
