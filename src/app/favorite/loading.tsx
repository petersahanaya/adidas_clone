import CardLoading from "@/components/loading/card/CardLoading";
import HeaderLoading from "@/components/loading/header/HeaderLoading";

const LoadingFavorite = () => {
  return (
    <main className="w-screen h-screen">
      <HeaderLoading />
      <section className="mt-5 w-full px-5">
        <nav className="w-full flex flex-col justify-start items-start gap-2">
          <div className="w-[170px] h-[40px] rounded-sm bg-stone-700 animate-pulse"></div>
          <div className="w-full md:w-[40%] h-[40px] rounded-sm bg-stone-700 animate-pulse"></div>
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

export default LoadingFavorite;
