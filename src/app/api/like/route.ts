import { prisma } from "@/lib/config/prisma.config";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const parsedUrl = new URL("", req.url);

  const type = parsedUrl.searchParams.get("type");
  const category = parsedUrl.searchParams.get("category");
  const userId = parsedUrl.searchParams.get("userId") as string;

  if (type && category) {
    const products = await prisma.user.findUnique({
      where: { id: userId },
      include: { favorite: { where: { type, category } } },
    });

    const favoriteProducts = products?.favorite;

    return NextResponse.json({ products: favoriteProducts || [] });
  } else if (type) {
    const products = await prisma.user.findUnique({
      where: { id: userId },
      include: { favorite: { where: { type } } },
    });

    const favoriteProducts = products?.favorite;

    return NextResponse.json({ products: favoriteProducts || [] });
  } else if (category) {
    const products = await prisma.user.findUnique({
      where: { id: userId },
      include: { favorite: { where: { category } } },
    });

    const favoriteProducts = products?.favorite;

    return NextResponse.json({ products: favoriteProducts || [] });
  }

  const products = await prisma.user.findUnique({
    where: { id: userId },
    include: { favorite: true },
  });

  const favoriteProducts = products?.favorite;

  return NextResponse.json({ products: favoriteProducts || [] });
}
