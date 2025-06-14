import Aside from "@/components/Home/Aside";
import Dashboard from "@/components/Home/Dashboard";
import Layout from "@/components/Layout";

export default function Home() {
  return (
    <Layout className="grid grid-cols-[1fr_400px]  min-h-screen pt-28 ">
      <div className=" px-6 flex flex-col h-full  overflow-y-scroll hide-scrollbar ">
        <Dashboard />
      </div>

      <div className=" px-6 h-full relative z-0">
        <Aside />
      </div>
    </Layout>
  );
}
