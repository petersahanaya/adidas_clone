"use client";

type ButtonProps = {
  type: "submit" | "button";
  width?: string;
  padding?: string;
  background?: string;
  textColor?: string;
  onClick?: (x: any) => void;
  disabled?: boolean;
  children: React.ReactNode;
};

const Button = ({
  type,
  children,
  disabled = false,
  onClick,
  background = "bg-stone-900",
  textColor = "text-stone-100",
  width = "w-full",
  padding = "p-2",
}: ButtonProps) => {
  return (
    <div className={`relative ${width} z-10`}>
      <span
        className={`absolute z-[-1] bottom-[-4px] right-[5px] ${width} ${padding} py-4 border-[2px] 
          border-stone-800`}
      ></span>
      <button
        onClick={onClick}
        disabled={disabled}
        className={`${width} ${padding} ${background} text-sm ${textColor} tracking-wider uppercase font-[300] flex justify-around items-center`}
        type={type}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
