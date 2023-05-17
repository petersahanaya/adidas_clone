const HeaderLoading = () => {
  return (
    <header className="w-screen h-[11vh] flex justify-around items-center px-3">
      <section className="flex-1 flex justify-start items-center gap-3">
        {Array(3)
          .fill(1)
          .map((_, idx) => (
            <span
              key={idx}
              style={{
                animationFillMode: "backwards",
                animationDelay: `${60 * (idx + 1)}ms`,
              }}
              className="w-[40px] h-[40px] rounded-full bg-stone-600 animate-pulse"
            ></span>
          ))}
      </section>
      <div
        style={{ animationFillMode: "backwards", animationDelay: "380ms" }}
        className="w-[40px] h-[40px] rounded-full bg-stone-600 animate-pulse"
      ></div>
    </header>
  );
};

export default HeaderLoading;
