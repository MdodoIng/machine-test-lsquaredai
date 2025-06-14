"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import { JSX, useEffect, useRef, useState } from "react";
import React from "react";
import { FC } from "react";
import { twMerge } from "tailwind-merge";
export type CardBottomType =
  | "profileList"
  | "counts"
  | "chart"
  | "chartGauge"
  | "barChart"
  | "heatmapGrid";

type Props = {
  type?: CardBottomType;
  className?: string;
  counts?: {
    number?: number | string;
    increment?: boolean;
    title?: string;
    subtitle?: string;
    numbersList?: {
      title?: string;
      count?: number | string;
      color?: string;
    }[];
  };
  chart?: {
    labels?: string;
    data?: {
      labels?: string;
      count?: number;
    }[];
  };
  chartGauge?: {
    subtitle?: string;
    data?: {
      label?: string;
      color?: string;
      count?: number;
    }[];
  };
  barChart?: {
    data?: Record<string, number>;
    colors?: string[];
  };
  heatmapGrid?: {
    HeatmapGrid?: string[][];
    days?: string[];
    percentRanges?: string[];
  };
};

const Content = (props: Props) => {
  const d: Record<CardBottomType, FC<any>> = {
    heatmapGrid: HeatmapGrid,
    barChart: BarChart,
    counts: Counts,
    chart: Chart,
  };

  const Compents = d[props.type];

  return <Compents {...props} />;
};

export const HeatmapGrid = (props: Props) => {
  const days = props.heatmapGrid?.days;
  const percentRanges = props.heatmapGrid?.percentRanges;
  const heatmapData = props.heatmapGrid?.HeatmapGrid;
  return (
    <div
      style={{
        gridTemplateColumns: `auto repeat(${heatmapData!.length}, minmax(0,1fr))`,
      }}
      className={twMerge("grid gap-2", props.className)}
    >
      {heatmapData!.map((row, rowIndex) => (
        <React.Fragment key={rowIndex}>
          <div className="flex items-center text-sm">
            <div
              style={{
                backgroundColor: row[0],
              }}
              className="size-3.5 rounded mr-3 text-off-black"
            />
            {percentRanges![rowIndex]}
          </div>
          {row.map((color, colIndex) => (
            <div
              key={colIndex}
              style={{
                backgroundColor: color,
              }}
              className="rounded-xl aspect-square w-full"
            />
          ))}
        </React.Fragment>
      ))}

      <div></div>

      {days!.map((day, i) => (
        <div key={i} className="text-off-black text-sm font-medium text-center">
          {day}
        </div>
      ))}
    </div>
  );
};

const BarChart = (props: Props) => {
  const barWidth = 10;
  const barMargin = 6;
  const containerRef = useRef<HTMLDivElement>(null);
  const [totalBars, setTotalBars] = useState(26);
  const data = props.barChart?.data;

  useEffect(() => {
    const updateBars = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        const calculatedBars = Math.floor(width / (barWidth + barMargin));
        setTotalBars(calculatedBars);
      }
    };

    updateBars();

    window.addEventListener("resize", updateBars);

    return () => {
      window.removeEventListener("resize", updateBars);
    };
  }, []);

  const total = Object.values(data!).reduce((sum, val) => sum + val, 0);

  let rawRatios = Object.entries(data!).map(([type, value]) => ({
    type,
    raw: value,
    bars: Math.round((value / total) * totalBars),
  }));

  const barCountSum = rawRatios.reduce((sum, item) => sum + item.bars, 0);
  const diff = totalBars - barCountSum;
  if (diff !== 0) {
    const sorted = [...rawRatios].sort((a, b) => b.raw - a.raw);
    for (let i = 0; i < Math.abs(diff); i++) {
      sorted[i % sorted.length].bars += Math.sign(diff);
    }
    rawRatios = sorted;
  }

  const colors = props.barChart?.colors;

  const barWithLabels = rawRatios.map(({ type, raw, bars }) => ({
    type,
    raw: raw,
    label: `${raw} ${type}`,
    bars: Array(bars).fill(type),
  }));

  return (
    <div className={twMerge("w-full", props.className)}>
      <div
        style={{
          gap: `${barMargin}px`,
        }}
        ref={containerRef}
        className="relative flex w-full h-24"
      >
        {barWithLabels.map((section, i) => (
          <div
            key={i}
            style={{
              gap: `${barMargin}px`,
            }}
            className="flex relative h-full"
          >
            <div className="absolute -top-[25px] left-0 text-sm whitespace-nowrap">
              <b>{section.raw}</b> {section.type}
            </div>

            {section.bars.map((type, idx) => (
              <div
                key={idx}
                style={{
                  width: `${barWidth}px`,

                  backgroundColor: colors![i],
                }}
                className="h-full rounded-full"
              />
            ))}
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: "20px", marginTop: "30px" }}>
        {barWithLabels.map((item, i) => (
          <div key={i} className="flex capitalize items-center gap-1.5">
            <div
              style={{
                backgroundColor: colors![i],
              }}
              className="rounded-full size-2.5"
            />
            <span>{item.type}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const Counts = (props: Props) => {
  return (
    <div
      className={twMerge(
        "w-full flex items-end justify-between gap-10",
        props.className,
      )}
    >
      <div className="flex flex-col gap-1">
        <h3 className="text-black text-4xl font-semibold">
          {props.counts?.title}
        </h3>
        <p className="text-off-black/70 text-sm">{props.counts?.subtitle}</p>
      </div>
      {props.counts?.numbersList ? (
        <div className={`flex items-center gap-5 text-2xl  `}>
          {props.counts.numbersList.map((item, idx) => (
            <div key={idx}>
              <h4
                style={{
                  color: item.color,
                }}
              >
                {item.count}
              </h4>
              <p className="text-sm text-off-black/70">{item.title}</p>
            </div>
          ))}
        </div>
      ) : (
        <div
          className={`flex items-center gap-2 text-2xl  font-semibold" ${props.counts?.increment ? "text-green-500" : "text-red-500"}`}
        >
          <span className="">{props.counts?.number}</span>
          <Icon
            icon={
              props.counts?.increment ? "typcn:arrow-up" : "typcn:arrow-down"
            }
            className={`h-full aspect-square rounded-full text-white p-0.5 flex items-center justify-center ${props.counts?.increment ? "bg-green-500" : "bg-red-500"}`}
          />
        </div>
      )}
    </div>
  );
};

const Chart = (props: Props) => {
  // @ts-ignore
  const maxCount = Math.max(...props.chart?.data!.map((d) => d.count));

  return (
    <div className={twMerge("w-full", props.className)}>
      <div className="flex items-end justify-start h-52 space-x-6 overflow-x-scroll hide-scrollbar">
        {props.chart?.data!.map((dept, i) => {
          const heightPercent = (dept.count! / maxCount) * 100;

          return (
            <div
              key={i}
              className="flex flex-col items-center justify-end group h-full relative w-14 shrink-0"
            >
              {/* Tooltip */}
              <div className="absolute flex w-max text-xs top-0 bg-black text-white px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition">
                {dept.count} {props.chart?.labels}
                <div className="absolute w-2 h-2 bg-black rotate-45 -bottom-1 left-1/2 -translate-x-1/2" />
              </div>

              {/* Bar */}
              <div className="flex h-full items-end bg-off-gray w-full rounded-full">
                <div
                  className={`bg-black group-hover:bg-primary duration-300 w-full  rounded-full`}
                  style={{
                    height: `${heightPercent - maxCount / 4}%`,
                  }}
                ></div>
              </div>

              {/* Label */}
              <div className="mt-2 text-xs text-center capitalize text-off-black/70">
                {dept.labels}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Content;
