"use client";

import CardLoading from "@/components/loading/card/CardLoading";
import HeaderLoading from "@/components/loading/header/HeaderLoading";

const HomeLoading = () => {
  return (
    <main className="w-screen h-screen pb-14">
      <HeaderLoading />
      <nav className="w-full">
        <section className="w-full h-[220px] md:h-[250px] lg:h-[350px] bg-stone-700 animate-pulse mt-4"></section>
        <section className="mt-4">
          <div className=" px-4 w-[170px] h-[40px] rounded-sm bg-stone-700 animate-pulse"></div>
          <nav className="flex mt-3 justify-start items-center overflow-x-scroll gap-3">
            {Array(15)
              .fill(1)
              .map((_, idx) => (
                <div key={idx}>
                  <CardLoading />
                </div>
              ))}
          </nav>
          <nav className="flex flex-col justify-center items-center gap-3 md:flex-row">
            {Array(3)
              .fill(1)
              .map((_, idx) => (
                <div
                  className="w-full h-[130px] rounded-sm bg-stone-700 animate-pulse"
                  key={idx}
                ></div>
              ))}
          </nav>
        </section>
      </nav>
    </main>
  );
};

export default HomeLoading;
