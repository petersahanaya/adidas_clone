import SessionProvide from "@providers/sessionProvider/SessionProvider";
import "../globals.css";
import { Poppins } from "next/font/google";
import GenerateCart from "@components/generateCart/GenerateCart";
import Footer from "@/components/footer/Footer";

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
        <SessionProvide>
          <GenerateCart />
          {children}
        </SessionProvide>
        {/* <Footer /> */}
      </body>
    </html>
  );
}
