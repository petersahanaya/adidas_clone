type HeadingProps = {
  children: React.ReactNode;
  size?: string;
  weight?: string;
  color?: string;
  margin?: string;
};

const Heading = ({
  size = "text-3xl",
  weight = "font-[700]",
  color = "text-stone-900",
  margin = "",
  children,
}: HeadingProps) => {
  return (
    <>
      <h3 className={`${weight} ${size} ${color} ${margin}`}>{children}</h3>
    </>
  );
};

export default Heading;
