import { NextResponse } from "next/server";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
});

export async function GET(request: Request, context: any) {
  const sessionId: string = context.params.id as string;
  try {
    return stripe.checkout.sessions
      .retrieve(sessionId)
      .then((session) => {
        console.log(session);
        return NextResponse.json(session);
      })
      .catch((err) => {
        console.log(err.message);
        return NextResponse.json({ statusCode: 500, message: err.message });
      });
  } catch (err: any) {
    return NextResponse.json({ statusCode: 500, message: err.message });
  }
}
