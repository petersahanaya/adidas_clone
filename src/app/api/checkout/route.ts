import { stripe } from "@/lib/config/stripe";
import { Product } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { products } = (await req.json()) as { products: Product[] };

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
    return NextResponse.redirect(session.url as string);
  } catch (err: any) {
    return NextResponse.json(err.message, { status: 500 });
  }
}
