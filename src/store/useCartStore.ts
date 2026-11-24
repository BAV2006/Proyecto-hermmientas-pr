import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface IProductCart {
  id: number;
  name: string;
  price: number;
  image: string;
  stock: number;
  quantity: number;
}

interface CartState {
  products: IProductCart[];
  add: (product: IProductCart) => void;
  remove: (id: number) => void;
  clear: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      products: [],

      add: (product: IProductCart) =>
        set((state) => {
          const existProduct = state.products.some((p) => p.id === product.id);

          if (existProduct) {
            return {
              products: state.products.map((p) =>
                p.id === product.id ? { ...p, quantity: product.quantity } : p
              ),
            };
          }

          return { products: [...state.products, product] };
        }),

      remove: (id: number) =>
        set((state) => ({
          products: state.products.filter((product) => product.id !== id),
        })),

      clear: () => set({ products: [] }),
    }),
    {
      name: "aroma-shopping-cart",
      storage: createJSONStorage(() => localStorage),
    }
  )
);