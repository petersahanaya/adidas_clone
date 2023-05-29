import { Product } from "@prisma/client";
import Card from "../card/Card";
import { BASE_URL } from "@/lib/config/url";

const getProducts = async ({
  take,
  skip,
}: {
  take: number;
  skip: number;
}): Promise<{ products: Product[] }> => {
  const url = `https://p3das.vercel.app/api/products?take=${take}&limit=${skip}`;

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

const Hot = async () => {
  const { products } = await getProducts({ take: 15, skip: 15 });

  return (
    <main className="mt-3 px-3">
      <div className="mb-4">
        <h3 className="text-xl xs:text-2xl lg:text-3xl font-[600] uppercase text-stone-800">
          Best of Adidas
        </h3>
      </div>
      <nav className="w-screen h-max flex justify-start items-center gap-2 overflow-x-scroll pr-8">
        {products.map((product) => (
          <section key={product.id}>
            <Card
              {...product}
              width="w-[120px] xs:w-[200px] lg:w-[230px]"
              height="h-[180px] sm:h-[220px] lg:h-[280px]"
            />
          </section>
        ))}
      </nav>
    </main>
  );
};

export default Hot;
