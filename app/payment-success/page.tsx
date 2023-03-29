"use client";
import axios from "axios";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import Stripe from "stripe";
import { formatter } from "../config/config";
import { useStore } from "../utils/store";

import PocketBase from "pocketbase";
export const pb = new PocketBase(
  process.env.NEXT_PUBLIC_POCKET_BASE_URL
).autoCancellation(false);

L.Marker.prototype.options.icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
});

export default function Success(context: any) {
  const sessionId = context.searchParams.session_id;
  type TSession = Stripe.Response<Stripe.Checkout.Session>;
  const [session, setSession] = useState<TSession | null>(null);
  const [lineItems, setLineItems] = useState<any | null>(null);

  const [coordinates, setCoordinates] = useState<any | null>(null);
  const { clearCart } = useStore((state) => ({
    clearCart: state.clearCart,
  }));

  useEffect(() => {
    axios
      .get(`/api/session/${sessionId}`)
      .then((res) => {
        setSession(res.data);
        setLineItems(
          res.data.metadata.ids.split(",").map((_id: any, i: number) => {
            return {
              id: res.data.metadata.ids.split(",")[i],
              image: res.data.metadata.images.split(",")[i],
              quantity: res.data.metadata.quantities.split(",")[i],
              unit_amount: res.data.metadata.unit_amounts.split(",")[i],
              amount_total: res.data.metadata.amount_totals.split(",")[i],
            };
          })
        );

        axios
          .get(
            `https://geocode.maps.co/search?q=${res.data?.customer_details?.address?.line1?.replace(
              " ",
              "+"
            )}`
          )
          .then((response) => {
            setCoordinates(response.data[0]);
          })
          .catch((err) => {
            console.log(err);
          });

        clearCart();
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    lineItems?.forEach((product: any) => {
      pb.collection("products").update(product.id, {
        soldOut: true,
      });
    });
  }, [lineItems]);

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

          <section>
            <p className="font-sunflower text-2xl">Shipping Address:</p>
            <p>{session?.customer_details?.address?.line1}</p>
            <span className="flex">
              <p>{session?.customer_details?.address?.city},&nbsp;</p>
              <p>{session?.customer_details?.address?.postal_code}</p>
            </span>
            <p>{session?.customer_details?.address?.country}</p>
          </section>
          <section className="w-full h-[30rem] border-2 border-black mt-auto overflow-hidden">
            {coordinates && (
              <MapContainer
                className="w-full h-full "
                // @ts-ignore
                center={[coordinates.lat, coordinates.lon]}
                zoom={12}
              >
                <TileLayer
                  // @ts-ignore
                  attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.png"
                />
                <Marker position={[coordinates.lat, coordinates.lon]}>
                  <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                  </Popup>
                </Marker>
              </MapContainer>
            )}
          </section>
        </div>
      )}
      {lineItems && (
        <div className="text-xl flex-col overflow-hidden font-george border-t-2 border-black w-1/2 flex h-full">
          <section className="h-full flex overflow-scroll">
            {lineItems.map((item: any) => {
              return (
                <div
                  key={item.name}
                  className="flex p-4 h-[12rem] items-center w-full border-b-2 border-black"
                >
                  <picture className="h-full mr-8">
                    <img
                      alt="productImage"
                      src={`https://zita-website.pockethost.io/api/files/vjwax4elade9otn/${item?.id}/${item?.image}`}
                      className="h-full object-contain"
                    />
                  </picture>
                  <section className="flex flex-col h-full  py-2 ">
                    <p className="text-black font-sunflower">{item.title}</p>
                    <p className="mt-auto">Qty: {item.quantity}</p>
                  </section>
                  <section className="flex ml-auto h-full flex-col py-2 text-end">
                    <p>{formatter.format(item.unit_amount / 100)}</p>
                    <p className="mt-auto">
                      Total: {formatter.format(item.amount_total / 100)}
                    </p>
                  </section>
                </div>
              );
            })}
          </section>
          <section className="w-full flex border-t-2 border-black">
            <div className="flex items-center justify-center w-full pl-10">
              <p>
                Subtotal:
                {formatter.format(session.amount_subtotal! / 100)}
              </p>
              <p>
                Discount:
                {formatter.format(session.total_details?.amount_discount!)}
              </p>
              <p>
                Tax:
                {formatter.format(session.total_details?.amount_tax!)}
              </p>
              <p>
                Shipping:
                {formatter.format(session.total_details?.amount_shipping!)}
              </p>
              <p>Total: {formatter.format(session.amount_total! / 100)}</p>
            </div>
            <button className=" bg-black w-40 m-6 ml-auto h-20 hover:scale-105 font-sunflower text-white rounded-xl">
              To Shop
            </button>
          </section>
        </div>
      )}
    </div>
  );
}
