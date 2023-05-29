"use client";

import Button from "@/components/button/Button";
import LongArrow from "@/components/icons/longArrow/LongArrow";
import Image from "next/image";
import Link from "next/link";

const MiniLaptop = () => {
  return (
    <nav className="hidden md:inline-block h-full w-full">
      <section className="w-full h-full relative">
        <Image
          className="object-cover object-top"
          src="/laptop-preview.webp"
          alt="preview"
          priority
          fill
        />
        <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-stone-800/60 to-transparent z-10"></span>
        <div className="absolute bottom-[50px] left-[20px] xl:left-[50px] z-20">
          <h3 className="text-5xl xl:text-7xl font-[700] text-stone-100">
            Join us
          </h3>
          <div className="w-[45%]">
            <p className="text-stone-100 text-xs font-[400] xl:text-sm">
              from June 1-12 and move for the places we play. It doesn&apos;t
              matter how we move, just that we move
            </p>
          </div>
          <div className="w-[30%] mt-3">
            <Link href="/signIn">
              <Button
                borderColor="border-white"
                color="text-stone-900 bg-white"
                type="button"
              >
                Join
                <LongArrow width={20} height={20} color="#000000" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </nav>
  );
};

export default MiniLaptop;
