import ListTile from "@components/listTile/ListTile";
import { PostFormValues, PostStepEnum } from "./Post";
import { Dispatch, SetStateAction } from "react";
import ArrowIcon from "@/components/icons/arrowIcon/ArrowIcon";
import { isEmpty } from "@/lib/functions/IsEmpty";

type StepButtonProps = {
  step: PostStepEnum;
  setStep: Dispatch<SetStateAction<PostStepEnum>>;
  fields: PostFormValues;
};

const StepButton = ({ step, setStep, fields }: StepButtonProps) => {
  return (
    <div className="w-full flex justify-around items-center mt-4">
      <ListTile
        onClick={() => setStep(PostStepEnum.FieldStep)}
        label="prev"
        width="w-max"
        border={`bg-stone-800 p-3 rounded-xl ${
          step === PostStepEnum.FieldStep && "opacity-50"
        }`}
        labelColor="text-stone-100"
      >
        <ArrowIcon color="#f6f6f6" rotate="rotate-180" width={8} height={8} />
      </ListTile>
      <ListTile
        onClick={() => {
          !isEmpty(fields) && setStep(PostStepEnum.ImageStep);
        }}
        label={`${step === PostStepEnum.ImageStep ? "submit" : "next"} `}
        width="w-max"
        border={`bg-stone-800 p-3 rounded-xl ${
          step === PostStepEnum.ImageStep && "opacity-50"
        }`}
        labelColor="text-stone-100"
      >
        <ArrowIcon color="#f6f6f6" width={8} height={8} />
      </ListTile>
    </div>
  );
};

export default StepButton;
