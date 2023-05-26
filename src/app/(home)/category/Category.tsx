import Button from "@/components/button/Button";
import Image from "next/image";
import Link from "next/link";

const listOfCategory = [
  {
    imageSrc: "/man-category.webp",
    title: "man",
  },
  {
    imageSrc: "/woman-category.webp",
    title: "woman",
  },
  {
    imageSrc: "/kid-category.jpeg",
    title: "kid",
  },
];

const Category = () => {
  return (
    <main className="w-screen px-4 flex flex-col gap-2">
      {listOfCategory.map((category, idx) => (
        <section key={idx} className="w-full h-[100px] relative rounded-lg">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-stone-800/90 to-transparent z-10"></div>
          <Image
            className="object-cover rounded-md"
            src={category.imageSrc}
            alt={category.title}
            fill
          />
          <Link
            href={`/products?category=${category.title}&type=all`}
            className="absolute bottom-[20px] left-[5%] z-10"
          >
            <Button
              textColor="text-stone-100 text-xs"
              background="bg-stone-900"
              width="w-[180px]"
              type="button"
            >
              {category.title}
            </Button>
          </Link>
        </section>
      ))}
    </main>
  );
};

{
  /* <button className="absolute bottom-[10px] left-[32%] bg-stone-100 rounded-md p-2 text-xs font-[300] w-[80px] z-10 ">
  {category.title}
</button>; */
}

export default Category;
