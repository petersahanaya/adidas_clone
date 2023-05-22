import { prisma } from "@/lib/config/prisma.config";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const parsedUrl = new URL("", req.url);

  const title = parsedUrl.searchParams.get("q");
  const category = parsedUrl.searchParams.get("category");
  const type = parsedUrl.searchParams.get("type");

  if (!title) {
    return NextResponse.json({ products: [] });
  }

  if (category && type) {
    const products = await prisma.product.findMany({
      where: {
        title: {
          contains: title,
          mode: "insensitive",
        },
        category,
        type,
      },
      include: { author: false, favorite: false },
    });

    return NextResponse.json({ products: products || [] });
  } else if (category) {
    const products = await prisma.product.findMany({
      where: {
        title: {
          contains: title,
          mode: "insensitive",
        },
        category,
      },
      include: { author: false, favorite: false },
    });

    return NextResponse.json({ products: products || [] });
  } else if (type) {
    const products = await prisma.product.findMany({
      where: {
        title: {
          contains: title,
          mode: "insensitive",
        },
        type,
      },
      include: { author: false, favorite: false },
    });

    return NextResponse.json({ products: products || [] });
  }

  const products = await prisma.product.findMany({
    where: {
      title: {
        contains: title,
        mode: "insensitive",
      },
    },
    include: { author: false, favorite: false },
  });

  return NextResponse.json({ products: products || [] });
}
