import Sidebar from "@/components/sidebar/Sidebar";
import Header from "../homepage/header/Header";
import Preview from "../homepage/preview/Preview";
import Hot from "./hot/Hot";
import Category from "./category/Category";
import Params from "./searchParams/Params";
import Footer from "@/components/footer/Footer";

export const metadata = {
  title: "P3das",
};

export const fetchCache = "force-no-store";
export const dynamic = "force-dynamic";

const HomePage = () => {
  return (
    <main className="w-screen overflow-hidden">
      <Header />
      <Params />
      <Preview />
      {/* @ts-expect-error server components */}
      <Hot />
      <Category />
      <Sidebar />
      <Footer />
    </main>
  );
};

export default HomePage;
