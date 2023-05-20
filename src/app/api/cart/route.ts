import { prisma } from "@/lib/config/prisma.config";
import { Product } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const parsedUrl = new URL(req.url);

  const userId = parsedUrl.searchParams.get("userId") as string;

  console.log({ userId });

  const products = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      bag: true,
    },
  });

  console.log(products);

  return NextResponse.json({ cart: products?.bag || [] });
}

export async function DELETE(req: Request) {
  const parsedUrl = new URL("", req.url);

  const productId = parsedUrl.searchParams.get("productId") as string;
  const userId = parsedUrl.searchParams.get("userId") as string;

  const deletedProduct = await prisma.user.update({
    where: { id: userId },
    data: { bag: { disconnect: { id: productId } } },
  });

  console.log({ deletedProduct });

  return NextResponse.json({ message: "product deleted" });
}

export async function POST(req: Request) {
  const { product, userId } = (await req.json()) as {
    product: Product;
    userId: string;
  };

  console.log(product, userId);

  if (!userId)
    return NextResponse.json(
      { message: "user id is required" },
      { status: 400 }
    );

  const results = await prisma.user.update({
    where: { id: userId },
    data: { bag: { connect: { id: product.id } } },
  });

  console.log({ results });

  return NextResponse.json({ message: "cart added" });
}
