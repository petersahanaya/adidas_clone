"use client";

import React from "react";
import Preview from "./preview/Preview";
import Tag from "./tag/Tag";
import Description from "./description/Description";
import { Product } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import AlsoLike from "./alsoLike/AlsoLike";
import { Session } from "next-auth";

const BASE_URL = "http://localhost:3000";

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
  placeholderData: { product: Product };
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
      <Preview product={data!.product} />
      <Tag />
      <section className="px-4 py-3 w-full">
        <Description
          userId={session.user.id!}
          product={data!.product}
          size={data!.product.size}
          stock={data!.product.stock}
          title={data!.product.title}
          description={data!.product.description}
        />
      </section>

      <AlsoLike type={data!.product.type} />
    </>
  );
};

export default ClientProduct;
