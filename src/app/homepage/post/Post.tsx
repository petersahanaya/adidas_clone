"use client";
import AdidasIcon from "@components/icons/adidasIcon/AdidasIcon";
import CloseIcon from "@components/icons/closeIcon/CloseIcon";
import Form from "@components/form/Form";
import { usePostComponent } from "@hooks/post/post_hooks";
import FieldStep from "./FieldStep";
import ImageField from "./ImageField";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { z } from "zod";
import { useForm } from "react-hook-form";
import StepButton from "./StepButton";
import Toast from "@/components/toast/Toast";
import { isEmpty } from "@/lib/functions/IsEmpty";
import { redirect } from "next/navigation";
import Link from "next/link";

export enum PostStepEnum {
  FieldStep = "FIELD_STEP",
  ImageStep = "IMAGE_STEP",
}

const PostFormSchema = z.object({
  title: z.string(),
  description: z.string(),
  price: z.string(),
  stock: z.string(),
  size: z.object({
    value: z.enum(["XL", "XXL", "M", "L", "UNKNOWN"]),
    label: z.enum(["XL", "XXL", "M", "L", "UNKNOWN"]),
  }),
  type: z.object({
    value: z.enum(["SHIRT", "SHOES", "HAT", "UNKNOWN"]),
    label: z.enum(["SHIRT", "SHOES", "HAT", "UNKNOWN"]),
  }),
  category: z.object({
    value: z.enum(["MAN", "WOMAN", "KID", "UNKNOWN"]),
    label: z.enum(["MAN", "WOMAN", "KID", "UNKNOWN"]),
  }),
});

export type PostFormValues = z.infer<typeof PostFormSchema>;

export type PostKeyEnum = keyof PostFormValues;

const stockOptions = [
  {
    value: "XL",
    label: "XL",
  },
  {
    value: "XXL",
    label: "XXL",
  },
  {
    value: "L",
    label: "L",
  },
  {
    value: "M",
    label: "M",
  },
];

const typeOptions = [
  {
    value: "SHIRT",
    label: "SHIRT",
  },
  {
    value: "SHOES",
    label: "SHOES",
  },
  {
    value: "HAT",
    label: "HAT",
  },
];

const categoryOptions = [
  {
    value: "MAN",
    label: "MAN",
  },
  {
    value: "WOMAN",
    label: "WOMAN",
  },
  {
    value: "KID",
    label: "KID",
  },
];

const Post = () => {
  // const postComponent = usePostComponent();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<PostFormValues>({
    defaultValues: {
      title: "",
      description: "",
      price: "",
      stock: "",
      type: { label: "UNKNOWN", value: "UNKNOWN" },
      size: { label: "UNKNOWN", value: "UNKNOWN" },
      category: { label: "UNKNOWN", value: "UNKNOWN" },
    },
    resolver: zodResolver(PostFormSchema),
    mode: "onBlur",
  });

  const [step, setStep] = useState<PostStepEnum>(PostStepEnum.FieldStep);

  const onSave = () => {};

  return (
    <>
      <motion.main
        initial={{ opacity: 0.6, translateX: "100%" }}
        animate={{ opacity: 1, translateX: "0" }}
        exit={{ opacity: 0.6, translateX: "100%" }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="w-screen fixed top-0 left-0 z-40 h-screen overflow-x-hidden bg-white"
      >
        <header className="flex justify-between items-center p-2 px-4 border-b-[1px] border-b-stone-300">
          <AdidasIcon width={45} height={45} />
          <Link href="/">
            <CloseIcon width={25} height={25} />
          </Link>
        </header>

        <Form
          onSubmit={handleSubmit(onSave)}
          style="w-[80%] lg:w-[60%] flex flex-col justify-center m-auto items-center mt-6"
        >
          {step === PostStepEnum.FieldStep && (
            <FieldStep
              categoryOptions={categoryOptions}
              typeOptions={typeOptions}
              setFormValue={setValue}
              errors={errors}
              register={register}
              stockOptions={stockOptions}
            />
          )}

          {step === PostStepEnum.ImageStep && (
            <ImageField
              handleSubmit={handleSubmit}
              reset={reset}
              setStep={setStep}
            />
          )}

          {isEmpty(watch()) && <Toast message="all field are required" />}

          {step === PostStepEnum.FieldStep && (
            <StepButton setStep={setStep} step={step} fields={watch()} />
          )}
        </Form>
      </motion.main>
    </>
  );
};

export default Post;
