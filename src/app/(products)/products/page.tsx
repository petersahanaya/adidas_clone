import Card from "@/app/(home)/card/Card";
import Header from "@/app/homepage/header/Header";
import Filter from "@/components/filter/Filter";
import LottieComp from "@/components/lottie/LottieComp";
import Sidebar from "@/components/sidebar/Sidebar";
import { Product } from "@prisma/client";
import { Fragment } from "react";
import emptyAnimation from "../../../../public/empty-lottie.json";
import { BASE_URL } from "@/lib/config/url";

export const fetchCache = "force-no-store";
export const dynamic = "force-dynamic";

type ProductsPageProps = {
  params: {};
  searchParams: {
    category: string;
    type: string;
  };
};

export const metadata = {
  title: "Products",
};

const getProducts = async ({
  take,
  skip,
  category,
  type,
}: {
  take: number;
  skip: number;
  category: string;
  type: string;
}): Promise<{ products: Product[] }> => {
  const url = `https://p3das.vercel.app/api/products?category=${category}&take=${take}&limit=${skip}&type=${type}`;

  try {
    const resp = await fetch(url, {
      cache: "no-store",
    });

    const data = (await resp.json()) as { products: Product[] };

    return data;
  } catch (e: any) {
    throw new Error(e);
  }
};

const typeOptions = [{ value: "SHIRT" }, { value: "SHOES" }];

const ProductsPage = async ({ params, searchParams }: ProductsPageProps) => {
  const { products } = await getProducts({
    skip: 0,
    take: 15,
    category: searchParams.category.toUpperCase(),
    type: searchParams.type.toUpperCase(),
  });

  return (
    <main className="w-screen overflow-hidden pb-10 ">
      <Header isIcon />
      <Sidebar />
      <header className="w-screen border-t-[1px] border-t-stone-300 pt-6 mb-3 px-6 m-auto sm:px-4">
        <div className="flex justify-start items-center gap-2">
          <h2 className="text-3xl sm:text-4xl xl:text-6xl font-[300] text-stone-800 italic">
            {searchParams.category}
          </h2>
          <p>-</p>
          <h2 className="text-2xl sm:text-3xl xl:text-5xl font-[400] text-stone-800 italic">
            {searchParams.type}
          </h2>
        </div>
        <div className="w-full xl:w-[200px]">
          <Filter hint="choose type" keyAdded="type" options={typeOptions} />
        </div>
      </header>
      {products.length ? (
        <nav
          className={`w-screen  grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4  ${
            products.length === 1
              ? "justify-items-start"
              : "justify-items-center"
          }`}
        >
          {products.map((product, idx) => (
            <Fragment key={idx}>
              <Card
                {...product}
                width="w-[120px] xs:w-[200px] lg:w-[230px] xl:w-[250px]"
                height="h-[180px] sm:h-[220px] lg:h-[280px] xl:h-[280px]"
              />
            </Fragment>
          ))}
        </nav>
      ) : (
        <nav className="w-full h-screen">
          <LottieComp
            buttonText=""
            animation={emptyAnimation}
            isButton={false}
            title="coming soon"
            subtitle="choose another type"
          />
        </nav>
      )}
    </main>
  );
};

export default ProductsPage;
