import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
});

import { formatCart } from "@/app/utils/cart-formatter";
import { NextResponse } from "next/server";
import PocketBase from "pocketbase";
export const pb = new PocketBase(
  process.env.NEXT_PUBLIC_POCKET_BASE_URL
).autoCancellation(false);

export async function POST(request: Request) {
  try {
    const res = await request.json();
    const line_items = formatCart(res);

    console.log(res);

    const ids = Object.values(res)
      .map((item: any) => item.id)
      .join(",");
    const titles = Object.values(res)
      .map((item: any) => item.title)
      .join(",");
    const images = Object.values(res)
      .map((item: any) => item.image)
      .join(",");
    const amount_totals = Object.values(res)
      .map((item: any) => item.quantity * item.price)
      .join(",");

    const quantities = Object.values(res)
      .map((item: any) => item.quantity)
      .join(",");

    const unit_amounts = Object.values(res)
      .map((item: any) => item.price)
      .join(",");
    const params: Stripe.Checkout.SessionCreateParams = {
      submit_type: "pay",
      payment_method_types: ["card", "bancontact", "ideal"],
      billing_address_collection: "auto",
      mode: "payment",
      shipping_address_collection: {
        allowed_countries: ["BE", "FR", "GB", "IE", "NL", "LU"],
      },
      line_items: line_items,
      metadata: {
        titles: titles,
        ids: ids,
        images: images,
        amount_totals: amount_totals,
        quantities: quantities,
        unit_amounts: unit_amounts,
      },
      success_url: `${request.headers.get(
        "origin"
      )}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get("origin")}/shop`,
    };
    return await stripe.checkout.sessions
      .create(params)
      .then((checkoutSession) => {
        return NextResponse.json(checkoutSession);
      });
  } catch (err: any) {
    console.log(err);
    return NextResponse.json({ statusCode: 500, message: err.message });
  }
}
