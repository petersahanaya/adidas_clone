"use client";

import SearchIcon from "@/components/icons/searchIcon/SearchIcon";
import { useRouter } from "next/navigation";
import { useRef, KeyboardEvent } from "react";

type InputProps = {
  query?: string;
};

const Input = ({ query }: InputProps) => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const onPressedSearchProduct = async () => {
    router.replace(`/search?q=${inputRef.current!.value}`);
    router.refresh();
  };

  const onEnterSearchProduct = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      router.replace(`/search?q=${inputRef.current!.value}`);
      router.refresh();
    }
  };

  return (
    <header className="w-full h-[11vh] px-4 border-t-[1px]  border-t-stone-200 flex justify-around lg:justify-between items-center gap-2">
      <input
        onKeyDown={onEnterSearchProduct}
        ref={inputRef}
        className="p-2 py-3 tracking-tight rounded-sm bg-stone-500 text-white placeholder:text-stone-200 outline-none text-sm w-[80%] lg:w-full sm:w-full"
        placeholder="search for product"
      />
      <button
        onClick={onPressedSearchProduct}
        className="border-[1px] border-stone-400 p-3"
      >
        <SearchIcon width={20} height={20} />
      </button>
    </header>
  );
};

export default Input;
