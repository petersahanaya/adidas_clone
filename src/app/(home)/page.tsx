import Sidebar from "@/components/sidebar/Sidebar";
import Header from "../homepage/header/Header";
import Preview from "../homepage/preview/Preview";
import Hot from "./hot/Hot";
import Category from "./category/Category";
import ClientOnly from "@/components/clientOnly/ClientOnly";

export const metadata = {
  title: "adidas",
  description: "",
};

const HomePage = () => {
  return (
    <main className="w-screen pb-10 overflow-hidden">
      <Header />
      <ClientOnly>
        <Preview />
      </ClientOnly>
      {/* @ts-expect-error server components */}
      <Hot />
      <Category />
      <Sidebar />
    </main>
  );
};

export default HomePage;
