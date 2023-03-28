"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Stripe from "stripe";

export default function Success(context: any) {
  const sessionId = context.searchParams.session_id;
  type lol = Stripe.Response<Stripe.Checkout.Session>;
  const [session, setSession] = useState<any | null>(null);

  const formatter = new Intl.NumberFormat("be-NL", {
    style: "currency",
    currency: "EUR",
  });
  // const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
  // const session = stripe.checkout.sessions.retrieve(sessionId);

  useEffect(() => {
    axios.get(`/api/session/${sessionId}`).then((res) => {
      console.log(res);
      setSession(res);
    });
    // axios
    //   .get(`https://api.stripe.com/v1/checkout/sessions/${sessionId}`)
    //   .then((res) => {
    //     console.log(res);
    //   });
  }, []);
  return (
    <div className="text-9xl font-sunflower text-black">
      {session && (
        <div className="text-xl font-george">
          <p>{session?.customer_details?.name}</p>
          <p>{session?.customer_details?.email}</p>
          <p>{session?.customer_details?.phone}</p>
          <p>{formatter.format(session.amount_subtotal!)}</p>
          <p>{formatter.format(session.amount_total!)}</p>
        </div>
      )}
    </div>
  );
}
