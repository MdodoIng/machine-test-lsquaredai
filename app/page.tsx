import Aside from "@/components/Home/Aside";
import Dashboard from "@/components/Home/Dashboard";
import Layout from "@/components/Layout";

export default function Home() {
  return (
    <Layout className="grid grid-cols-[1fr_400px] min-h-screen ">
      <div className=" px-6 flex flex-col h-full  overflow-y-scroll hide-scrollbar pt-28">
        <Dashboard />
      </div>

      <div className="px-6 h-screen relative z-0">
        <Aside />
      </div>
    </Layout>
  );
}
