import SessionProvide from "@providers/sessionProvider/SessionProvider";
import "./globals.css";
import { Poppins } from "next/font/google";
import ReactQueryProvider from "@components/clientOnly/reactQueryProvider/ReactQueryProvider";
import GenerateCart from "@components/generateCart/GenerateCart";

export const fetchCache = "force-no-store";
export const dynamic = "force-dynamic";

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

const poppins = Poppins({
  subsets: ["latin"],
  fallback: ["sans-serif"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <ReactQueryProvider>
          <SessionProvide>
            <GenerateCart />
            {children}
          </SessionProvide>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
