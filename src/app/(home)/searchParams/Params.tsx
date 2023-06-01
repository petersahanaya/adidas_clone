"use client";

import LottieComp from "@components/lottie/LottieComp";
import { useSearchParams } from "next/navigation";
import successAnimation from "../../../../public/success-lottie.json";
import cancelAnimation from "../../../../public/cancel-lottie.json";

const Params = () => {
  const params = useSearchParams();

  const success = params.get("success");

  if (success) {
    return (
      <LottieComp
        animation={successAnimation}
        buttonText="continue"
        title="Successfully buy product's"
        subtitle="thank you for join our website"
      />
    );
  }

  return (
    <LottieComp
      animation={cancelAnimation}
      buttonText="continue"
      title="Canceled product"
      subtitle="product canceled when try to checkout.."
    />
  );
};

export default Params;
