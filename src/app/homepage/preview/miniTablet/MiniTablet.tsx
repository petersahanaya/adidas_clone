/* eslint-disable @next/next/no-img-element */
"use client";

import Heading from "@/components/heading/Heading";
import Subtitle from "@/components/subtitle/Subtitle";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction } from "react";

type MiniTabletProps = {
  selectedIndex: number;
  setSelected: Dispatch<SetStateAction<number>>;
  listOfImage: { title: string; subtitle: string; imageSrc: string }[];
};
//lg:h-[355px]
const MiniTablet = ({
  selectedIndex,
  listOfImage,
  setSelected,
}: MiniTabletProps) => {
  return (
    <nav className="w-screen h-[305px] lg:h-[355px] hidden md:hidden sm:flex overflow-x-hidden">
      {listOfImage.map((preview, idx) => (
        <motion.section
          onMouseEnter={() => setSelected(idx)}
          key={idx}
          style={{
            width: selectedIndex === idx ? "80%" : "20%",
            transition: "width 0.3s",
            overflow: "hidden",
          }}
          layoutId="something"
          className="h-full relative"
          transition={{ duration: 0.7, ease: "easeOut", type: "tween" }}
        >
          <motion.img
            transition={{ duration: 0.4, ease: "easeOut", type: "tween" }}
            className="w-full h-full object-cover"
            src={preview.imageSrc}
            alt={preview.title}
          />
          <span className="absolute  top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-stone-800"></span>
          {selectedIndex === idx ? (
            <div className="absolute bottom-[20px] left-[20px]">
              <Heading
                color="text-stone-100 whitespace-nowrap left-[20px]"
                size="text-2xl lg:text-4xl"
              >
                {preview.title}
              </Heading>
              <Subtitle color="text-stone-300 left-[20px]" size="text-sm ">
                {preview.subtitle}
              </Subtitle>
            </div>
          ) : null}
        </motion.section>
      ))}
    </nav>
  );
};

export default MiniTablet;
