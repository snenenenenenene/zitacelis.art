import Stripe from "stripe";

export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  image: string;
  category?: any;
  soldOut?: boolean;
  quantity: number;
}

export type TSession = Stripe.Response<Stripe.Checkout.Session>;
