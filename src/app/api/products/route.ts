import { prisma } from "@/lib/config/prisma.config";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const baseUrl = req.url as string;

  const url = new URL("", baseUrl);

  const take = url.searchParams.get("take");
  const skip = url.searchParams.get("skip");
  const type = url.searchParams.get("type") as string;
  const category = url.searchParams.get("category");

  try {
    if (category && type) {
      if (type === "ALL") {
        const products = await prisma.product.findMany({
          where: {
            category,
          },
          take: Number(take),
          skip: Number(skip),
          select: {
            title: true,
            description: true,
            stock: true,
            price: true,
            previewImages: true,
            previewSrc: true,
            type: true,
            id: true,
            category: true,
            size: true,
          },
        });
        return NextResponse.json({ products: products || [] });
      } else {
        const products = await prisma.product.findMany({
          where: {
            category,
            type,
          },
          take: Number(take),
          skip: Number(skip),
          select: {
            title: true,
            description: true,
            stock: true,
            price: true,
            previewImages: true,
            previewSrc: true,
            type: true,
            id: true,
            category: true,
            size: true,
          },
        });
        return NextResponse.json({ products: products || [] });
      }
    } else if (type && type !== "ALL") {
      const products = await prisma.product.findMany({
        where: {
          type,
        },
        take: Number(take),
        skip: Number(skip),
        select: {
          title: true,
          description: true,
          stock: true,
          price: true,
          previewImages: true,
          previewSrc: true,
          type: true,
          id: true,
          category: true,
          size: true,
        },
      });
      return NextResponse.json({ products: products || [] });
    } else if (category) {
      const products = await prisma.product.findMany({
        take: Number(take),
        skip: Number(skip),
        where: { category },
        select: {
          title: true,
          description: true,
          stock: true,
          price: true,
          previewImages: true,
          previewSrc: true,
          type: true,
          id: true,
          category: true,
          size: true,
        },
      });
      return NextResponse.json({ products: products || [] });
    } else {
      const products = await prisma.product.findMany({
        take: Number(take),
        skip: Number(skip),
        select: {
          title: true,
          description: true,
          stock: true,
          price: true,
          previewImages: true,
          previewSrc: true,
          type: true,
          id: true,
          category: true,
          size: true,
        },
      });
      return NextResponse.json({ products: products || [] });
    }
  } catch (e) {
    console.log(e);
  }
}
