"use client";

import { useCart } from "@/hooks/cart/cart_hooks";
import { BASE_URL } from "@/lib/config/url";
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
          `https://p3das.vercel.app/api/cart?userId=${session!.user.id}`,
          {
            cache: "no-store",
          }
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
