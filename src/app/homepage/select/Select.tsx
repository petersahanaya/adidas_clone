"use client";

import ArrowIcon from "@/components/icons/arrowIcon/ArrowIcon";
import { AnimatePresence, motion } from "framer-motion";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { UseFormSetValue } from "react-hook-form";
import { PostFormValues, PostKeyEnum } from "../post/Post";

export type OptionEnum = "XL" | "XXL" | "M" | "L";

export type Option = {
  label: string;
  value: string;
};

type OptionNew = {
  label: OptionEnum;
  value: OptionEnum;
};

type SelectProps = {
  placeholder: string;
  listOfOption: Option[];
  label: PostKeyEnum;
  setFormValue: UseFormSetValue<PostFormValues>;
};

const Select = ({
  listOfOption,
  placeholder,
  label,
  setFormValue,
}: SelectProps) => {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelected] = useState<Option | null>(null);

  const [active, setIsActive] = useState(0);

  const handleArrow = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        setIsActive((prev) => {
          if (prev === listOfOption.length - 1) {
            return 0;
          } else {
            return prev + 1;
          }
        });
      } else if (e.key === "ArrowUp") {
        setIsActive((prev) => {
          if (prev === 0) {
            return listOfOption.length - 1;
          } else {
            return prev - 1;
          }
        });
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    },
    [listOfOption.length]
  );

  useEffect(() => {
    if (open) {
      window.addEventListener("keydown", handleArrow);

      return () => {
        window.removeEventListener("keydown", handleArrow);
      };
    }
  }, [open, handleArrow]);

  const onSelectedValuePressed = useCallback(
    (idx: number) => {
      setIsActive(idx);
      setSelected(listOfOption[idx]);
      setFormValue(label, listOfOption[idx] as OptionNew);
      setOpen(false);
    },
    [label, listOfOption, setFormValue]
  );

  const handleMouseIn = useCallback((idx: number) => {
    setIsActive(idx);
  }, []);

  return (
    <main className="w-full flex flex-col justify-center items-center gap-3 mt-2">
      <section
        onClick={() => setOpen((prev) => !prev)}
        className="w-full p-2 rounded-md bg-stone-300 flex justify-between items-center shadow-sm"
      >
        <p className="text-sm text-stone-500">
          {selectedValue ? selectedValue.value : placeholder}
        </p>
        <ArrowIcon
          width={13}
          height={13}
          color="#333333"
          rotate={`${open ? "rotate-90" : ""} transition-[300ms]`}
        />
      </section>

      <AnimatePresence initial={false}>
        {open && (
          <motion.nav
            initial={{ opacity: 0.6, height: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ opacity: 0, height: 0 }}
            className="w-full rounded-md bg-stone-200 overflow-hidden"
          >
            <section className="p-2">
              {listOfOption.map((option, idx) => (
                <div
                  onClick={() => onSelectedValuePressed(idx)}
                  onMouseEnter={() => handleMouseIn(idx)}
                  className={`flex justify-start items-center mt-2 ${
                    active === idx
                      ? "bg-stone-800 text-stone-100 p-2 rounded-sm"
                      : "text-stone-800 font"
                  }`}
                  key={idx}
                >
                  <p className="text-sm -[500]">{option.value}</p>
                </div>
              ))}
            </section>
          </motion.nav>
        )}
      </AnimatePresence>
    </main>
  );
};

export default Select;
