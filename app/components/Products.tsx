"use client";
import { useEffect } from "react";
import { formatCurrencyString, useShoppingCart } from "use-shopping-cart";
import { useStore } from "../utils/store";
const Products = () => {
  const { addItem, removeItem } = useShoppingCart();

  const { products, fetch } = useStore((state: any) => ({
    products: state.products,
    fetch: state.fetch,
  }));

  useEffect(() => {
    // if (isNaN(products)) {
    fetch();
    // }
  }, []);

  return (
    <section className="products  grid grid-cols-3 mx-auto gap-8">
      {products.map((product: any, i: number) => (
        <div
          key={i + "product"}
          className="product w-[25rem] h-[25rem] rounded-full flex flex-col items-center justify-center hover:border-black border-4 bg-black text-white transition-all duration-500 hover:scale-105 border-white p-8"
        >
          <picture className="w-[15rem] h-[15rem] overflow-hidden rounded-full">
            <img
              src={`https://zita-website.pockethost.io/api/files/vjwax4elade9otn/${product.id}/${product.image}`}
              className="w-full h-full object-cover rounded-full"
              alt={product.title}
            />
          </picture>
          <section className="flex justify-between py-2">
            <h2 className="font-sunflower text-2xl">{product.name}</h2>
            <p className="price ml-8">
              {formatCurrencyString({
                value: product.price,
                currency: "EUR",
              })}
            </p>
          </section>
          <button
            className="cart-style-background"
            onClick={() => addItem(product)}
          >
            Add to cart
          </button>
          <button
            className="cart-style-background"
            onClick={() => removeItem(i + "product")}
          >
            Remove
          </button>
        </div>
      ))}
    </section>
  );
};

export default Products;
