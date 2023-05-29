import { PostFormValues } from "@/app/homepage/post/Post";
import { prisma } from "@/lib/config/prisma.config";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export type PostUploadType = {
  previewImages: string[];
} & PostFormValues;

export async function POST(req: Request) {
  const {
    category,
    description,
    previewImages,
    price,
    size,
    stock,
    title,
    type,
  } = (await req.json()) as PostUploadType;

  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 400 });
  }

  const result = await prisma.product.create({
    data: {
      title,
      description,
      size: size.value,
      stock: Number(stock),
      category: category.value,
      previewSrc: previewImages[0],
      previewImages: [previewImages[0], previewImages[1]],
      type: type.value,
      price: Number(price),
      originalPrice: Number(price),
    },
  });

  return NextResponse.json({ message: "created.." }, { status: 201 });
}
