"use client";

type FormProps = {
  style?: string;
  onSubmit: () => void;
  children: React.ReactNode;
};

const Form = ({
  style = "flex flex-col justify-center items-start gap-2",
  onSubmit,
  children,
}: FormProps) => {
  return (
    <form onSubmit={onSubmit} className={style}>
      {children}
    </form>
  );
};

export default Form;
