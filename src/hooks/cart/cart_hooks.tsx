import { Product } from "@prisma/client";
import { create } from "zustand";

type CartState = {
  products: Product[];
};

type CartAction = {
  loadProductInCart: (products: Product[]) => void;
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  incrementProductCount: (id: string) => void;
  decrementProductCount: (id: string) => void;
};

export const useCart = create<CartState & CartAction>((set) => ({
  products: [],
  loadProductInCart: (products) => set(() => ({ products })),
  addToCart: (product) =>
    set((state) => addProductWhenDuplicate(state.products, product)),
  removeFromCart: (id) =>
    set((state) => ({
      products: state.products.filter((product) => product.id !== id),
    })),
  incrementProductCount: (id) =>
    set((state) => incrementProductCountFunc(state.products, id)),
  decrementProductCount: (id) =>
    set((state) => decrementProductCountFunc(state.products, id)),
}));

const addProductWhenDuplicate = (
  state: Product[],
  product: Product
): { products: Product[] } => {
  const duplicate = state.find((prevProduct) => prevProduct.id === product.id);

  if (!duplicate) return { products: state.concat(product) };

  return incrementProductCountFunc(state, product.id);
};

const decrementProductCountFunc = (
  state: Product[],
  id: string
): { products: Product[] } => {
  const found = state.find((product) => product.id === id) as Product;

  const existingProducts = state.filter((product) => product.id !== id);

  return {
    products: [
      ...existingProducts,
      {
        ...found,
        price:
          found.count !== 1
            ? found.price - found.originalPrice
            : found.originalPrice,
        count: found.count !== 1 ? found.count - 1 : found.count,
      },
    ],
  };
};

const incrementProductCountFunc = (
  state: Product[],
  id: string
): { products: Product[] } => {
  const found = state.find((product) => product.id === id) as Product;

  const existingProducts = state.filter((product) => product.id !== id);

  return {
    products: [
      ...existingProducts,
      {
        ...found,
        price:
          found.count !== 4
            ? found.originalPrice * (found.count + 1)
            : found.price,
        count: found.count !== 4 ? found.count + 1 : found.count,
      },
    ],
  };
};
