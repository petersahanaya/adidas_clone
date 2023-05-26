import { ConvertNumber } from "@/lib/functions/covertNumber";
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
};

const Card = ({
  previewSrc: imageSrc,
  price,
  title,
  type,
  category,
  id,
  width = "w-[120px]",
}: CardProps) => {
  return (
    <section className={`${width} h-[180px] rounded-sm overflow-hidden`}>
      <Link href={`/product/${id}`}>
        <div className="relative w-full h-[120px] bg-[#EDEBEE]">
          <Image
            className="xs:object-contain"
            src={imageSrc}
            alt="hoodie"
            fill
          />
        </div>
        <section className="px-2">
          <span className="text-[.6rem] text-stone-400 tracking-wider font-[300] ">
            <p>
              {type} | {category}
            </p>
          </span>

          <div className="w-full">
            <p className="text-ellipsis overflow-hidden whitespace-nowrap text-[.75rem] font-[300] text-stone-700 tracking-wider uppercase">
              {title}
            </p>
            <p className="text-ellipsis overflow-hidden text-[.7rem] font-[300] text-stone-700 tracking-wider">
              {ConvertNumber(Number(price))}
            </p>
          </div>
        </section>
      </Link>
    </section>
  );
};

export default Card;
