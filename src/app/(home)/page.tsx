import Sidebar from "@/components/sidebar/Sidebar";
import Header from "../homepage/header/Header";
import Preview from "../homepage/preview/Preview";
import Hot from "./hot/Hot";
import Category from "./category/Category";
import Params from "./searchParams/Params";

export const metadata = {
  title: "Adidas",
};

export const fetchCache = "force-no-store";
export const dynamic = "force-dynamic";

const HomePage = () => {
  return (
    <main className="w-screen pb-10 overflow-hidden">
      <Header />
      <Params />
      <Preview />
      {/* @ts-expect-error server components */}
      <Hot />
      <Category />
      <Sidebar />
    </main>
  );
};

export default HomePage;
