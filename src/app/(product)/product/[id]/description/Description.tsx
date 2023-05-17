import ArrowIcon from "@/components/icons/arrowIcon/ArrowIcon";
import HeartIcon from "@/components/icons/heartIcon/HeartIcon";
import Button from "@components/button/Button"

type DescriptionProps = {
  title: string;
  description: string;
  size : string;
  stock : number;
};

const Description = ({ title, description, size, stock }: DescriptionProps) => {
  return (
    <>
      <div>
        <p className="text-xs text-stone-700">{size}</p>
        <div>
          <p className="text-red-400 text-[.7rem] font-[500] uppercase">
            {stock} stock
          </p>
        </div>
      </div>
      <div className="flex justify-around items-end gap-2">
        <Button width="w-full flex-1" padding="mt-4 p-4" type="button">
          Add to bag
          <ArrowIcon color="#ffffff" width={13} height={13} />
        </Button>
        <div className="border-[1px] p-[.55rem] border-stone-400">
          <HeartIcon width={28} height={28} isLike={false} />
        </div>
      </div>
      <div className="mt-6">
        <span>
          <h2 className="text-4xl font-[600] text-stone-800 tracking-wider">
            {title}
          </h2>
        </span>
        <p className="text-sm mt-3 text-stone-600 leading-5 tracking-tight font-[300]">
          {description}
        </p>
      </div>
    </>
  );
};

export default Description;
