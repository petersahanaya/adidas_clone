const CardLoading = () => {
  return (
    <section className="w-[120px] h-[180px]">
      <header
        style={{ animationDelay: "100ms" }}
        className="w-full h-[120px] bg-stone-700 animate-pulse"
      ></header>
      <section className="flex mt-2 flex-col justify-start items-start gap-2 px-2">
        <div
          style={{ animationDelay: "110ms" }}
          className="w-[70%] h-[20px] rounded-full animate-pulse bg-stone-700"
        ></div>
        <div
          style={{ animationDelay: "120ms" }}
          className="w-[40%] h-[20px] rounded-full animate-pulse bg-stone-700"
        ></div>
      </section>
    </section>
  );
};

export default CardLoading;
