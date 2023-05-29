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
import { BASE_URL } from "@/lib/config/url";

type FavoritePageProps = {
  params: {};
  searchParams: {
    type: string;
    category: string;
  };
};

export const metadata = {
  title: "Favorite",
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
        `https://p3das.vercel.app/api/like?userId=${userId}&category=${category}&type=${type}`,
        {
          cache: "no-store",
        }
      );
      const data = (await resp.json()) as { products: Product[] };

      return data;
    } else if (category) {
      const resp = await fetch(
        `https://p3das.vercel.app/api/like?userId=${userId}&category=${category}`,
        {
          cache: "no-store",
        }
      );
      const data = (await resp.json()) as { products: Product[] };

      return data;
    } else if (type) {
      const resp = await fetch(
        `https://p3das.vercel.app/api/like?userId=${userId}&type=${type}`,
        {
          cache: "no-store",
        }
      );
      const data = (await resp.json()) as { products: Product[] };

      return data;
    }

    const resp = await fetch(`https://p3das.vercel.app/api/like?userId=${userId}`, {
      cache: "no-store",
    });
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
        <nav className="lg:w-[200px] sm:w-[200px]">
          <Filter hint="choose a type" keyAdded="type" options={typeOptions} />
          <Filter
            hint="choose a category"
            keyAdded="category"
            options={categoryOptions}
          />
        </nav>
        <span className="px-6">
          <Heading>Favorite</Heading>
        </span>
      </section>
      <section className="mt-2">
        {products.length ? (
          <nav
            className={`px-4 grid grid-cols-2 sm:grid-cols-3 ${
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
