"use client";

import { useSidebar } from "@/hooks/sidebar/sidebar_hook";
import { AnimatePresence, motion } from "framer-motion";
import AdidasIcon from "../icons/adidasIcon/AdidasIcon";
import Heading from "../heading/Heading";
import ArrowIcon from "../icons/arrowIcon/ArrowIcon";
import ListTile from "../listTile/ListTile";
import { useSession } from "next-auth/react";
import SignIcon from "../icons/signIcon/SignIcon";
import AddIcon from "../icons/addIcon/AddIcon";
import { usePostComponent } from "@/hooks/post/post_hooks";
import { useAuthSession } from "@/hooks/session/session_hooks";
import { useEffect } from "react";

const listOfCategory = [
  {
    title: "man",
  },
  {
    title: "woman",
  },
  {
    title: "kids",
  },
];

const Sidebar = () => {
  const { data } = useSession();
  const createSession = useAuthSession((state) => state.createSession);
  const toggleSidebar = useSidebar((state) => state.toggleSideBar);
  const isOpen = useSidebar((state) => state.isOpen);
  const togglePost = usePostComponent((state) => state.togglePostComponent);

  useEffect(() => {
    createSession(data!);
  }, [createSession, data]);

  return (
    <>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.aside
            initial={{
              opacity: 0.7,
              translateX: "-100%",
              backdropFilter: "blur(5px)",
            }}
            animate={{
              opacity: 1,
              translateX: "0",
              backdropFilter: "blur(0px)",
            }}
            exit={{
              opacity: 0.7,
              translateX: "-100%",
              backdropFilter: "blur(5px)",
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-screen h-screen bg-white fixed top-0 right-0 z-20"
          >
            <header className="w-screen h-[8vh] flex justify-center items-center border-[1px] border-stone-300">
              <AdidasIcon width={40} height={40} />
            </header>
            <section className="w-full flex flex-col gap-3 justify-start items-start">
              {listOfCategory.map((category, idx) => (
                <div
                  key={idx}
                  className="w-full flex justify-between px-4 items-center "
                >
                  <Heading
                    size="text-xl"
                    weight="font-[500]"
                    color="text-stone-800"
                  >
                    {category.title}
                  </Heading>
                  <ArrowIcon width={10} height={10} />
                </div>
              ))}
            </section>
            {data?.user && (
              <section className="border-t-[1px] border-t-stone-300 mt-4">
                <ListTile
                  padding="px-3 pt-4"
                  border="border-none"
                  onClick={() => {
                    togglePost(true);
                    // toggleSidebar();
                  }}
                  label={"post"}
                >
                  <AddIcon width={18} height={18} />
                </ListTile>
              </section>
            )}
            <section className="border-t-[1px] border-t-stone-300 mt-4">
              <ListTile
                padding="px-3 py-4"
                border="border-none"
                onClick={() => {}}
                label={`${data?.user ? "sign out" : "sign in"}`}
              >
                <SignIcon width={18} height={18} />
              </ListTile>
            </section>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
