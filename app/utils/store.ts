/* eslint-disable no-unused-vars */
import { create } from "zustand";

interface Store {
  collections: Array<any>[];
}

export const useStore = create<Store>()((set) => ({
  collections: [],
}));
