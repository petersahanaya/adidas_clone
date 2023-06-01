import Stripe from "stripe";
import { loadStripe, Stripe as StripeType } from "@stripe/stripe-js";

//@ts-expect-error arguments
export const stripe = new Stripe(
  process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY as string
);

export let stripePromise: Promise<StripeType | null>;

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
    );
  }

  return stripePromise;
};
