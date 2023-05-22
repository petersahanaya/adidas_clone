import HeaderLoading from "@/components/loading/header/HeaderLoading";

const LoadingWithId = () => {
  return (
    <main className="w-screen h-screen">
      <HeaderLoading />
      <section className="w-full">
        <nav className="px-5">
          <div
            style={{ animationDelay: "100ms" }}
            className="w-[170px] h-[40px] rounded-sm bg-stone-700 animate-pulse"
          ></div>
          <div
            style={{ animationDelay: "120ms" }}
            className="w-[100px] mt-2 h-[30px] rounded-sm bg-stone-700 animate-pulse"
          ></div>
        </nav>
        <section
          style={{ animationDelay: "130ms" }}
          className="w-full h-[280px] bg-stone-700 animate-pulse mt-4"
        ></section>
        <section className="mt-4 flex justify-around items-center">
          <div
            style={{ animationDelay: "140ms" }}
            className="w-[140px] h-[34px] bg-stone-700 animate-pulse rounded-sm"
          ></div>
          <div
            style={{ animationDelay: "150ms" }}
            className="w-[40px] h-[34px] bg-stone-700 animate-pulse rounded-sm"
          ></div>
        </section>
      </section>
    </main>
  );
};

export default LoadingWithId;
