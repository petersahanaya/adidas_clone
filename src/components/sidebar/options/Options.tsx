"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { HasKeyParam, ParamChange } from "@/lib/functions/paramChange";
import ArrowIcon from "@/components/icons/arrowIcon/ArrowIcon";
import { useSidebar } from "@/hooks/sidebar/sidebar_hook";

type FilterProps = {
  hint: string;
  options: { value: string }[];
  width?: string;
  keyAdded: string;
  path: string;
  keyAdded2: string;
  value2: string;
};

const Options = ({
  hint,
  options,
  width = "w-full",
  keyAdded,
  keyAdded2,
  value2,
  path,
}: FilterProps) => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [search, setSearch] = useState("");
  const [origin, setOrigin] = useState("");
  const [selected, setSelected] = useState<{ value: string } | null>(null);
  const toggleSidebar = useSidebar((state) => state.toggleSideBar);
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

        const queries2 = ParamChange({
          searchParams: search,
          keyAdded: keyAdded2,
          value: value2,
        });

        router.replace(`${origin}/${path}?${queries}&${queries2}`);
        toggleSidebar();
      }

      if (e.key === "Escape") {
        setOpen(false);
      }
    },
    [
      options,
      active,
      search,
      keyAdded,
      keyAdded2,
      value2,
      router,
      origin,
      path,
      toggleSidebar,
    ]
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

    const queries2 = ParamChange({
      searchParams: search,
      keyAdded: keyAdded2,
      value: value2,
    });

    router.replace(`${origin}/${path}?${queries}&${queries2}`);
    toggleSidebar();
  };

  return (
    <section className={`${width}`}>
      <header
        onClick={() => setOpen((prev) => !prev)}
        className="w-full flex justify-between items-center p-2 px-4"
      >
        <p className="text-xl uppercase font-[700] text-stone-600">{hint}</p>
        <ArrowIcon
          width={10}
          height={10}
          rotate={`${open ? "rotate-90" : ""} transition-[300ms]`}
        />
      </header>

      <section>
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
                  className={`w-full px-4 bg-stone-200 p-2 rounded-sm text-sm  ${
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

export default Options;
