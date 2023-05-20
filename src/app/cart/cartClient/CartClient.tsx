"use client";
import AdidasIcon from "@/components/icons/adidasIcon/AdidasIcon";
import Image from "next/image";
import { ConvertNumber } from "@/lib/functions/covertNumber";
import Button from "@/components/button/Button";
import Link from "next/link";
import { BASE_URL } from "@/app/(auth)/signIn/SignInAuth";
import { useCart } from "@/hooks/cart/cart_hooks";
import { Session } from "next-auth";
import LottieComp from "@/components/lottie/LottieComp";
import emptyAnimation from "../../../../public/empty-lottie.json";

type CartClientProps = {
  session: Session;
};

const CartClient = ({ session }: CartClientProps) => {
  const cart = useCart((state) => state.products);

  const increaseOnPressed = useCart((state) => state.incrementProductCount);

  const decreaseOnPressed = useCart((state) => state.decrementProductCount);

  const removeOnPressed = useCart((state) => state.removeFromCart);

  const onDoubleClick = async (productId: string) => {
    try {
      const resp = await fetch(
        `${BASE_URL}/api/cart?userId=${session!.user
          .id!}&productId=${productId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );

      removeOnPressed(productId);

      const data = await resp.json();
    } catch (e: any) {
      console.error(e);
    }
  };
  return (
    <>
      <header className="w-full flex justify-around items-center">
        <Link href="/">
          <AdidasIcon width={40} height={40} />
        </Link>
        <h3 className="text-stone-700 font-[800] text-2xl uppercase tracking-tight">
          cart
        </h3>
      </header>
      {cart.length ? (
        <section className="flex flex-col justify-start items-start gap-8 w-full px-3">
          {cart
            .sort((a, b) => a.price - b.price)
            .map((product, idx) => (
              <section className="w-full p-1 h-[96px]" key={idx}>
                <nav
                  onDoubleClick={() => onDoubleClick(product.id)}
                  className="flex bg-[#EDEBEE] justify-start items-center gap-2"
                >
                  <div className="w-[90px] h-[79px] relative">
                    <Image
                      className="object-cover rounded-md"
                      src={product.previewSrc}
                      fill
                      alt={product.title}
                    />
                  </div>
                  <div className="overflow-hidden">
                    <h4 className="font-[300] text-sm text-ellipsis overflow-hidden whitespace-nowrap">
                      {product.title}
                    </h4>
                    <span className="w-full flex justify-start items-center gap-3">
                      <p className="text-xs text-stone-600">
                        {product.category}
                      </p>
                      |
                      <p className="text-xs font-[500] text-stone-600">
                        {ConvertNumber(product.price)}
                      </p>
                    </span>
                  </div>
                </nav>
                <div className="w-full h-[35px] flex justify-start items-center bg-stone-800 px-3">
                  <p className="flex-1 text-sm text-stone-100">
                    {product.count}
                  </p>
                  <div className="px-3">
                    <span
                      onClick={() => decreaseOnPressed(product.id)}
                      className="px-5 text-lg py-2 bg-white"
                    >
                      {"<"}
                    </span>
                    <span
                      onClick={() => increaseOnPressed(product.id)}
                      className="px-5 text-lg py-2 bg-white ml-3"
                    >
                      {">"}
                    </span>
                  </div>
                </div>
              </section>
            ))}
          <section className="mt-5 px-3">
            <div>
              <h3 className="uppercase text-3xl font-[700] tracking-tight">
                total
              </h3>
              <p className="text-sm font-[300]">
                {ConvertNumber(cart.reduce((a, b) => a + b.price, 0))}
              </p>
            </div>
          </section>

          <section className="px-3 flex-1 w-full ">
            <Button type="button">Buy</Button>
          </section>
        </section>
      ) : (
        <LottieComp
          buttonText="back"
          animation={emptyAnimation}
          title="there no item"
          subtitle="go and add some product."
        />
      )}
    </>
  );
};

export default CartClient;
