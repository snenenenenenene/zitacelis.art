"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Stripe from "stripe";
import inventory from "../data/products.json";
export default function Success(context: any) {
  const sessionId = context.searchParams.session_id;
  type TSession = Stripe.Response<Stripe.Checkout.Session>;
  const [session, setSession] = useState<TSession | null>(null);
  const [lineItems, setLineItems] = useState<any | null>(null);

  const formatter = new Intl.NumberFormat("be-NL", {
    style: "currency",
    currency: "EUR",
  });
  // const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
  // const session = stripe.checkout.sessions.retrieve(sessionId);

  useEffect(() => {
    axios
      .get(`/api/session/${sessionId}`)
      .then((res) => {
        console.log(res.data);
        setSession(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`/api/session/${sessionId}/line_items`)
      .then((res) => {
        console.log(res.data);
        setLineItems(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="text-9xl font-sunflower flex text-black h-full w-full">
      {session && (
        <div className="text-xl p-4 font-george w-1/2 border-r-2 border-black h-full">
          <p>
            <strong>Name</strong>: {session?.customer_details?.name}
          </p>
          <p>
            <strong>Email</strong>: {session?.customer_details?.email}
          </p>
          <p>{session?.customer_details?.phone}</p>
          <p>
            <strong>Subtotal</strong>:
            {formatter.format(session.amount_subtotal!)}
          </p>
          <p>
            <strong>Discount</strong>:
            {formatter.format(session.total_details?.amount_discount!)}
          </p>
          <p>
            <strong>Tax</strong>:
            {formatter.format(session.total_details?.amount_tax!)}
          </p>
          <p>
            <strong>Shipping</strong>:
            {formatter.format(session.total_details?.amount_shipping!)}
          </p>
          <p>
            <strong>Total</strong>: {formatter.format(session.amount_total!)}
          </p>
        </div>
      )}
      {lineItems && (
        <div className="text-xl font-george border-t-2 border-black w-1/2">
          <button className="fixed bottom-14 right-14 bg-black w-40 h-20 hover:scale-105 font-sunflower text-white rounded-xl">
            To Shop
          </button>
          {lineItems.data.map((item: any) => {
            return (
              <div
                key={item.name}
                className="flex p-4 h-40 items-center w-full border-b-2 border-black"
              >
                <picture className="w-32 h-32 mr-8">
                  <img
                    alt="productImage"
                    src={
                      inventory.find((product) => {
                        return product.name === item.description;
                      })?.image
                    }
                    className="w-32 h-32 rounded-full object-cover"
                  />
                </picture>
                <section className="flex flex-col h-full  py-2 ">
                  <p>{item.description}</p>
                  <p className="mt-auto">Qty: {item.quantity}</p>
                </section>
                <section className="flex ml-auto h-full flex-col py-2 text-end">
                  <p>{item.price.unit_amount}</p>
                  <p className="mt-auto">Total: {item.amount_total}</p>
                </section>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
