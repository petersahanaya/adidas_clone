import Header from "@/app/homepage/header/Header";
import Sidebar from "@components/sidebar/Sidebar";
import { Product } from "@prisma/client";
import ClientProduct from "./ClientProduct";

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

  return (
    <>
      <main className="w-screen pb-10 overflow-hidden">
        <Header isIcon={true} />
        <Sidebar />
        <ClientProduct placeholderData={product} id={params.id} />
      </main>
    </>
  );
};

export default ProductWithId;
