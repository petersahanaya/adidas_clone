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
      <LottieComp
        animation={successAnimation}
        buttonText="continue"
        title="Successfully buy product's"
        subtitle="thank you for join our website"
      />
    );
  }

  if (cancel) {
    return (
      <LottieComp
        animation={cancelAnimation}
        buttonText="continue"
        title="Canceled product"
        subtitle="product canceled when try to checkout.."
      />
    );
  }

  return <></>;
};

export default Params;
