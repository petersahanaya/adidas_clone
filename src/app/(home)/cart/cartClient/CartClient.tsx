"use client";
import Header from "@/app/homepage/header/Header";
import Button from "@components/button/Button";
import LongArrow from "@components/icons/longArrow/LongArrow";
import LottieComp from "@components/lottie/LottieComp";
import Sidebar from "@components/sidebar/Sidebar";
import emptyAnimation from "../../../../../public/empty-lottie.json";

import { useCart } from "@/hooks/cart/cart_hooks";
import { ConvertNumber } from "@/lib/functions/covertNumber";
import { Session } from "next-auth";
import Image from "next/image";
import { useCallback, useState } from "react";
import { getStripe } from "@/lib/config/stripe";

type CartClientProps = {
  session: Session;
};

const CartClient = ({ session }: CartClientProps) => {
  const cart = useCart((state) => state.products);
  const [state, setState] = useState({
    loading: false,
    success: false,
    error: "",
  });

  const increaseOnPressed = useCart((state) => state.incrementProductCount);

  const decreaseOnPressed = useCart((state) => state.decrementProductCount);

  const removeOnPressed = useCart((state) => state.removeFromCart);

  const onDoubleClick = async (productId: string) => {
    try {
      const resp = await fetch(
        `https://p3das.vercel.app/api/cart?userId=${session!.user
          .id!}&productId=${productId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );

      removeOnPressed(productId);

      const data = await resp.json();
    } catch (e: any) {}
  };

  const onPressedCheckout: any = useCallback(async () => {
    if (!cart.length) {
      setState((prev) => ({ ...prev, error: "products are required.." }));
    }

    if (cart.length) {
      try {
        const stripe = await getStripe();

        setState((prev) => ({ ...prev, loading: true }));
        const resp = await fetch("https://p3das.vercel.app/api/checkout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ products: cart }),
        });

        if (resp.status === 500) {
          setState((prev) => ({ ...prev, error: "Something went wrong.." }));
        }

        const data = (await resp.json()) as { id: string };

        stripe?.redirectToCheckout({ sessionId: data.id });
      } catch (e: any) {
        setState((prev) => ({
          ...prev,
          error: "Something went wrong..",
        }));
      } finally {
        setState((prev) => ({
          ...prev,
          loading: false,
          success: false,
          error: "",
        }));
      }
    }
  }, [cart]);

  return (
    <main className="w-full pb-8">
      <Header isIcon />
      <Sidebar />
      <header className="p-3 w-full flex justify-start items-center gap-2 border-b-[1px] border-b-stone-200">
        <h3 className="text-3xl font-[700] uppercase">Your Bag</h3>
        <span>-</span>
        {cart.length !== 0 ? (
          <p className="font-[300] text-2xl uppercase tracking-tight">
            {cart.length} item
          </p>
        ) : (
          <p className="font-[300] text-2xl uppercase tracking-tight">empty</p>
        )}
      </header>
      {cart.length ? (
        <section className="flex flex-col justify-start items-start lg:flex-row gap-8 w-full px-3 mt-6">
          <nav className="w-full h-full lg:flex flex-col justify-start items-start gap-3 lg:w-[60%] lg:h-full overflow-y-scroll">
            {cart
              .sort((a, b) => a.price - b.price)
              .map((product, idx) => (
                <section
                  className="w-full h-[200px] xs:h-[230px] overflow-hidden p-1 flex justify-between sm:justify-start items-start gap-3 border-b-[1px] border-b-stone-300 pb-5"
                  key={idx}
                >
                  <div
                    style={{ flex: "0 0 40%" }}
                    className="relative w-[40%] h-full"
                  >
                    <Image
                      className="w-full h-full object-contain"
                      src={product.previewSrc}
                      alt={product.title}
                      fill
                    />
                  </div>
                  <aside className="flex-1">
                    <article className="sm:flex justify-around items-center lg:inline-block">
                      <section className="flex flex-col justify-start items-start gap-2">
                        <h3 className="text-md xs:text-lg text-ellipsis overflow-hidden whitespace-nowrap font-[500] uppercase">
                          {product.title}
                        </h3>
                        <p className="text-xs xs:text-sm font-[300] text-stone-600">
                          Gender : {product.category}
                        </p>
                        <p className="text-xs xs:text-sm font-[300] text-stone-600">
                          Size : {product.size}
                        </p>
                        <p className="text-sm font-[300] sm:hidden text-stone-600 lg:inline-block">
                          {ConvertNumber(product.price)}
                        </p>
                        <p
                          onClick={() => onDoubleClick(product.id)}
                          className="font-[300] cursor-pointer hover:text-stone-900 text-xs xs:text-sm  uppercase tracking-wider underline text-stone-500"
                        >
                          delete
                        </p>
                      </section>

                      <section className="mt-4 sm:mt-8">
                        <div className="flex justify-start items-center gap-3 sm:mb-4">
                          <button
                            onClick={() => decreaseOnPressed(product.id)}
                            disabled={product.count === 1}
                            className="text-sm p-1 px-4 border-stone-400 border-[1px] xs:text-md xs:p-2 xs:px-6"
                          >
                            -
                          </button>
                          <p className="text-sm font-[300] xs:text-md">
                            {product.count}
                          </p>
                          <button
                            onClick={() => increaseOnPressed(product.id)}
                            disabled={product.count === 4}
                            className="text-sm p-1 px-4 border-stone-400 border-[1px] xs:text-md xs:p-2 xs:px-6"
                          >
                            +
                          </button>
                        </div>
                        <span className="hidden sm:inline-block lg:hidden">
                          <p className="text-md font-[300] text-stone-700">
                            {ConvertNumber(product.price)}
                          </p>
                        </span>
                      </section>
                    </article>
                  </aside>
                </section>
              ))}
          </nav>

          <nav className="w-full h-full lg:flex flex-col justify-center items-start lg:bg-stone-200 lg:p-3 lg:pb-5 lg:w-[40%]">
            <section className="w-full mt-5 px-3">
              <header>
                <h3 className="font-[700] text-2xl uppercase">
                  Order Summary :
                </h3>
              </header>
              <article className="px-5 flex flex-col justify-center items-start gap-3 mt-3 lg:bg-white lg:p-2 lg:rounded-sm">
                <section className="w-full font-[300] text-sm uppercase border-b-[1px] border-b-stone-300 pb-2">
                  {cart.length} products
                </section>
                <section className="w-full font-[300] text-sm uppercase border-b-[1px] border-b-stone-300 pb-2 flex justify-between items-center">
                  <p>product total</p>
                  <p>{ConvertNumber(cart.reduce((a, b) => a + b.price, 0))}</p>
                </section>
                <section className="w-full font-[300] text-sm uppercase border-b-[1px] border-b-stone-300 pb-2 flex justify-between items-center">
                  <p>Delivery</p>
                  <p>Free</p>
                </section>
              </article>
            </section>

            <section
              onClick={onPressedCheckout()}
              className="px-3 lg:mt-4 flex-1 w-full"
            >
              <Button
                padding="p-2 px-6"
                textColor="text-white text-md"
                type="button"
              >
                {state.loading ? "Redirecting.." : "Check out"}
                <LongArrow width={26} height={26} />
              </Button>
            </section>
          </nav>
        </section>
      ) : (
        <LottieComp
          buttonText="back"
          animation={emptyAnimation}
          title="there no item"
          subtitle="go and add some product."
        />
      )}
    </main>
  );
};

export default CartClient;

//ConvertNumber(cart.reduce((a, b) => a + b.price, 0))
