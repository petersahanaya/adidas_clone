import Header from "@/app/homepage/header/Header";
import Sidebar from "@components/sidebar/Sidebar";
import { Product } from "@prisma/client";
import ClientProduct from "./ClientProduct";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const BASE_URL = "http://localhost:3000";

const getProduct = async (key: string | string[]) => {
  try {
    const resp = await fetch(`${BASE_URL}/api/product?id=${key}`, {
      cache: "no-store",
    });
    const data = await resp.json();

    return data as { product: Product };
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
  const product = await getProduct(params.id);
  const session = await getServerSession(authOptions);
  return (
    <>
      <main className="w-screen pb-10 overflow-hidden">
        <Header isIcon={true} />
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
