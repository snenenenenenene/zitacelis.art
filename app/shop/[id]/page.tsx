"use client";
import { formatter } from "@/app/config/config";
import { useStore } from "@/app/utils/store";
import Link from "next/link";
import { useState } from "react";
import { GiCartwheel } from "react-icons/gi";

export default function Product(context: any) {
  const { id } = context.params;
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState<any>({});

  const { product, nextProduct, previousProduct } = useStore((state: any) => ({
    product: state.products.find((product: any) => product.id === id),
    nextProduct:
      state.products[
        state.products.findIndex((product: any) => product.id === id) + 1
      ] || state.products[0],
    previousProduct:
      state.products[
        state.products.findIndex((product: any) => product.id === id) - 1
      ] || state.products[state.products.length - 1],
  }));

  const { addToCart } = useStore((state: any) => ({
    cart: state.cart,
    addToCart: state.addToCart,
    removeFromCart: state.removeFromCart,
  }));

  const { openCart, toggleOpenCart } = useStore((state) => {
    return {
      openCart: state.openCart,
      toggleOpenCart: state.toggleOpenCart,
    };
  });

  //TODO: WHEN PRODUCT IS A PHOTO LET PEOPLE CHOOSE BETWEEN PRINTING A4, A5 AND LET THEM KNOW THEY GET A DIGITAL COPY AS WELL

  return (
    <div className="flex text-black w-full h-full">
      {product && (
        <>
          <picture className="w-full  p-20 bg-black h-full border-r-2 border-black overflow-hidden">
            <img
              onClick={() => {
                setModalData(product);
                setShowModal(true);
              }}
              src={`https://zita-website.pockethost.io/api/files/vjwax4elade9otn/${product?.id}/${product?.image}`}
              className="w-full cursor-pointer hover:scale-105 transition-all duration-500 h-full object-contain"
              alt={product?.title}
            />
          </picture>
          <section className="flex flex-col justify-between w-full h-full">
            <div className="border-b-2 p-8 border-black w-full flex flex-col h-full">
              <span className="flex  w-full justify-between">
                <h2 className="font-sunflower text-4xl">{product?.title}</h2>
                <p className="text-2xl font-george">
                  {formatter.format(product?.price / 100)}
                </p>
              </span>
              <h2 className="font-george text-xl">
                {product?.description || "No description"}
              </h2>
              <button
                disabled={product.soldOut}
                className={`${
                  product.soldOut
                    ? "bg-white text-black"
                    : "bg-black text-white hover:bg-white  hover:text-black"
                } flex justify-center items-center border-2 text-3xl  border-black  transition-all hover:scale-105 duration-500  font-sunflower rounded-xl h-[5rem] mt-auto`}
                onClick={() => {
                  openCart || toggleOpenCart();
                  addToCart(product);
                }}
              >
                {product.soldOut ? (
                  <>Sold Out</>
                ) : (
                  <>
                    Add to Cart <GiCartwheel className="text-4xl ml-4" />
                  </>
                )}
              </button>
            </div>
            <div className="h-full flex w-full">
              <Link
                href={`/shop/${previousProduct.id}`}
                className="w-full border-r-2  relative hover:text-8xl transition-all duration-500 border-black h-full flex justify-center items-center text-6xl uppercase font-sunflower"
              >
                <picture className="absolute z-10 filter opacity-20 w-1/2 h-full">
                  <img
                    alt="prev"
                    className="w-full h-full object-contain"
                    src={`https://zita-website.pockethost.io/api/files/vjwax4elade9otn/${previousProduct?.id}/${previousProduct?.image}`}
                  />
                </picture>
                <p className="w-full z-20 h-full opacity-100 justify-center items-center  transition-all duration-500 flex border-4 border-white hover:border-black">
                  prev
                </p>
              </Link>
              <Link
                href={`/shop/${nextProduct.id}`}
                className="w-full border-r-2  relative hover:text-8xl transition-all duration-500 border-black h-full flex justify-center items-center text-6xl uppercase font-sunflower"
              >
                <picture className="absolute z-10 filter opacity-20 w-1/2 h-full">
                  <img
                    alt="next"
                    className="w-full h-full object-contain"
                    src={`https://zita-website.pockethost.io/api/files/vjwax4elade9otn/${nextProduct?.id}/${nextProduct?.image}`}
                  />
                </picture>
                <p className="w-full z-20 h-full opacity-100 justify-center items-center  transition-all duration-500 flex border-4 border-white hover:border-black">
                  next
                </p>
              </Link>

              {/* //TODO: ADD PREV AND NEXT PRODUCT */}
            </div>
          </section>
        </>
      )}
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
                src={`https://zita-website.pockethost.io/api/files/vjwax4elade9otn/${modalData?.id}/${modalData?.image}`}
              />
            </picture>
          </section>
        </div>
      )}
    </div>
  );
}
