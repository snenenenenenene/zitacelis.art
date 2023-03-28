/*
 * Product data can be loaded from anywhere. In this case, we’re loading it from
 * a local JSON file, but this could also come from an async call to your
 * inventory management service, a database query, or some other API call.
 *
 * The important thing is that the product info is loaded from somewhere trusted
 * so you know the pricing information is accurate.
 */

import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: "2022-11-15",
});

import { formatCart } from "@/app/utils/cart-formatter";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const res = await request.json();
    const line_items = formatCart(res);

    const params: Stripe.Checkout.SessionCreateParams = {
      submit_type: "pay",
      payment_method_types: ["card", "bancontact", "ideal"],
      billing_address_collection: "auto",
      mode: "payment",
      shipping_address_collection: {
        allowed_countries: ["BE", "FR", "GB", "IE", "NL", "LU"],
      },
      line_items: line_items,
      success_url: `${request.headers.get(
        "origin"
      )}/shop/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get("origin")}/shop/cart`,
    };
    return await stripe.checkout.sessions
      .create(params)
      .then((checkoutSession) => {
        return NextResponse.json(checkoutSession);
      });
  } catch (err: any) {
    return NextResponse.json({ statusCode: 500, message: err.message });
  }
}
