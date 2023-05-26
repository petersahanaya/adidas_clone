import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Header from "../homepage/header/Header";
import { redirect } from "next/navigation";
import { Product } from "@prisma/client";
import Filter from "@components/filter/Filter";
import { Fragment } from "react";
import Card from "../(home)/card/Card";
import LottieComp from "@components/lottie/LottieComp";
import emptyAnimation from "../../../public/empty-lottie.json";
import Heading from "@components/heading/Heading";
import Sidebar from "@components/sidebar/Sidebar";

type FavoritePageProps = {
  params: {};
  searchParams: {
    type: string;
    category: string;
  };
};

const getFavoriteProducts = async ({
  type,
  category,
  userId,
}: {
  type?: string;
  category?: string;
  userId: string;
}) => {
  try {
    if (category && type) {
      const resp = await fetch(
        `http://localhost:3000/api/like?userId=${userId}&category=${category}&type=${type}`
      );
      const data = (await resp.json()) as { products: Product[] };

      return data;
    } else if (category) {
      const resp = await fetch(
        `http://localhost:3000/api/like?userId=${userId}&category=${category}`
      );
      const data = (await resp.json()) as { products: Product[] };

      return data;
    } else if (type) {
      const resp = await fetch(
        `http://localhost:3000/api/like?userId=${userId}&type=${type}`
      );
      const data = (await resp.json()) as { products: Product[] };

      return data;
    }

    const resp = await fetch(`http://localhost:3000/api/like?userId=${userId}`);
    const data = (await resp.json()) as { products: Product[] };

    return data;
  } catch (e: any) {
    throw new Error(e);
  }
};

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

const FavoritePage = async ({ params, searchParams }: FavoritePageProps) => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    redirect("/signIn");
  }
  const { products } = await getFavoriteProducts({
    userId: session.user.id!,
    ...searchParams,
  });

  return (
    <main className="w-screen h-screen">
      <Header isIcon />
      <Sidebar />
      <section className="w-full px-4 border-t-[1px] border-t-stone-300 pt-6">
        <Filter hint="choose a type" keyAdded="type" options={typeOptions} />
        <Filter
          hint="choose a category"
          keyAdded="category"
          options={categoryOptions}
        />
        <span className="px-6">
          <Heading>Favorite</Heading>
        </span>
      </section>
      <section className="mt-2">
        {products.length ? (
          <nav
            className={`px-4 grid grid-cols-2 ${
              products.length === 1
                ? "justify-items-start"
                : "justify-items-center"
            }`}
          >
            {products.map((product, idx) => (
              <Fragment key={idx}>
                <Card {...product} />
              </Fragment>
            ))}
          </nav>
        ) : null}

        {!products.length ? (
          <LottieComp
            animation={emptyAnimation}
            isButton={false}
            title="there's no favorite product"
            subtitle="go and add favorite product"
            buttonText=""
          />
        ) : null}
      </section>
    </main>
  );
};

export default FavoritePage;
