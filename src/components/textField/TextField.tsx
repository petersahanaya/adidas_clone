"use client";

import { UseFormRegister } from "react-hook-form";
import Subtitle from "../subtitle/Subtitle";
import { PostFormValues } from "@/app/homepage/post/Post";

type TextFieldProps = {
  errors: string | undefined;
  label: any;
  hint: string;
  type: "email" | "text" | "password" | "number";
  register: UseFormRegister<PostFormValues>;
};

const TextField = ({ errors, hint, type, register, label }: TextFieldProps) => {
  return (
    <div className="w-full flex flex-col justify-start items-start gap-1">
      <Subtitle color="text-stone-500">{label}</Subtitle>
      <input
        className={`border-[1px] placeholder:text-stone-400 z-10 outline-stone-800 rounded-sm p-3 text-[.8rem] w-full ${
          errors ? "border-red-600" : "border-stone-700"
        } `}
        type={type}
        placeholder={hint}
        {...register(label)}
        required
      />
    </div>
  );
};

export default TextField;
