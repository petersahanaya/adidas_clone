"use client";

import { ParentVariants } from "@/lib/config/configMotion";
import { ConvertNumber } from "@/lib/functions/covertNumber";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

type CardProps = {
  id: string;
  type: string;
  category: string;
  title: string;
  price: number;
  previewSrc: string;
  width?: string;
  height?: string;
};

const Card = ({
  previewSrc: imageSrc,
  price,
  title,
  type,
  category,
  id,
  width = "w-[120px]",
  height = "h-[180px]",
}: CardProps) => {
  return (
    <section className={`${width} ${height} rounded-md  overflow-hidden`}>
      <Link href={`/product/${id}`}>
        <div className="relative w-full h-[120px] sm:h-[160px] lg:h-[200px] bg-[#EDEBEE]">
          <Image
            className="xs:object-contain"
            src={imageSrc}
            alt="hoodie"
            fill
          />
        </div>
        <section className="px-2">
          <span className="text-[.6rem] text-stone-400 tracking-wider font-[300] lg:text-xs">
            <p>
              {type} | {category}
            </p>
          </span>

          <div className="w-full lg:mt-2">
            <p className="text-ellipsis overflow-hidden whitespace-nowrap text-[.75rem] font-[300] text-stone-700 tracking-wider uppercase lg:text-sm">
              {title}
            </p>
            <p className="text-ellipsis overflow-hidden text-[.7rem] lg:text-xs font-[300] text-stone-700 tracking-wider">
              {ConvertNumber(Number(price))}
            </p>
          </div>
        </section>
      </Link>
    </section>
  );
};

export default Card;
