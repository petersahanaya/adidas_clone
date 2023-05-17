import { prisma } from "@/lib/config/prisma.config";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const baseUrl = req.url;

  const url = new URL("", baseUrl);

  const id = url.searchParams.get("id") as string;

  try {
    const product = await prisma.product.findUnique({ where: { id } });

    return NextResponse.json({ product });
  } catch (e) {
    return NextResponse.json({ message: e });
  }
}
