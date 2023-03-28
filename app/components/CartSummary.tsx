"use client";

import React, { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { useShoppingCart } from "use-shopping-cart";
import { fetchPostJSON } from "../utils/api-helpers";

const CartSummary = () => {
  const [loading, setLoading] = useState(false);
  const [cartEmpty, setCartEmpty] = useState(true);
  const { formattedTotalPrice, cartCount, clearCart, cartDetails } =
    useShoppingCart();
  const formatter = new Intl.NumberFormat("be-NL", {
    style: "currency",
    currency: "EUR",
  });

  console.log(cartDetails);

  useEffect(() => setCartEmpty(!cartCount), [cartCount]);
  const router = useRouter();
  const handleCheckout: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    setLoading(true);

    fetchPostJSON("/api/checkout_sessions/cart", cartDetails)
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
      className="font-george h-full flex flex-col"
    >
      <h2>Cart summary</h2>
      <section className="w-full h-full">
        {cartDetails &&
          Object.values(cartDetails).map((item) => {
            return (
              <div className="text-white flex" key={item.sku}>
                <picture className="w-20 h-20  rounded">
                  <img
                    alt={"item-image"}
                    src={item.image}
                    className="w-20 h-20 object-cover overflow-hidden rounded"
                  />
                </picture>
                <section className="flex ml-4 flex-col gap-4">
                  <p>{item.name}</p>
                  <p>Qty: {item.quantity}</p>
                </section>
                <section className="flex text-end ml-auto flex-col gap-4">
                  <p>{formatter.format(item.price / 100)}</p>
                  <p>{item.formattedValue}</p>
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
          <strong>Total:</strong> {formattedTotalPrice}
        </p>
      </section>
      <section className="flex justify-between mt-8">
        <button
          className="border-white border-2 rounded p-4"
          type="button"
          onClick={clearCart}
        >
          Clear Cart
        </button>
        <button
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
