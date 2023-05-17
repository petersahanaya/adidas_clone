type ContainerProps = {
  width: string;
  height?: string;
  padding?: string;
  margin?: string;
  children: React.ReactNode;
};

const Container = ({
  width,
  height = "h-screen",
  margin = "m-auto",
  padding = "p-13",
  children,
}: ContainerProps) => {
  return (
    <section className={`${padding} ${width} ${height} ${margin}`}>
      {children}
    </section>
  );
};

export default Container;
