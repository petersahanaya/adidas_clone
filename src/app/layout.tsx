import SessionProvide from "@providers/sessionProvider/SessionProvider";
import "./globals.css";
import { Poppins } from "next/font/google";
import ReactQueryProvider from "@components/clientOnly/reactQueryProvider/ReactQueryProvider";
import GenerateCart from "@components/generateCart/GenerateCart";
import Footer from "@/components/footer/Footer";

export const fetchCache = "force-no-store";
export const dynamic = "force-dynamic";

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
        {/* <Footer /> */}
      </body>
    </html>
  );
}
