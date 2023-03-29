"use client";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import Stripe from "stripe";
import { formatter } from "../../config/config";

export default function DonationSuccess(context: any) {
  const sessionId = context.searchParams.session_id;
  type TSession = Stripe.Response<Stripe.Checkout.Session>;
  const [session, setSession] = useState<TSession | null>(null);

  useEffect(() => {
    axios
      .get(`/api/session/${sessionId}`)
      .then((res) => {
        setSession(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="text-9xl font-sunflower flex text-black h-full w-full">
      {session && (
        <div className="text-xl p-4 font-george w-1/2 border-r-2 border-black h-full flex flex-col">
          <span>
            <h2 className="font-sunflower text-2xl">Name</h2>
            <p>{session?.customer_details?.name}</p>
          </span>
          <section>
            <h2 className="font-sunflower text-2xl">Contact</h2>
            <span className="flex gap-x-8">
              <p>{session?.customer_details?.email}</p>

              <p>{session?.customer_details?.phone}</p>
            </span>
          </section>
        </div>
      )}

      <div className="text-xl flex-col overflow-hidden font-george border-t-2 border-black w-1/2 flex h-full">
        <section className="h-full flex overflow-scroll">
          <div
            key={"Donation"}
            className="flex p-4 h-[12rem] items-center w-full border-b-2 border-black"
          >
            <picture className="h-full mr-8">
              <img
                alt="productImage"
                src={`http://www.bigc.co.th/blog/wp-content/uploads/2021/02/coffee-cup-coffee-beans-JDGKZJ2.jpg`}
                className="h-full object-contain"
              />
            </picture>
            <section className="flex ml-auto h-full flex-col py-2 text-end">
              <p className="mt-auto">
                Total:{formatter.format(session?.amount_total! / 100)}
              </p>
            </section>
          </div>
        </section>
        <section className="w-full flex border-t-2 border-black">
          <div className="flex items-center justify-center w-full pl-10">
            <p>
              Subtotal:
              {formatter.format(session?.amount_subtotal! / 100)}
            </p>
            <p>
              Discount:
              {formatter.format(session?.total_details?.amount_discount!)}
            </p>
            <p>
              Tax:
              {formatter.format(session?.total_details?.amount_tax!)}
            </p>
            <p>
              Shipping:
              {formatter.format(session?.total_details?.amount_shipping!)}
            </p>
            <p>Total: {formatter.format(session?.amount_total! / 100)}</p>
          </div>
          <button className=" bg-black w-40 m-6 ml-auto h-20 hover:scale-105 font-sunflower text-white rounded-xl">
            To Shop
          </button>
        </section>
      </div>
    </div>
  );
}
