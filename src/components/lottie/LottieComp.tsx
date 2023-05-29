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
};

// loop: true,
//     autoplay: true,
//     animationData: animation,
//     rendererSettings: {
//       preserveAspectRatio: "xMidYMid slice",
//     },

const LottieComp = ({
  animation,
  subtitle,
  title,
  buttonText,
  subtitleStyle,
  titleStyle,
  isButton = true,
  isDescription = true,
}: LottieProps) => {
  const isMiniTablet = useMediaQuery({ minWidth: "640px" });
  const isMiniLaptop = useMediaQuery({ minWidth: "900px" });

  const lottieOption = {
    loop: true,
    autoplay: true,
    animationData: animation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <main className="w-full h-full flex mt-4 flex-col justify-center items-center gap-5">
      <section>
        <Lottie
          style={{ width: "100%", height: "20%" }}
          options={lottieOption}
          height={100}
          width={100}
        />
      </section>
      {isDescription && (
        <>
          <section>
            <h2
              className={`font-[700] text-stone-900 text-4xl text-center ${titleStyle}`}
            >
              {title}
            </h2>
            <p
              className={`font-[300] text-stone-500 text-sm text-center ${subtitleStyle}`}
            >
              {subtitle}
            </p>
          </section>
          {isButton && (
            <Link
              href="/"
              className="bg-stone-300 text-center p-2 text-xs font-[300] rounded-sm w-[70%]"
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
