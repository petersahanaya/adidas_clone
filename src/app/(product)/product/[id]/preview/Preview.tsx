"use client";

import { ConvertNumber } from "@/lib/functions/covertNumber";
import { Product } from "@prisma/client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

type PreviewProps = {
  product: Product;
};

const Preview = ({ product }: PreviewProps) => {
  const [selectedIdx, setSelected] = useState(0);

  return (
    <section className="bg-[#EDEBEE] flex flex-col justify-center items-start">
      <nav className="px-5 py-3">
        <div className="w-full flex justify-center items-center gap-1">
          <p className="text-sm underline lowercase tracking-tighter text-stone-800 font-[300]">
            {product.category}
          </p>
          <p className="text-[.7rem]">/</p>
          <p className="text-sm underline lowercase tracking-tighter text-stone-800 font-[300]">
            {product.type}
          </p>
        </div>
        <span className="mt-2">
          <h2 className="text-4xl font-[400] text-stone-800 tracking-wider">
            {product.title}
          </h2>
        </span>

        <div>
          <p className="font-[600] text-stone-900 tracking-widest">
            {ConvertNumber(Number(product.price))}
          </p>
        </div>
      </nav>

      <div className="w-full h-[300px] relative">
        <nav className="flex justify-center items-center gap-3 mt-3 absolute bottom-[20px] left-[10px] z-10">
          {Array(product.previewImages.length)
            .fill(1)
            .map((_, idx) => (
              <motion.div
                animate={{
                  scale: selectedIdx === idx ? 1.8 : 1,
                  opacity: selectedIdx === idx ? 1 : 0.6,
                }}
                onClick={() => setSelected(idx)}
                key={idx}
                className={`w-3 h-[.10rem] rounded-sm bg-stone-800 ${
                  selectedIdx === idx ? "" : "bg-stone-600"
                }`}
              ></motion.div>
            ))}
        </nav>
        <Image
          className="object-contain"
          src={product.previewImages[selectedIdx]}
          alt={product.title}
          priority
          fill
        />
      </div>
    </section>
  );
};

export default Preview;
