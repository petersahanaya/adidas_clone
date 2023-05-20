"use client";

import { BASE_URL } from "@/app/(auth)/signIn/SignInAuth";
import ArrowIcon from "@/components/icons/arrowIcon/ArrowIcon";
import HeartIcon from "@/components/icons/heartIcon/HeartIcon";
import Spinner from "@/components/spinner/Spinner";
import { useCart } from "@/hooks/cart/cart_hooks";
import Button from "@components/button/Button";
import { Product } from "@prisma/client";
import { useCallback, useState } from "react";

type DescriptionProps = {
  title: string;
  description: string;
  size: string;
  stock: number;
  userId: string;
  product: Product;
};

const Description = ({
  title,
  description,
  size,
  stock,
  product,
  userId,
}: DescriptionProps) => {
  const cart = useCart((state) => state.products);
  const addToCart = useCart((state) => state.addToCart);

  const [state, setState] = useState({
    error: false,
    success: false,
    loading: false,
  });

  console.log("CART : ", cart);

  const onPressedAddToCart = useCallback(async () => {
    addToCart(product);
    setState((prev) => ({ ...prev, loading: true }));
    try {
      const resp = await fetch(`${BASE_URL}/api/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ product, userId }),
      });

      if (resp.status !== 200 || !resp.ok) {
        setState((prev) => ({ ...prev, error: true }));

        setTimeout(() => {
          setState((prev) => ({ ...prev, error: false }));
        }, 1500);
      }

      const data = await resp.json();

      console.log("ADDED TO CART : ", data);

      setState((prev) => ({ ...prev, loading: false, success: true }));

      setTimeout(() => {
        setState((prev) => ({ ...prev, success: false }));
      }, 1500);
    } catch (e) {
    } finally {
      setState((prev) => ({ ...prev, loading: false, error: false }));
    }
  }, [addToCart, product, userId]);

  return (
    <>
      <div>
        <p className="text-xs text-stone-700">{size}</p>
        <div>
          <p className="text-red-400 text-[.7rem] font-[500] uppercase">
            {stock} stock
          </p>
        </div>
      </div>
      <div className="flex justify-around items-end gap-2">
        <div onClick={onPressedAddToCart}>
          <Button
            background="bg-stone-400"
            width="w-[160px] flex-1"
            textColor="text-stone-100"
            padding="mt-4 p-4"
            type="button"
          >
            {!state.loading ? (
              "Add to bag"
            ) : (
              <Spinner width={23} height={23} color="#ffffff" />
            )}
            {/* <ArrowIcon color="#ffffff" width={13} height={13} /> */}
          </Button>
        </div>
        <div className="border-[1px] p-[.55rem] border-stone-400">
          <HeartIcon width={28} height={28} isLike={false} />
        </div>
      </div>
      <div className="mt-6">
        <span>
          <h2 className="text-4xl font-[600] text-stone-800 tracking-wider">
            {title}
          </h2>
        </span>
        <p className="text-sm mt-3 text-stone-600 leading-5 tracking-tight font-[300]">
          {description}
        </p>
      </div>
    </>
  );
};

export default Description;
