type AppBarProps = {
  children: React.ReactNode;
  height: string;
  width?: string;
  padding?: string;
  background?: string;
  title?: string;
  titleStyle?: string;
};

const AppBar = ({
  children,
  width = "w-full",
  height,
  background,
  padding = "p-2",
  title = "",
  titleStyle = "text-4xl font-[500] text-stone-800",
}: AppBarProps) => {
  return (
    <header
      className={`${width} ${padding} ${height}gap-3 flex justify-start items-center ${background}`}
    >
      {children}
      {title && <p className={titleStyle}>{title}</p>}
    </header>
  );
};

export default AppBar;
