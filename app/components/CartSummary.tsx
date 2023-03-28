"use client";

import React, { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { formatter } from "../config/config";
import { fetchPostJSON } from "../utils/api-helpers";
import { useStore } from "../utils/store";

const CartSummary = () => {
  const [loading, setLoading] = useState(false);
  const [cartEmpty, setCartEmpty] = useState(true);

  const { cart, cartCount, clearCart, totalPrice } = useStore((state) => ({
    cart: state.cart,
    cartCount: state.cartCount,
    clearCart: state.clearCart,
    totalPrice: state.totalPrice,
  }));

  useEffect(() => setCartEmpty(!cartCount), [cartCount]);
  const router = useRouter();
  const handleCheckout: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    setLoading(true);

    fetchPostJSON("/api/checkout_sessions/cart", cart)
      .then((res) => {
        router.push(res.url);
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  return (
    <form
      onSubmit={handleCheckout}
      className="font-george h-full flex flex-col shadow-2xl"
    >
      <h2 className="text-xl font-sunflower mb-4">Cart summary</h2>
      <section className="w-full overflow-scroll h-full flex flex-col gap-y-8">
        {cart.length > 0 &&
          cart.map((item: any) => {
            return (
              <div className="text-white flex" key={item.id}>
                {item.image && (
                  <picture className="w-20 h-20  rounded">
                    <img
                      alt={"item-image"}
                      src={`https://zita-website.pockethost.io/api/files/vjwax4elade9otn/${item.id}/${item.image}`}
                      className="w-20 h-20 object-cover overflow-hidden rounded"
                    />
                  </picture>
                )}
                <section className="flex ml-4 flex-col gap-4">
                  <p suppressHydrationWarning>{item.name}</p>
                  <p suppressHydrationWarning>Qty: {item.quantity}</p>
                </section>
                <section className="flex text-end ml-auto flex-col gap-4">
                  <p suppressHydrationWarning>
                    {formatter.format(item.price / 100)}
                  </p>
                  <p suppressHydrationWarning>{item.formattedValue}</p>
                </section>
              </div>
            );
          })}
      </section>
      <section className="flex w-full justify-between mt-4">
        <p suppressHydrationWarning>
          <strong>Number of Items:</strong> {cartCount}
        </p>
        <p suppressHydrationWarning>
          <strong>Total:</strong> {formatter.format(totalPrice / 100)}
        </p>
      </section>
      <section className="flex justify-between mt-8">
        <button
          className="border-white border-2 rounded p-4"
          type="button"
          suppressHydrationWarning
          onClick={clearCart}
        >
          Clear Cart
        </button>
        <button
          suppressHydrationWarning
          className="border-white bg-white text-black border-2 rounded p-4"
          type="submit"
          disabled={cartEmpty || loading}
        >
          Checkout
        </button>
      </section>
    </form>
  );
};

export default CartSummary;
