import CardLoading from "@/components/loading/card/CardLoading";
import HeaderLoading from "@/components/loading/header/HeaderLoading";

const LoadingSearch = () => {
  return (
    <main className="w-screen h-screen">
      <HeaderLoading />
      <section className="w-full h-full px-4">
        <nav className="w-full flex justify-between items-center gap-2">
          <div className="w-[70%] sm:w-[80%] h-[40px] rounded-sm bg-stone-700 animate-pulse"></div>
          <div className="w-[20%] sm:w-[10%] h-[40px] rounded-sm bg-stone-700 animate-pulse"></div>
        </nav>
        <nav className="mt-3">
          <div className="w-full sm:w-[40%] h-[40px] rounded-sm bg-stone-700 animate-pulse"></div>
          <div className="w-full sm:w-[40%] h-[40px] rounded-sm bg-stone-700 animate-pulse mt-4"></div>
        </nav>

        <nav className="w-full h-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 justify-items-center mt-5 ">
          {Array(8)
            .fill(1)
            .map((_, idx) => (
              <div key={idx}>
                <CardLoading
                  height="h-[240px]"
                  width="w-[120px] xs:w-[150px]"
                />
              </div>
            ))}
        </nav>
      </section>
    </main>
  );
};

export default LoadingSearch;
