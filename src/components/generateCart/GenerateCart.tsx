"use client";

import { BASE_URL } from "@/app/(auth)/signIn/SignInAuth";
import { useCart } from "@/hooks/cart/cart_hooks";
import { Product } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const GenerateCart = () => {
  const loadProduct = useCart((state) => state.loadProductInCart);
  const { data: session } = useSession();

  useEffect(() => {
    (async () => {
      try {
        const resp = await fetch(
          `${BASE_URL}/api/cart?userId=${session!.user.id}`
        );
        const data = (await resp.json()) as { cart: Product[] };

        return loadProduct(data.cart);
      } catch (e: any) {
        return loadProduct([]);
      }
    })();
  }, [loadProduct, session]);

  return <></>;
};

export default GenerateCart;
