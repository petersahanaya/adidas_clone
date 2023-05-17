"use client";

import FacebookIcon from "@icons/facebookIcon/FacebookIcon";
import GithubIcon from "@icons/githubIcon/GithubIcon";
import GoogleIcon from "@icons/googleIcon/GoogleIcon";
import ListTile from "@components/listTile/ListTile";
import Spinner from "@components/spinner/Spinner";
import Subtitle from "@components/subtitle/Subtitle";
import { signIn } from "next-auth/react";
import { useCallback, useTransition } from "react";

export const BASE_URL = "http://localhost:3000";

const SignInAuth = () => {
  const [loading, startTransition] = useTransition()

  const SignIn = useCallback(async (type: "google" | "facebook" | "github") => {
    startTransition(() => {
      signIn(type, { callbackUrl: BASE_URL + "/" });
    })
  }, []);

  return (
    <main className="mt-10">
      <ListTile
        padding="p-2 lg:mt-6"
        border="border-[1px] border-stone-300 rounded-sm"
        labelSize="text-[.7rem] capitalize sm:text-[1rem]"
        label="google"
        labelColor="font-[400] text-stone-600"
        onClick={() => SignIn("google")}
      >
        {loading ? (
          <Spinner width={20} height={20} />
        ) : (
          <GoogleIcon width={30} height={30} />
        )}
      </ListTile>
      <ListTile
        padding="p-2 mt-2 lg:mt-6"
        border="border-[1px] border-stone-300 rounded-sm"
        labelSize="text-[.7rem] capitalize sm:text-[1rem]"
        label="facebook"
        labelColor="font-[400] text-stone-600"
        onClick={() => SignIn("facebook")}
      >
        {loading ? (
          <Spinner width={20} height={20} />
        ) : (
          <FacebookIcon width={30} height={30} />
        )}
      </ListTile>
      <ListTile
        padding="p-2 mt-2 lg:mt-6"
        border="border-[1px] border-stone-300 rounded-sm"
        labelSize="text-[.7rem] capitalize sm:text-[1rem]"
        label="github"
        labelColor="font-[400] text-stone-600"
        onClick={() => SignIn("github")}
      >
        {loading ? (
          <Spinner width={20} height={20} />
        ) : (
          <GithubIcon width={30} height={30} />
        )}
      </ListTile>
      <Subtitle color="text-stone-500 mt-4 sm:text-lg">
        By signing you&apos;re agree to our{" "}
        <span className="text-blue-500 underline">User Agreement</span> and{" "}
        <span className="text-blue-500 underline">Privacy Policy</span>.
      </Subtitle>
    </main>
  );
};

export default SignInAuth;
