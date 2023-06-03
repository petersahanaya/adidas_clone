"use client";

import Lottie from "react-lottie";
import errorAnimation from "./../../../public/error-lottie.json";
import { useEffect } from "react";
import LottieComp from "@/components/lottie/LottieComp";

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
    <nav className="bg-stone-900 w-screen h-screen">
      <LottieComp
        animation={errorAnimation}
        buttonText="try again"
        title="Server Error"
        subtitle="something went wrong"
      />
    </nav>
  );
}
