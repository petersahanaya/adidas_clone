"use client";

import Link from "next/link";
import Lottie, { LottieProps as lottie } from "react-lottie";
import { useMediaQuery } from "react-responsive";

type LottieProps = {
  animation: any;
  title: string;
  subtitle: string;
  buttonText: string;
  titleStyle?: string;
  subtitleStyle?: string;
  isButton?: boolean;
  isDescription?: boolean;
  width?: string;
  height?: string;
};

export const parentVariants = {
  hidden: {
    opacity: 0,
    x: -100,
  },
  visible: {
    opacity: 1,
    x: 100,
  },
};

const LottieComp = ({
  animation,
  subtitle,
  title,
  buttonText,
  subtitleStyle,
  titleStyle,
  isButton = true,
  isDescription = true,
  width = "w-[40%]",
  height = "h-[80%]",
}: LottieProps) => {
  const isMiniTablet = useMediaQuery({ minWidth: "640px" });
  const isMiniLaptop = useMediaQuery({ minWidth: "900px" });

  const lottieOption: lottie["options"] = {
    loop: true,
    autoplay: true,
    animationData: animation,
    rendererSettings: {
      progressiveLoad: true,
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const lot: lottie = {
    height: "40%",
    options: lottieOption,
  };

  return (
    <main className="sm:h-[35%] xs:h-[30%] md:h-[50%] sm2:h-[55%] lg:h-[60%] m-auto xs:mt-36 sm:mt-36 flex mt-4 flex-col justify-center items-center gap-5">
      <section className={`${width} ${height}`}>
        <Lottie
          style={{ width: "100%", height: "100%" }}
          options={lottieOption}
        />
      </section>
      {isDescription && (
        <>
          <section>
            <h2
              className={`font-[700] text-stone-900 text-4xl text-center lg:text-6xl ${titleStyle}`}
            >
              {title}
            </h2>
            <p
              className={`font-[300] text-stone-500 text-sm text-center lg:text-4xl ${subtitleStyle}`}
            >
              {subtitle}
            </p>
          </section>
          {isButton && (
            <Link
              href="/"
              className="bg-stone-300 text-center p-2 text-xs font-[300] lg:text-sm rounded-sm w-[70%]"
            >
              {buttonText}
            </Link>
          )}
        </>
      )}
    </main>
  );
};

export default LottieComp;
