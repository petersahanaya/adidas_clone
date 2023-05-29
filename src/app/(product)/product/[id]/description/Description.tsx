"use client";

import { BASE_URL } from "@/app/(auth)/signIn/SignInAuth";
import HeartIcon from "@/components/icons/heartIcon/HeartIcon";
import LongArrow from "@/components/icons/longArrow/LongArrow";
import Spinner from "@/components/spinner/Spinner";
import { useCart } from "@/hooks/cart/cart_hooks";
import { ConvertNumber } from "@/lib/functions/covertNumber";
import Button from "@components/button/Button";
import { Product } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useMediaQuery } from "react-responsive";

type DescriptionProps = {
  title: string;
  description: string;
  size: string;
  stock: number;
  userId: string;
  product: Product;
  id: string;
  isFavorite: boolean;
};

const Description = ({
  title,
  description,
  size,
  stock,
  product,
  id,
  userId,
  isFavorite,
}: DescriptionProps) => {
  const cart = useCart((state) => state.products);
  const addToCart = useCart((state) => state.addToCart);
  const router = useRouter();
  const isMiniTablet = useMediaQuery({ minWidth: "640px" });
  const isMiniLaptop = useMediaQuery({ minWidth: "900px" });

  const [state, setState] = useState({
    error: false,
    success: false,
    loading: false,
  });

  const [favoriteState, setFavoriteState] = useState({
    error: false,
    success: false,
    loading: false,
  });

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

      setState((prev) => ({ ...prev, loading: false, success: true }));

      setTimeout(() => {
        setState((prev) => ({ ...prev, success: false }));
      }, 1500);
    } catch (e) {
    } finally {
      setState((prev) => ({ ...prev, loading: false, error: false }));
    }
  }, [addToCart, product, userId]);

  const onPressedFavorite = useCallback(async () => {
    setFavoriteState((prev) => ({ ...prev, loading: true }));
    try {
      const resp = await fetch(
        `${BASE_URL}/api/favorite?productId=${id}&userId=${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // body: JSON.stringify({ productId: id, userId }),
        }
      );

      if (resp.status === 200 || resp.ok) {
        setFavoriteState((prev) => ({
          ...prev,
          loading: false,
          success: true,
        }));

        setTimeout(() => {
          setFavoriteState((prev) => ({
            ...prev,
            loading: false,
            success: false,
          }));
        }, 1500);

        router.refresh();
      }

      const data = await resp.json();
    } catch (e) {
      setFavoriteState((prev) => ({
        ...prev,
        loading: false,
        error: true,
      }));

      setTimeout(() => {
        setFavoriteState((prev) => ({
          ...prev,
          loading: false,
          error: false,
        }));
      }, 1500);
    } finally {
      setFavoriteState((prev) => ({ ...prev, loading: false, error: false }));
    }
  }, [id, router, userId]);

  return (
    <main className=" md:fixed top-[60px] right-0 lg:w-[30%] md:w-[30%] lg:bg-white">
      {!isMiniLaptop && (
        <div>
          <p className="text-xs text-stone-700 sm:text-md">{size}</p>
          <div>
            <p className="text-red-400 sm:text-md text-[.7rem] font-[500] uppercase">
              {stock} stock
            </p>
          </div>
        </div>
      )}
      {isMiniLaptop && (
        <>
          <nav className="px-5 py-3 md:px-4">
            <div className="w-full flex justify-start items-center gap-1">
              <p className="text-sm underline lowercase tracking-tighter text-stone-800 font-[300]">
                {product.category}
              </p>
              <p className="text-[.7rem]">/</p>
              <p className="text-sm underline lowercase tracking-tighter text-stone-800 font-[300]">
                {product.type}
              </p>
            </div>
            <span className="mt-2">
              <h2 className="text-4xl sm:text-5xl font-[400] text-stone-800 tracking-wider">
                {product.title}
              </h2>
            </span>

            <div>
              <p className="sm:text-lg font-[600] lg:text-xs text-stone-900 tracking-widest">
                {ConvertNumber(Number(product.price))}
              </p>
            </div>
          </nav>
        </>
      )}
      <div className="flex justify-around items-end gap-2">
        <div onClick={onPressedAddToCart}>
          <Button
            background="bg-stone-900"
            width="w-[160px] xs:w-[350px] sm:w-[450px] lg:w-[200px] md:w-[200px] md:text-sm flex-1"
            textColor="text-stone-100 sm:text-xl sm:font-[500] lg:text-sm"
            padding="mt-4 p-4"
            type="button"
          >
            {!state.loading ? (
              "Add to bag"
            ) : (
              <Spinner width={23} height={23} color="#ffffff" />
            )}
            <LongArrow
              width={isMiniTablet ? 30 : 20}
              height={isMiniTablet ? 30 : 20}
            />
          </Button>
        </div>
        <button
          disabled={favoriteState.loading}
          onClick={onPressedFavorite}
          className="border-[1px] p-[.55rem] border-stone-400"
        >
          {!favoriteState.loading ? (
            <HeartIcon
              width={isMiniTablet ? 32 : 28}
              height={isMiniTablet ? 32 : 28}
              isLike={isFavorite}
            />
          ) : (
            <Spinner height={28} width={28} />
          )}
        </button>
      </div>
      <div className="mt-6 sm:mb-10 lg:mt-20 md:px-3">
        <span>
          <h2 className="text-4xl font-[600] text-stone-800 tracking-wider">
            {title}
          </h2>
        </span>
        <p className="text-sm mt-3 text-stone-600 leading-5 tracking-tight font-[300]">
          {description}
        </p>
      </div>
    </main>
  );
};

export default Description;
