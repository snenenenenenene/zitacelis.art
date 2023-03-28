import { ReactNode } from "react";
import { CartProvider } from "use-shopping-cart";
import * as config from "../config/config";
import getStripe from "../utils/get-stripejs";

//TODO: switch to zustand
const Cart = ({ children }: { children: ReactNode }) => (
  <CartProvider
    // mode="checkout-session"
    // @ts-ignore
    stripe={getStripe()}
    shouldPersist={true}
    currency={config.CURRENCY}
  >
    <>{children}</>
  </CartProvider>
);

export default Cart;
