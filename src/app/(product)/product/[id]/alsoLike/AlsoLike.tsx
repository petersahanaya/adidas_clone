import Card from "@/app/(home)/card/Card";
import ClientOnly from "@/components/clientOnly/ClientOnly";
import CardLoading from "@/components/loading/card/CardLoading";
import { BASE_URL } from "@/lib/config/url";
import { Product } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

const getProducts = async ({
  take,
  skip,
  type,
}: {
  take: number;
  skip: number;
  type: string;
}) => {
  const url = `${BASE_URL}/api/products?take=${take}&limit=${skip}`;

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

type AlsoLikeProps = {
  type: string;
};

//lg:w-[700px] xl:w-[900px]

const AlsoLike = ({ type }: AlsoLikeProps) => {
  const { data, isLoading } = useQuery({
    queryKey: ["like-products"],
    queryFn: () => getProducts({ take: 6, skip: 0, type }),
  });

  if (isLoading)
    return (
      <ClientOnly>
        <section className="w-full flex justify-start items-center gap-2 overflow-x-scroll">
          {Array(8)
            .fill(1)
            .map((_, idx) => (
              <nav key={idx}>
                <CardLoading />
              </nav>
            ))}
        </section>
      </ClientOnly>
    );

  return (
    <section className="px-2 mt-6 w-full">
      <h2 className="text-2xl sm:text-3xl sm:mt-9 font-[600] text-stone-800 tracking-tight uppercase mb-3">
        you may also like
      </h2>
      {!data?.products.length && <p>there no product 😁</p>}

      {data?.products.length && (
        <section className="flex justify-start items-center gap-2 overflow-x-scroll">
          {data!.products!.map((product, idx) => (
            <nav key={idx}>
              <Card
                {...product}
                width="w-[120px] xs:w-[200px] lg:w-[230px]"
                height="h-[180px] sm:h-[280px] lg:h-[280px]"
              />
            </nav>
          ))}
        </section>
      )}
    </section>
  );
};

export default AlsoLike;
