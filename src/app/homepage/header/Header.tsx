"use client";

import { useSidebar } from "@/hooks/sidebar/sidebar_hook";
import { RiShoppingBag2Line } from "react-icons/ri";
import { BiSearch } from "react-icons/bi";
import Image from "next/image";
import AdidasIcon from "@/components/icons/adidasIcon/AdidasIcon";
import Link from "next/link";
import { useCart } from "@/hooks/cart/cart_hooks";

type HeaderProps = {
  profile?: string;
  isIcon?: boolean;
};

const Header = ({
  profile = "https://avatars.githubusercontent.com/u/114085979?v=4",
  isIcon = false,
}: HeaderProps) => {
  const isOpen = useSidebar((state) => state.isOpen);
  const cart = useCart((state) => state.products);
  const onSideBarPressed = useSidebar((state) => state.toggleSideBar);

  return (
    <>
      <header className="w-screen h-[8vh] p-2 flex justify-between items-center">
        {/* Actions */}
        <section className="flex justify-around items-center gap-4">
          {!isIcon ? (
            <Image
              src={profile}
              alt="profile"
              width={40}
              height={40}
              className="rounded-full "
            />
          ) : (
            <Link href="/">
              <AdidasIcon width={28} height={28} />
            </Link>
          )}
          <Link href="/cart" className="relative">
            <RiShoppingBag2Line size={25} />
            {cart.length ? (
              <span className="absolute top-[-3px] right-[-5px] flex justify-center items-center p-2 bg-red-600 text-stone-100 text-[.6rem] font-[300] rounded-full w-[4px] h-[4px]">
                {cart.length}
              </span>
            ) : null}
          </Link>
          <Link href={`/search?q=`}>
            <BiSearch size={25} />
          </Link>
        </section>
        <div
          onClick={onSideBarPressed}
          className=" w-[30px] h-[22px] z-30 mr-5 flex flex-col justify-around items-start"
        >
          <span
            className={`w-[40%] h-[2.7px] rounded-full bg-stone-800 transition-[300ms] ${
              isOpen ? "w-[95%] rotate-45 translate-y-[9px]" : ""
            }`}
          ></span>
          <span
            className={`w-[70%] h-[2.7px] rounded-full bg-stone-800 ${
              isOpen ? "scale-0" : ""
            } transition-[300ms]`}
          ></span>
          <span
            className={`w-full h-[2.7px] rounded-full bg-stone-800 transition-[300ms] ${
              isOpen ? "w-[80%] rotate-[-45deg] translate-y-[-5px]" : ""
            }`}
          ></span>
        </div>
      </header>
    </>
  );
};

export default Header;
