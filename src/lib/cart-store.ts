"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartLine = {
  key: string;
  productId: number;
  variantId: number;
  slug: string;
  name: string;
  variantName: string;
  price: number;
  quantity: number;
  image: string;
  accent: string;
};

type CartState = {
  lines: CartLine[];
  isOpen: boolean;
  lastAdded: string | null;
  open: () => void;
  close: () => void;
  toggle: () => void;
  addItem: (line: Omit<CartLine, "quantity">, quantity?: number) => void;
  removeItem: (key: string) => void;
  updateQuantity: (key: string, quantity: number) => void;
  clear: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      isOpen: false,
      lastAdded: null,
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      toggle: () => set({ isOpen: !get().isOpen }),
      addItem: (line, quantity = 1) => {
        const lines = [...get().lines];
        const existing = lines.find((l) => l.key === line.key);
        if (existing) {
          existing.quantity += quantity;
        } else {
          lines.push({ ...line, quantity });
        }
        set({ lines, isOpen: true, lastAdded: line.key });
      },
      removeItem: (key) => set({ lines: get().lines.filter((l) => l.key !== key) }),
      updateQuantity: (key, quantity) => {
        if (quantity <= 0) {
          set({ lines: get().lines.filter((l) => l.key !== key) });
          return;
        }
        set({
          lines: get().lines.map((l) => (l.key === key ? { ...l, quantity } : l)),
        });
      },
      clear: () => set({ lines: [] }),
    }),
    { name: "ceremony-cart-v2" },
  ),
);

export function cartTotal(lines: CartLine[]): number {
  return lines.reduce((sum, l) => sum + l.price * l.quantity, 0);
}

export function cartCount(lines: CartLine[]): number {
  return lines.reduce((sum, l) => sum + l.quantity, 0);
}
