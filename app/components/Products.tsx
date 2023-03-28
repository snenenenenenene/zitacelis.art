"use client";
import Link from "next/link";
import { formatCurrencyString } from "use-shopping-cart";
import { useStore } from "../utils/store";

const Products = () => {
  const { products } = useStore((state: any) => ({
    products: state.products,
    fetch: state.fetch,
  }));

  return (
    <section className="overflow-scroll grid grid-cols-3 mx-auto gap-8">
      {products.map((product: any, i: number) => (
        <Link
          href={`/shop/${product?.id}`}
          key={i + "product"}
          className="product w-[25rem] cursor-pointer h-[25rem] rounded-3xl flex flex-col items-center justify-center hover:border-black border-4 bg-black text-white transition-all duration-500 hover:scale-105 border-white p-8"
        >
          <picture className="w-[15rem] h-full overflow-hidden">
            <img
              src={`https://zita-website.pockethost.io/api/files/vjwax4elade9otn/${product?.id}/${product?.image}`}
              className="w-full h-full object-contain"
              alt={product?.title}
            />
          </picture>
          <section className="flex justify-between py-2 flex-col items-center">
            <h2 className="font-sunflower text-2xl">{product?.title}</h2>
            <p>
              {formatCurrencyString({
                value: product?.price,
                currency: "EUR",
              })}
            </p>
          </section>
        </Link>
      ))}
    </section>
  );
};

export default Products;
