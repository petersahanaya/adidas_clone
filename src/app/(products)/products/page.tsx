import Card from "@/app/(home)/card/Card";
import Header from "@/app/homepage/header/Header";
import Sidebar from "@/components/sidebar/Sidebar";
import { Product } from "@prisma/client";
import { Fragment } from "react";

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
}: {
  take: number;
  skip: number;
  category: string;
}): Promise<{ products: Product[] }> => {
  const url = `http://localhost:3000/api/products?category=${category}&take=${take}&limit=${skip}`;

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

const ProductsPage = async ({ params, searchParams }: ProductsPageProps) => {
  const { products } = await getProducts({
    skip: 0,
    take: 8,
    category: searchParams.category.toUpperCase(),
  });

  return (
    <main className="w-screen overflow-hidden px-3">
      <Header isIcon />
      <Sidebar />
      <header className="mb-3">
        <div>
          <h2 className="text-3xl font-[300] text-stone-800 italic">
            {searchParams.category}
          </h2>
        </div>
      </header>
      {products.length ? (
        <nav className="w-screen grid grid-cols-2">
          {products.map((product, idx) => (
            <Fragment key={idx}>
              <Card
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
        <h2 className="text-center text-2xl italic">
          Sorry there&apos;s no products
        </h2>
      )}
    </main>
  );
};

export default ProductsPage;
