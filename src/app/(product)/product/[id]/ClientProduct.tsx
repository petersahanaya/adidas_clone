"use client";

import React from "react";
import Preview from "./preview/Preview";
import Tag from "./tag/Tag";
import Description from "./description/Description";
import { Product } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import AlsoLike from "./alsoLike/AlsoLike";
import { Session } from "next-auth";
import Head from "next/head";
import { BASE_URL } from "@/lib/config/url";


const getProduct = async (key: string | string[]) => {
  try {
    const resp = await fetch(`${BASE_URL}/api/product?id=${key}`);
    const data = await resp.json();

    return data as { product: Product };
  } catch (e: any) {
    throw new Error(e);
  }
};

type ClientProductProps = {
  placeholderData: { product: Product; isFavorite: boolean };
  session: Session;
  id: string;
};

const ClientProduct = ({
  placeholderData,
  id,
  session,
}: ClientProductProps) => {
  const { data } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
    placeholderData,
  });

  return (
    <>
      <Head>
        <title>Product | {data?.product.title}</title>
      </Head>
      <section className="w-screen lg:flex">
        <div
          style={{ flex: "0 0 70%" }}
          className="w-full flex-auto lg:w-[70%] xl:w-[70%] md:w-[70%]"
        >
          <Preview product={data!.product} />
          <Tag />
        </div>
        <section className="px-4 py-3 w-full">
          <Description
            id={id}
            isFavorite={placeholderData.isFavorite}
            userId={session.user.id!}
            product={data!.product}
            size={data!.product.size}
            stock={data!.product.stock}
            title={data!.product.title}
            description={data!.product.description}
          />
        </section>
      </section>

      <div className="sm:mt-10 lg:mt-0 w-full md:w-[70%]">
        <AlsoLike type={data!.product.type} />
      </div>
    </>
  );
};

export default ClientProduct;
