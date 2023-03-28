/* eslint-disable no-unused-vars */
import PocketBase from "pocketbase";
import { create } from "zustand";
interface Store {
  collections: Array<any>[];
  fetch: () => Promise<void>;
}

export const pb = new PocketBase(
  process.env.NEXT_PUBLIC_POCKET_BASE_URL
).autoCancellation(false);

import { createJSONStorage, persist } from "zustand/middleware";

export const useStore = create(
  persist(
    (set, get) =>
      ({
        collections: [],
        fetch: async () => {
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
      name: "food-storage", // unique name
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
