"use client";

import Lottie from "react-lottie";
import errorAnimation from "./../../../public/error-lottie.json";
import { useEffect } from "react";

const lottieOption = {
  loop: true,
  autoplay: true,
  animationData: errorAnimation,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return <ErrorComponent reset={reset} />;
}

export function ErrorComponent({ reset }: { reset: () => void }) {
  return (
    <nav className="bg-stone-900">
      <main className="w-screen h-full pb-8 bg-stone-900 flex flex-col justify-center items-center gap-5">
        <section className="">
          <Lottie
            style={{ width: "100vw", height: "70%" }}
            options={lottieOption}
            height={200}
            width={200}
          />
        </section>
        <h2 className="font-[700] text-stone-100 text-4xl text-center xs:text-5xl">
          Something went wrong!
        </h2>
        <button
          className="bg-stone-100 p-2 text-xs font-[300] rounded-sm w-[70%] xs:text-sm"
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          Try again
        </button>
      </main>
    </nav>
  );
}
