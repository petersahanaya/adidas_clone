import { prisma } from "@/lib/config/prisma.config";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL("", req.url);

  const id = url.searchParams.get("id") as string;

  try {
    const product = await prisma.product.findUnique({
      where: { id },
      include: { favorite: true },
    });

    return NextResponse.json({ product });
  } catch (e) {
    return NextResponse.json({ message: e });
  }
}


