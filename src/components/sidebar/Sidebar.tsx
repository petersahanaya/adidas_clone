"use client";

import { useSidebar } from "@/hooks/sidebar/sidebar_hook";
import { AnimatePresence, motion } from "framer-motion";
import AdidasIcon from "../icons/adidasIcon/AdidasIcon";
import ListTile from "../listTile/ListTile";
import { useSession } from "next-auth/react";
import SignIcon from "../icons/signIcon/SignIcon";
import AddIcon from "../icons/addIcon/AddIcon";
import { usePostComponent } from "@/hooks/post/post_hooks";
import Options from "./options/Options";
import HeartIcon from "../icons/heartIcon/HeartIcon";
import Link from "next/link";
import { redirect } from "next/navigation";

const listOfCategory = [
  {
    title: "man",
  },
  {
    title: "woman",
  },
  {
    title: "kid",
  },
];

const typeOptions = [
  {
    value: "SHIRT",
  },
  {
    value: "SHOES",
  },
  {
    value: "HAT",
  },
];

const Sidebar = () => {
  const { data } = useSession();
  // const toggleSidebar = useSidebar((state) => state.toggleSideBar);
  const isOpen = useSidebar((state) => state.isOpen);
  const togglePost = usePostComponent((state) => state.togglePostComponent);

  return (
    <>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.aside
            initial={{
              opacity: 0.7,
              translateX: "100%",
              backdropFilter: "blur(5px)",
            }}
            animate={{
              opacity: 1,
              translateX: "0",
              backdropFilter: "blur(0px)",
            }}
            exit={{
              opacity: 0.7,
              translateX: "100%",
              backdropFilter: "blur(5px)",
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-screen md:w-[300px] h-screen overflow-hidden bg-white fixed top-0 right-0 z-20"
          >
            <header className="w-full h-[8vh] flex justify-center items-center border-b-[1px] border-b-stone-300">
              <AdidasIcon width={40} height={40} />
            </header>
            <section className="w-full flex flex-col justify-start items-start pb-4 border-b-[1px] border-b-stone-300">
              {listOfCategory.map((category, idx) => (
                <div key={idx}>
                  <Options
                    keyAdded2="category"
                    value2={category.title}
                    hint={category.title}
                    keyAdded="type"
                    options={typeOptions}
                    path="products"
                    width="w-screen"
                  />
                </div>
              ))}
            </section>
            <nav className="mt-14">
              {data?.user && (
                <>
                  <section className="border-t-[1px] border-t-stone-300 mt-6 cursor-pointer">
                    <Link href="/post">
                      <ListTile
                        padding="px-3 pt-4"
                        border="border-none"
                        onClick={() => {}}
                        label={"post"}
                      >
                        <AddIcon width={18} height={18} />
                      </ListTile>
                    </Link>
                  </section>
                  <section className="border-t-[1px] border-t-stone-300 mt-4 cursor-pointer">
                    <Link href="/favorite">
                      <ListTile
                        padding="px-3 py-4"
                        border="border-none"
                        onClick={() => {}}
                        label="favorite"
                      >
                        <HeartIcon width={18} height={18} isLike={false} />
                      </ListTile>
                    </Link>
                  </section>
                </>
              )}
              <section className="border-t-[1px] border-t-stone-300 border-b-[1px] border-b-stone-300">
                <ListTile
                  padding="px-3 py-4"
                  border="border-none"
                  onClick={() => {}}
                  label={`${data?.user ? "sign out" : "sign in"}`}
                >
                  <SignIcon width={18} height={18} />
                </ListTile>
              </section>
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
