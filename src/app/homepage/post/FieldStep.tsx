"use client";

import TextField from "@components/textField/TextField";
import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { PostFormValues } from "./Post";
import Select from "../select/Select";

type FieldStepProps = {
  errors: FieldErrors<PostFormValues>;
  register: UseFormRegister<PostFormValues>;
  stockOptions: { label: string; value: string }[];
  typeOptions: { label: string; value: string }[];
  categoryOptions: { label: string; value: string }[];
  setFormValue: UseFormSetValue<PostFormValues>;
};

const FieldStep = ({
  errors,
  register,
  typeOptions,
  categoryOptions,
  stockOptions,
  setFormValue,
}: FieldStepProps) => {
  return (
    <section className="w-full h-max flex flex-col justify-center items-center gap-3 m-auto">
      <TextField
        hint="Rainbow Adidas color"
        label="title"
        errors={errors.title?.message}
        register={register}
        type="text"
      />
      <TextField
        hint="A one-piece sugar cane "
        label="description"
        errors={errors.description?.message}
        register={register}
        type="text"
      />
      <TextField
        hint="189"
        label="price"
        errors={errors.description?.message}
        register={register}
        type="number"
      />
      <TextField
        hint="300"
        label="stock"
        errors={errors.description?.message}
        register={register}
        type="number"
      />
      <Select
        setFormValue={setFormValue}
        listOfOption={categoryOptions}
        label="category"
        placeholder="select an category"
      />
      <Select
        setFormValue={setFormValue}
        listOfOption={stockOptions}
        label="size"
        placeholder="select an size"
      />
      <Select
        setFormValue={setFormValue}
        listOfOption={typeOptions}
        label="type"
        placeholder="select an type"
      />
    </section>
  );
};

export default FieldStep;
