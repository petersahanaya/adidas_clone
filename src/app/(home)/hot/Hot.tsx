import { Product } from "@prisma/client";
import Card from "../card/Card";

const getProducts = async ({
  take,
  skip,
}: {
  take: number;
  skip: number;
}): Promise<{ products: Product[] }> => {
  const url = `http://localhost:3000/api/products?take=${take}&limit=${skip}`;

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

const Hot = async () => {
  const { products } = await getProducts({ take: 8, skip: 15 });

  return (
    <main className="mt-3 px-3">
      <div className="mb-4">
        <h3 className="text-xl font-[600] uppercase text-stone-800">
          Best of Adidas
        </h3>
      </div>
      <nav className="w-screen flex justify-start items-center gap-2 overflow-x-scroll pr-8">
        {products.map((product) => (
          <section key={product.id}>
            <Card
              id={product.id}
              title={product.title}
              category={product.category}
              previewSrc={product.previewSrc}
              price={product.price}
              type={product.type}
            />
          </section>
        ))}
      </nav>
    </main>
  );
};

export default Hot;
