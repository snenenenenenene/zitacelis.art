"use client";
import { Product } from "@/types/types";
import Link from "next/link";
import { useEffect } from "react";
import { formatCurrencyString } from "use-shopping-cart";
import { useStore } from "../utils/store";

const Products = () => {
  const { products, fetch } = useStore((state: any) => ({
    products: state.products,
    fetch: state.fetch,
  }));

  useEffect(() => {
    fetch();
  }, []);
  return (
    <section className="overflow-scroll grid grid-cols-1 md:grid-cols-3 w-full mx-auto gap-8">
      {products.map((product: Product) => (
        <Link
          href={`/shop/${product?.id}`}
          key={product.id}
          className="w-full relative cursor-pointer aspect-square overflow-hidden rounded-3xl flex flex-col items-center justify-center hover:border-black border-2 scale-95  bg-black border-black text-white transition-all duration-500 hover:scale-100 p-8"
        >
          {product.soldOut && (
            <span className="bg-white absolute h-[5%] font-george uppercase text-black flex justify-center items-center top-0 left-0 w-full">
              Sold out
            </span>
          )}
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
