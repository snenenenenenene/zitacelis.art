import { CURRENCY, MAX_AMOUNT, MIN_AMOUNT } from "../../config/config";
import { formatAmountForStripe } from "../../utils/stripe-helpers";

import { NextResponse } from "next/server";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
});

export async function POST(request: Request) {
  const body = await request.json();
  const amount: number = body.amount;
  try {
    if (!(amount >= MIN_AMOUNT && amount <= MAX_AMOUNT)) {
      throw new Error("Invalid amount.");
    }
    const params: Stripe.Checkout.SessionCreateParams = {
      submit_type: "donate",
      payment_method_types: ["card", "bancontact", "ideal"],
      mode: "payment",
      line_items: [
        {
          quantity: 1,

          price_data: {
            unit_amount: formatAmountForStripe(amount, CURRENCY),
            currency: CURRENCY,
            product_data: {
              name: "Custom amount donation",
            },
          },
        },
      ],
      success_url: `${request.headers.get(
        "origin"
      )}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get("origin")}/contact`,
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
