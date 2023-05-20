"use client";

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
          `http://localhost:3000/api/cart?userId=${session!.user.id}`
        );
        const data = (await resp.json()) as { cart: Product[] };

        console.log({ data });

        return loadProduct(data.cart);
      } catch (e: any) {
        console.error(e);
        return loadProduct([]);
      }
    })();
  }, [loadProduct, session]);

  return <></>;
};

export default GenerateCart;
