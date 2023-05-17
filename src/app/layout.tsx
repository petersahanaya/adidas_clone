import SessionProvide from "@providers/sessionProvider/SessionProvider";
import "./globals.css";
import { Poppins } from "next/font/google";
import Post from "./homepage/post/Post";
import ReactQueryProvider from "@/components/clientOnly/reactQueryProvider/ReactQueryProvider";

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
        <Post />
        <ReactQueryProvider>
          <SessionProvide>{children}</SessionProvide>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
