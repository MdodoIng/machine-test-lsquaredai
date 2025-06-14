import React from "react";
import Head from "./Head";
import Card from "@/ui/cards";

const Dashboard = () => {
  return (
    <div className="flex flex-col w-full h-min pb-20 gap-6">
      <Head />

      <div className="grid w-full grid-cols-[1fr_1fr_minmax(0,1.4fr)]">
        <div className="col-span-3 w-full bg-off-white grid grid-cols-subgrid gap-6 rounded-3xl">
          <div className="col-span-2"></div>

          <Card
            head={{
              hidden: true,
            }}
            content={{
              type: "heatmapGrid",
              heatmapGrid: {
                percentRanges: ["1%", "2%", "3%", "4%", ">5%"],
                days: ["M", "T", "W", "T", "F"],
                HeatmapGrid: [
                  ["#b3cfff", "#85aefc", "#5e92f3", "#4b85f2", "#326de2"],
                  ["#4b85f2", "#6b9df6", "#85aefc", "#4b85f2", "#5e92f3"],
                  ["#3b76f0", "#245ed9", "#2442e5", "#3b76f0", "#5e92f3"],
                  ["#5e92f3", "#5e92f3", "#4b85f2", "#c8f55b", "#e8ebf7"],
                  ["#e8ebf7", "#e8ebf7", "#e8ebf7", "#e8ebf7", "#e8ebf7"],
                ],
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
