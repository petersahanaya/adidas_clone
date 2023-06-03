import SessionProvide from "@providers/sessionProvider/SessionProvider";
import "../globals.css";
import { Poppins } from "next/font/google";
import GenerateCart from "@components/generateCart/GenerateCart";

const poppins = Poppins({
  subsets: ["latin"],
  fallback: ["sans-serif"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "P3das",
  icons: "/adidas-icon.png",
  description: "Best place to get best shirt.",
  keywords: "Shirt, Shoes, Portfolio",
  authors: {
    name: "Peter Sahanaya",
    url: "https://linkedin.com/in/peter-sahanaya",
  },
  creator: "peter",
};

export const fetchCache = "force-no-store";
export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <SessionProvide>
          <GenerateCart />
          {children}
        </SessionProvide>
      </body>
    </html>
  );
}
