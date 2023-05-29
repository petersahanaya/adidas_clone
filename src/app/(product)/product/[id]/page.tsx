import Header from "@/app/homepage/header/Header";
import Sidebar from "@components/sidebar/Sidebar";
import { Product } from "@prisma/client";
import ClientProduct from "./ClientProduct";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Head from "next/head";
import { BASE_URL } from "@/lib/config/url";

export const fetchCache = "force-no-store";
export const dynamic = "force-dynamic";

const getProduct = async (key: string | string[], userId: string) => {
  try {
    const resp = await fetch(`https://p3das.vercel.app/api/product?id=${key}`, {
      cache: "no-store",
    });

    const data = (await resp.json()) as { product: Product };

    const favoriteResp = await fetch(
      `https://p3das.vercel.app/api/favorite?productId=${key}&userId=${userId}`,
      {
        cache: "no-store",
      }
    );

    const favoriteData = (await favoriteResp.json()) as { isFavorite: boolean };

    return { product: data.product, isFavorite: favoriteData.isFavorite };
  } catch (e: any) {
    throw new Error(e);
  }
};

type ProductIdProps = {
  params: {
    id: string;
  };
};

const ProductWithId = async ({ params }: ProductIdProps) => {
  const session = await getServerSession(authOptions);
  const product = await getProduct(params.id, session?.user.id!);

  return (
    <>
      <Head>
        <title>Product | {product.product.title}</title>
      </Head>
      <main className="w-screen pb-10 overflow-hidden">
        <Header isIcon={true} />
        <div className="w-full border-t-[1px] border-t-stone-300"></div>
        <Sidebar />
        <ClientProduct
          session={session!}
          placeholderData={product}
          id={params.id}
        />
      </main>
    </>
  );
};

export default ProductWithId;
