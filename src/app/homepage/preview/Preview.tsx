"use client";

import Heading from "@/components/heading/Heading";
import Subtitle from "@/components/subtitle/Subtitle";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const listOfImage = [
  {
    imageSrc: "https://www.adidas.co.id/media/wysiwyg/TC-let-it-slide.png",
    title: "let it slide",
    subtitle: "perfect for pool or everyone else.",
  },
  {
    imageSrc: "https://www.adidas.co.id/media/wysiwyg/TC-HOC.png",
    title: "home of classic",
    subtitle: "three classics, timeless.",
  },
  {
    imageSrc:
      "https://www.adidas.co.id/media/wysiwyg/football-ss23-heatspawn-dotcom-hp-teaser-carousel-d.jpg",
    title: "miss nothing",
    subtitle: "unleash elite precision.",
  },
  {
    imageSrc: "https://www.adidas.co.id/media/wysiwyg/TC-adicolor.png",
    title: "main character",
    subtitle: "all new adicolor, side optional.",
  },
  {
    imageSrc: "https://www.adidas.co.id/media/wysiwyg/TC-free-hiker2.png",
    title: "discover free hiking",
    subtitle: "long distance hiking just got fun.",
  },
];

const Preview = () => {
  const [selectedIdx, setSelected] = useState(0);

  return (
    <section className="w-screen h-[205px] flex flex-col justify-start items-center">
      <nav className="w-full overflow-y-hidden overflow-x-scroll flex justify-start items-center">
        <div className="w-screen h-[200px] relative">
          <Image
            className=" w-full h-full object-cover"
            fill
            src={listOfImage[selectedIdx].imageSrc}
            alt={listOfImage[selectedIdx].title}
            priority
          />
          <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-stone-800"></span>
          <div className="absolute bottom-[20px] left-[20px]">
            <Heading color="text-stone-100 left-[20px]">
              {listOfImage[selectedIdx].title}
            </Heading>
            <Subtitle color="text-stone-300 left-[20px]">
              {listOfImage[selectedIdx].subtitle}
            </Subtitle>
          </div>
        </div>
      </nav>
      <nav className="flex justify-center items-center gap-3 mt-2">
        {Array(listOfImage.length)
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
    </section>
  );
};

export default Preview;
