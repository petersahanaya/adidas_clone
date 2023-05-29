import { prisma } from "@/lib/config/prisma.config";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const parsedUrl = new URL("", req.url);

  const userId = parsedUrl.searchParams.get("userId");
  const productId = parsedUrl.searchParams.get("productId");

  if (!userId || !productId) {
    return NextResponse.json({ message: "userId and product Id are required" });
  }

  const find = await prisma.user.findUnique({
    where: { id: userId },
    include: { favorite: true },
  });

  const isFavorite = find?.favorite.find((product) => product.id === productId);

  if (isFavorite) {
    return NextResponse.json({ isFavorite: true });
  }
  return NextResponse.json({ isFavorite: false });
}

export async function POST(req: Request) {
  const parsedUrl = new URL("", req.url);

  const userId = parsedUrl.searchParams.get("userId");
  const productId = parsedUrl.searchParams.get("productId");

  if (!userId || !productId) {
    return NextResponse.json({ message: "userId and product Id are required" });
  }

  const founded = await prisma.user.findUnique({
    where: { id: userId },
    include: { favorite: true },
  });

  const isFavorite = founded?.favorite.find(
    (product) => product.favoriteId === userId
  );

  if (isFavorite) {
    await prisma.user.update({
      where: { id: userId },
      data: { favorite: { disconnect: { id: productId } } },
    });

    return NextResponse.json({ message: "product unfavorite" });
  }

  await prisma.user.update({
    where: { id: userId },
    data: { favorite: { connect: { id: productId } } },
  });

  return NextResponse.json({ message: "product favorited" });
}
