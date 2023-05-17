type SubtitleProps = {
  children: React.ReactNode;
  color?: string;
  size?: string;
};

const Subtitle = ({
  children,
  size = "text-[.7rem]",
  color = "text-stone-600",
}: SubtitleProps) => {
  return (
    <>
      <p className={` ${size} ${color}`}>{children}</p>
    </>
  );
};

export default Subtitle;
