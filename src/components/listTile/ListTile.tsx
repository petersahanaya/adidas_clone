"use client";

type ListTileProps = {
  children: React.ReactNode;
  label: string;
  width?: string;
  padding?: string;
  labelColor?: string;
  labelSize?: string;
  background?: string;
  border?: string;
  weight?: string;
  spacing?: string;
  onClick: (x: any) => void;
};

const ListTile = ({
  children,
  label,
  padding,
  border = "border-[2px] border-stone-900",
  weight = "font-[400]",
  width = "w-full",
  background,
  labelColor = "text-stone-600",
  labelSize = "text-sm",
  spacing = "gap-5",
  onClick,
}: ListTileProps) => {
  return (
    <div
      onClick={onClick}
      className={`${
        background ? "bg-stone-900" : ""
      } flex justify-start items-center  rounded-sm ${border} ${spacing} ${width} ${padding}`}
    >
      {children}
      <p className={`${labelColor} ${labelSize} ${weight}`}>{label}</p>
    </div>
  );
};

export default ListTile;
