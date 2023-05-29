import HeaderLoading from "@/components/loading/header/HeaderLoading";

const LoadingWithId = () => {
  return (
    <nav className="w-screen h-screen flex flex-col justify-start items-start md:flex-row">
      <main className="w-full h-full md:w-[70%]">
        <HeaderLoading />
        <section className="w-full">
          <nav className="px-5 md:hidden">
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
            className="w-full h-[280px] md:h-[350px] lg:h-[550px] bg-stone-700 animate-pulse mt-4"
          ></section>
          <nav className="w-full hidden  md:flex justify-around items-center p-2">
            {Array(3)
              .fill(1)
              .map((_, idx) => (
                <div
                  key={idx}
                  className="w-[100px] h-[40px] rounded-sm bg-stone-700 animate-pulse"
                ></div>
              ))}
          </nav>
          <section className="mt-4 flex justify-around items-center md:hidden">
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
      <nav className="hidden md:inline-block w-[30%] h-full px-4 mt-24">
        <div className="w-full h-[40px] rounded-sm bg-stone-700 animate-pulse"></div>
        <div className="w-[60%] mt-3 h-[40px] rounded-sm bg-stone-700 animate-pulse"></div>
        <div className="w-full flex justify-between items-center mt-11">
          <div className="w-[70%] h-[40px] rounded-sm bg-stone-700 animate-pulse"></div>
          <div className="w-[20%] h-[40px] rounded-sm bg-stone-700 animate-pulse"></div>
        </div>
      </nav>
    </nav>
  );
};

export default LoadingWithId;
