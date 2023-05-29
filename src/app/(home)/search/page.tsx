import { Product } from "@prisma/client";
import Input from "./input/Input";
import Header from "@/app/homepage/header/Header";
import Sidebar from "@components/sidebar/Sidebar";
import LottieComp from "@components/lottie/LottieComp";
import emptyAnimation from "../../../../public/empty-search.json";
import { Fragment } from "react";
import Card from "../card/Card";
import Filter from "@/components/filter/Filter";
import { BASE_URL } from "@/lib/config/url";

type SearchPageProps = {
  params: {};
  searchParams: {
    q: string;
    category?: string;
    type?: string;
  };
};

export const metadata = {
  title: "Search",
};

const getQueryProducts = async (
  title: string,
  category?: string,
  type?: string
) => {
  if (category && type) {
    try {
      const resp = await fetch(
        `${BASE_URL}/api/search?q=${title}&category=${category}&type=${type}`,
        {
          cache: "no-store",
        }
      );

      const data = (await resp.json()) as { products: Product[] | [] };

      return data.products;
    } catch (e: any) {}
  } else if (category) {
    try {
      const resp = await fetch(
        `${BASE_URL}/api/search?q=${title}&category=${category}`,
        {
          cache: "no-store",
        }
      );

      const data = (await resp.json()) as { products: Product[] | [] };

      return data.products;
    } catch (e: any) {}
  } else if (type) {
    try {
      const resp = await fetch(
        `${BASE_URL}/api/search?q=${title}&type=${type}`,
        {
          cache: "no-store",
        }
      );

      const data = (await resp.json()) as { products: Product[] | [] };

      return data.products;
    } catch (e: any) {}
  } else {
    try {
      const resp = await fetch(`${BASE_URL}/api/search?q=${title}`, {
        cache: "no-store",
      });

      const data = (await resp.json()) as { products: Product[] | [] };

      return data.products;
    } catch (e: any) {}
  }
};

const categoryOptions = [
  {
    value: "MAN",
  },
  {
    value: "WOMAN",
  },
  {
    value: "KID",
  },
];

const typeOptions = [
  {
    value: "SHIRT",
  },
  {
    value: "SHOES",
  },
  {
    value: "HAT",
  },
];

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const products = await getQueryProducts(
    searchParams.q,
    searchParams.category,
    searchParams.type
  );

  return (
    <main className="w-screen h-screen pb-24 overflow-x-hidden">
      <Header isIcon />
      <Sidebar />
      <Input query={searchParams.q} />
      <section className="px-4 lg:w-[200px] sm:w-[200px]">
        <Filter
          hint="choose category"
          keyAdded="category"
          options={categoryOptions}
        />
        <Filter hint="choose type" keyAdded="type" options={typeOptions} />
      </section>

      {!products ||
        (!products.length && (
          <LottieComp
            isButton={false}
            animation={emptyAnimation}
            titleStyle="text-[2.9rem] mb-3"
            subtitleStyle="text-xs tracking-tight"
            title="cannot find product"
            subtitle="go and search again"
            buttonText=""
          />
        ))}

      <section
        className={`w-full grid grid-cols-2 gap-2 lg:mt-3 justify-items-center sm:grid-cols-3 lg:grid-cols-4`}
      >
        {products?.map((product, idx) => (
          <Fragment key={idx}>
            <Card
              {...product}
              width="w-[120px] xs:w-[200px] lg:w-[230px] xl:w-[250px]"
              height="h-[180px] sm:h-[220px] lg:h-[280px] xl:h-[280px]"
            />
          </Fragment>
        ))}
      </section>
    </main>
  );
};

export default SearchPage;
