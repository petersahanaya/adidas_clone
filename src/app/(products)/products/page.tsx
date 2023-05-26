import Card from "@/app/(home)/card/Card";
import Header from "@/app/homepage/header/Header";
import Filter from "@/components/filter/Filter";
import LottieComp from "@/components/lottie/LottieComp";
import Sidebar from "@/components/sidebar/Sidebar";
import { Product } from "@prisma/client";
import { Fragment } from "react";
import emptyAnimation from "../../../../public/empty-lottie.json";

type ProductsPageProps = {
  params: {};
  searchParams: {
    category: string;
    type: string;
  };
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
  const url = `http://localhost:3000/api/products?category=${category}&take=${take}&limit=${skip}&type=${type}`;

  try {
    const resp = await fetch(url, {
      cache: "no-store",
    });

    const data = (await resp.json()) as { products: Product[] };

    return data;
  } catch (e: any) {
    console.log(e);
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
    <main className="w-screen overflow-hidden px-3">
      <Header isIcon />
      <Sidebar />
      <header className="w-screen border-t-[1px] border-t-stone-300 pt-6 mb-3 px-6 m-auto">
        <div className="flex justify-start items-center gap-2">
          <h2 className="text-3xl font-[300] text-stone-800 italic">
            {searchParams.category}
          </h2>
          /
          <h2 className="text-2xl font-[400] text-stone-800 italic">
            {searchParams.type}
          </h2>
        </div>
        <Filter hint="choose type" keyAdded="type" options={typeOptions} />
      </header>
      {products.length ? (
        <nav className="w-screen grid grid-cols-2 justify-items-center">
          {products.map((product, idx) => (
            <Fragment key={idx}>
              <Card
                width="w-[200px]"
                title={product.title}
                category={product.category}
                previewSrc={product.previewSrc}
                price={product.price}
                id={product.id}
                type={product.type}
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
