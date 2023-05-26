import { BASE_URL } from "@/app/(auth)/signIn/SignInAuth";
import { Product } from "@prisma/client";
import Input from "./input/Input";
import Header from "@/app/homepage/header/Header";
import Sidebar from "@components/sidebar/Sidebar";
import LottieComp from "@components/lottie/LottieComp";
import emptyAnimation from "../../../../public/empty-search.json";
import { Fragment } from "react";
import Card from "../card/Card";
import Filter from "@/components/filter/Filter";

type SearchPageProps = {
  params: {};
  searchParams: {
    q: string;
    category?: string;
    type?: string;
  };
};

const getQueryProducts = async (
  title: string,
  category?: string,
  type?: string
) => {
  if (category && type) {
    try {
      const resp = await fetch(
        `http://localhost:3000/api/search?q=${title}&category=${category}&type=${type}`
      );

      const data = (await resp.json()) as { products: Product[] | [] };

      console.log(data);

      return data.products;
    } catch (e: any) {
      // console.error(e);
    }
  } else if (category) {
    try {
      const resp = await fetch(
        `http://localhost:3000/api/search?q=${title}&category=${category}`
      );

      const data = (await resp.json()) as { products: Product[] | [] };

      console.log(data);

      return data.products;
    } catch (e: any) {
      // console.error(e);
    }
  } else if (type) {
    try {
      const resp = await fetch(
        `http://localhost:3000/api/search?q=${title}&type=${type}`
      );

      const data = (await resp.json()) as { products: Product[] | [] };

      console.log(data);

      return data.products;
    } catch (e: any) {
      // console.error(e);
    }
  } else {
    try {
      const resp = await fetch(`http://localhost:3000/api/search?q=${title}`);

      const data = (await resp.json()) as { products: Product[] | [] };

      console.log(data);

      return data.products;
    } catch (e: any) {
      // console.error(e);
    }
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
  console.log(searchParams);
  const products = await getQueryProducts(
    searchParams.q,
    searchParams.category,
    searchParams.type
  );

  console.log({ searchParams });

  return (
    <main className="w-screen h-screen pb-24 overflow-x-hidden">
      <Header isIcon />
      <Sidebar />
      <Input query={searchParams.q} />
      <section className="px-4">
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

      <section className="w-full grid grid-cols-2 justify-items-center">
        {products?.map((product, idx) => (
          <Fragment key={idx}>
            <Card {...product} />
          </Fragment>
        ))}
      </section>
    </main>
  );
};

export default SearchPage;
