"use client";
import { formatter } from "@/app/config/config";
import { useStore } from "@/app/utils/store";
import { GiCartwheel } from "react-icons/gi";

export default function Product(context: any) {
  const { id } = context.params;
  const { product } = useStore((state: any) => ({
    product: state.products.find((product: any) => product.id === id),
    fetch: state.fetch,
  }));

  const { addToCart } = useStore((state: any) => ({
    cart: state.cart,
    addToCart: state.addToCart,
    removeFromCart: state.removeFromCart,
  }));

  return (
    <div className="flex text-black w-full h-full">
      {product && (
        <>
          <picture className="w-full p-20 bg-black h-full border-r-2 border-black overflow-hidden">
            <img
              src={`https://zita-website.pockethost.io/api/files/vjwax4elade9otn/${product?.id}/${product?.image}`}
              className="w-full h-full object-cover"
              alt={product?.title}
            />
          </picture>
          <section className="flex flex-col justify-between py-2 w-full h-full">
            <div className="border-b-2 p-8 border-black w-full flex flex-col h-full">
              <span className="flex  w-full justify-between">
                <h2 className="font-sunflower text-4xl">{product?.title}</h2>
                <p className="text-2xl font-george">
                  {formatter.format(product?.price / 100)}
                </p>
              </span>
              <button
                className="flex justify-center items-center text-3xl hover:bg-white border-2 border-black hover:text-black transition-all hover:scale-105 duration-500 bg-black text-white font-sunflower rounded-xl h-[5rem] mt-auto"
                onClick={() => addToCart(product)}
              >
                Add to Cart <GiCartwheel className="text-4xl ml-4" />
              </button>
            </div>
            <div className="h-full flex w-full"></div>
          </section>
        </>
      )}
    </div>
  );
}
