"use client";

import LottieComp from "@components/lottie/LottieComp";
import { useSearchParams } from "next/navigation";
import successAnimation from "../../../../public/success-lottie.json";
import cancelAnimation from "../../../../public/cancel-lottie.json";

const Params = () => {
  const params = useSearchParams();

  const success = params.get("success");
  const cancel = params.get("cancel");

  if (success) {
    return (
      <main className="fixed top-0 left-0 z-50 w-screen h-screen bg-white">
        <LottieComp
          animation={successAnimation}
          buttonText="continue"
          title="Successfully buy product's"
          subtitle="thank you for join our website"
        />
      </main>
    );
  }

  if (cancel) {
    return (
      <main className="fixed top-0 left-0 z-50 w-screen h-screen bg-white">
        <LottieComp
          animation={cancelAnimation}
          buttonText="continue"
          title="Canceled product"
          subtitle="product canceled when try to checkout.."
        />
      </main>
    );
  }

  return <></>;
};

export default Params;
