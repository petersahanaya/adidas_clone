import { prisma } from "@/lib/config/prisma.config";
import { stripe } from "@/lib/config/stripe";
import { Product } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { products, userId } = (await req.json()) as {
    products: Product[];
    userId: string;
  };

  try {
    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      submit_type: "pay",
      mode: "payment",
      payment_method_types: ["card"],
      shipping_options: [
        {
          shipping_rate: "shr_1LwmT2K925rMwv33F9YzJy74",
        },
      ],
      line_items: products.map((product) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: product.title,
            description: product.description,
            images: product.previewImages,
          },
          unit_amount: product.price * 100,
        },
        adjustable_quantity: {
          enabled: true,
          maximum: 4,
          minimum: 1,
        },
        quantity: product.count,
      })),
      success_url: "https://p3das.vercel.app/?success=true",
      cancel_url: "https://p3das.vercel.app/?cancel=true",
    });

    for (const product of products) {
      await prisma.user.update({
        where: { id: userId },
        data: { bag: { disconnect: { id: product.id } } },
      });
    }

    return NextResponse.json({ session });
  } catch (err: any) {
    return NextResponse.json(err.message, { status: 500 });
  }
}
