"use client";

import { useCallback, useEffect, useState } from "react";
import ArrowIcon from "../icons/arrowIcon/ArrowIcon";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { HasKeyParam, ParamChange } from "@/lib/functions/paramChange";

type FilterProps = {
  hint: string;
  options: { value: string }[];
  width?: string;
  keyAdded: string;
};

const Filter = ({ hint, options, width = "w-full", keyAdded }: FilterProps) => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [search, setSearch] = useState("");
  const [origin, setOrigin] = useState("");
  const [selected, setSelected] = useState<{ value: string } | null>(null);
  const path = usePathname();
  const router = useRouter();

  const onKeyPressed = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        setActive((prev) => {
          if (prev === options.length - 1) {
            return 0;
          } else {
            return prev + 1;
          }
        });
      }

      if (e.key === "ArrowUp") {
        setActive((prev) => {
          if (prev === 0) {
            return options.length - 1;
          } else {
            return prev - 1;
          }
        });
      }

      if (e.key === "Enter") {
        setSelected(options[active]);
        setOpen(false);

        const queries = ParamChange({
          searchParams: search,
          keyAdded,
          value: options[active].value,
        });

        router.replace(`${origin}/${path}?${queries}`);
      }

      if (e.key === "Escape") {
        setOpen(false);
      }
    },
    [active, origin, keyAdded, options, path, router, search]
  );

  useEffect(() => {
    setSearch(window.location.search);
    setOrigin(window.location.origin);

    const paramValue = HasKeyParam({ searchParams: search, key: keyAdded });

    if (paramValue) {
      setSelected({ value: paramValue });
    }

    if (open) {
      window.addEventListener("keydown", onKeyPressed);

      return () => window.removeEventListener("keydown", onKeyPressed);
    }
  }, [keyAdded, onKeyPressed, open, search]);

  const onPressedChooseValue = (idx: number) => {
    setActive(idx);
    setSelected(options[idx]);
    setOpen(false);

    const queries = ParamChange({
      searchParams: search,
      keyAdded,
      value: options[active].value,
    });

    router.replace(`${origin}/${path}?${queries}`);
  };

  console.log({ selected });

  return (
    <section className={`${width}`}>
      <header
        onClick={() => setOpen((prev) => !prev)}
        className="w-full border-[1px] border-stone-300 flex justify-between items-center p-2"
      >
        <p className="text-xs text-stone-600">
          {selected && selected.value ? selected.value : hint}
        </p>
        <ArrowIcon
          width={13}
          height={13}
          rotate={`${open ? "rotate-90" : ""} transition-[300ms]`}
        />
      </header>

      <section className="mt-2">
        <AnimatePresence initial={false}>
          {open && (
            <motion.nav
              className="w-full overflow-hidden"
              initial={{ height: 0, opacity: 0.6 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: "0", opacity: 0.6 }}
              transition={{ bounce: 0.2, duration: 0.3, ease: "easeOut" }}
            >
              {options.map((option, idx) => (
                <section
                  onClick={() => onPressedChooseValue(idx)}
                  className={`w-full bg-stone-200 p-2 rounded-sm text-sm  ${
                    active === idx
                      ? "bg-stone-900 text-stone-100"
                      : "text-stone-800"
                  }`}
                  key={idx}
                >
                  <p>{option.value}</p>
                </section>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
      </section>
    </section>
  );
};

export default Filter;
