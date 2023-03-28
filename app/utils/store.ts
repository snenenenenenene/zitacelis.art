/* eslint-disable no-unused-vars */
import PocketBase from "pocketbase";
import { create } from "zustand";
interface Store {
  collections: Array<any>[];
  products: Array<any>[];
  cart: Array<any>[];
  totalPrice: number;
  addToCart: (product: any) => void;
  removeFromCart: (product: any) => void;
  cartCount: number;
  clearCart: () => void;
  fetch: () => Promise<void>;
}

export const pb = new PocketBase(
  process.env.NEXT_PUBLIC_POCKET_BASE_URL
).autoCancellation(false);

import { createJSONStorage, persist } from "zustand/middleware";

export const useStore = create(
  persist(
    (set: any, get: any) =>
      ({
        collections: [],
        products: [],
        cart: [],
        cartCount: 0,
        totalPrice: 0,
        clearCart: () => {
          set({ cart: [], cartCount: 0, totalPrice: 0 });
        },
        addToCart: (product: any) => {
          // if the product is already in the cart, increase the quantity if not, add it a quantity of 1 to the product
          set((state: any) => {
            const existingProduct = state.cart.find(
              (item: any) => item.id === product.id
            );

            if (existingProduct) {
              existingProduct.quantity += 1;
              return {
                cartCount: state.cartCount + 1,
                totalPrice: state.totalPrice + product.price,
                cart: state.cart,
              };
            } else {
              return {
                cartCount: state.cartCount + 1,
                totalPrice: state.totalPrice + product.price,
                cart: [...state.cart, { ...product, quantity: 1 }],
              };
            }
          });
        },
        removeFromCart: (productId: any) => {
          set((state: any) => ({
            cart: state.cart.filter((product: any) => product.id !== productId),
          }));
        },
        fetch: async () => {
          await pb
            .collection("products")
            .getFullList()
            .then((res: any) => {
              set({
                products: res,
              });
            })
            .catch((err) => {
              console.error(err);
            });

          await pb
            .collection("collections")
            .getFullList({
              expand: "cover,images",
            })
            .then((res: any) => {
              set({ collections: res });
            })
            .catch((err) => {
              console.error(err);
            });
        },
      } as Store),
    {
      name: "store",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
