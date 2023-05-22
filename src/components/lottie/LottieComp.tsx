"use client";

import Link from "next/link";
import Lottie from "react-lottie";

type LottieProps = {
  animation: any;
  title: string;
  subtitle: string;
  buttonText: string;
  titleStyle?: string;
  subtitleStyle?: string;
  isButton?: boolean;
};

const LottieComp = ({
  animation,
  subtitle,
  title,
  buttonText,
  subtitleStyle,
  titleStyle,
  isButton = true,
}: LottieProps) => {
  const lottieOption = {
    loop: true,
    autoplay: true,
    animationData: animation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <main className="flex mt-4 flex-col justify-center items-center gap-5">
      <section>
        <Lottie
          style={{ width: "100vw" }}
          options={lottieOption}
          height={200}
          width={200}
        />
      </section>
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
    </main>
  );
};

export default LottieComp;
