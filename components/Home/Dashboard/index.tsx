import React from "react";
import Head from "./Head";
import Card from "@/ui/cards";
import { Icon } from "@iconify/react/dist/iconify.js";

const Dashboard = () => {
  return (
    <div className="flex flex-col w-full h-min pb-20 gap-6">
      <Head />

      <div className="grid w-full grid-cols-[1fr_1fr_minmax(0,1.4fr)]">
        <Card
          head={{
            subtitle: "Head Count",
            right: {
              icon: "lsicon:user-outline",
            },
          }}
          content={{
            type: "counts",
            counts: {
              increment: true,
              title: "327",
              subtitle: "New Hires",
              number: "+47%",
            },
          }}
        />

        <div className="col-span-3 p-4 w-full bg-off-white grid grid-cols-subgrid gap-6 rounded-3xl">
          <Card
            className="col-span-2 bg-white"
            head={{
              subtitle: "Identify employees with absences",
              title: "Absenteeism",
              right: {
                children: (
                  <p className="text-off-black/70 flex items-center gap-2">
                    <Icon icon="proicons:info" className="text-xl shrink-0" />
                    Monitor the percentage, total and trends of employee
                    absences
                  </p>
                ),
              },
            }}
            content={{
              className: "mt-auto pt-6",
              type: "barChart",
              barChart: {
                colors: ["#0074e8", "#a3d34c", "#111111"],
                data: {
                  annual: 45,
                  personal: 165,
                  other: 50,
                },
              },
            }}
          />

          <Card
            head={{
              hidden: false,
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
