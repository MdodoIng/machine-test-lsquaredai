"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import { JSX, useEffect, useRef, useState } from "react";
import React from "react";
import { FC } from "react";
import { twMerge } from "tailwind-merge";
import GaugeChart from "react-gauge-chart";
import Image from "next/image";
export type CardBottomType =
  | "profileList"
  | "counts"
  | "chart"
  | "chartGauge"
  | "barChart"
  | "heatmapGrid"
  | "averageRating";

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
  profileList?: {
    profiles?: {
      name: string;
      role: string;
      rating: number;
      status: string;
      avatar: string;
      roleColor: string;
    }[];
  };

  averageRating?: {
    data?: {
      label: string;
      count: number;
      color: string;
    }[];
  };
};

const Content = (props: Props) => {
  const d: Record<CardBottomType, FC<any>> = {
    heatmapGrid: HeatmapGrid,
    barChart: BarChart,
    counts: Counts,
    chart: Chart,
    chartGauge: ChartGauge,
    profileList: ProfileList,
    averageRating: AverageRating,
  };

  const Compents = d[props.type!];

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
      className={twMerge("grid sm:gap-2 gap-1", props.className)}
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
              className="sm:rounded-xl rounded-md aspect-square w-full"
            />
          ))}
        </React.Fragment>
      ))}

      <div></div>

      {days!.map((day, i) => (
        <div
          key={i}
          className="text-off-black sm:text-sm text-xs font-medium text-center"
        >
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
            <div className="absolute -top-[25px] left-0 sm:text-sm text-xs z-10 overflow-hidden w-full whitespace-nowrap">
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

      <div className="flex sm:gap-5 gap-3 mt-7 flex-wrap">
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
        "w-full flex items-end justify-between sm:gap-10 gap-6 overflow-hidden",
        props.className,
      )}
    >
      <div className="flex flex-col gap-1">
        <h3 className="text-black md:text-4xl text-3xl font-semibold">
          {props.counts?.title}
        </h3>
        <p className="text-off-black/70 text-sm">{props.counts?.subtitle}</p>
      </div>
      {props.counts?.numbersList ? (
        <div
          className={`flex items-center sm:gap-5 gap-4 sm:text-2xl text-lg  `}
        >
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
          className={`flex items-center gap-2 sm:text-2xl text-lg  font-semibold" ${props.counts?.increment ? "text-green-500" : "text-red-500"}`}
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
      <div className="flex items-end justify-start h-52 sm:space-x-6 space-x-4 overflow-x-scroll hide-scrollbar">
        {props.chart?.data!.map((dept, i) => {
          const heightPercent = (dept.count! / maxCount) * 100;

          return (
            <div
              key={i}
              className="flex flex-col items-center justify-end group h-full relative sm:w-14 w-10 shrink-0"
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
              <div className="mt-2 text-xs text-center capitalize text-off-black/70 z-10 w-full overflow-hidden">
                {dept.labels}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const ChartGauge = (props: Props) => {
  const total = props.chartGauge?.data?.reduce((sum, d) => sum + d.count!, 0);

  const dataWithPercent = props.chartGauge?.data?.map((d) => ({
    ...d,
    percent: ((d.count! / total!) * 100).toFixed(1),
  }));
  const arcsLength = props.chartGauge?.data?.map((d) => d.count! / total!);
  const colors: any = props.chartGauge?.data?.map((d) => d.color);

  return (
    <div className={twMerge("w-full text-center", props.className)}>
      <GaugeChart
        id="employee-gauge"
        nrOfLevels={props.chartGauge?.data?.length}
        arcsLength={arcsLength}
        colors={colors}
        percent={1}
        arcWidth={0.35}
        arcPadding={0.02}
        cornerRadius={6}
        textColor="transparent"
        needleColor="transparent"
        needleBaseColor="transparent"
        hideText
        animate={false}
      />

      <div className="-mt-10">
        <div className="sm:text-3xl text-2xl font-bold">{total}</div>
        <div className="text-off-black/70 text-sm">Total Employees</div>
      </div>

      <div className="flex justify-around mt-4 sm:text-sm text-xs flex-wrap">
        {dataWithPercent!.map((item, index) => (
          <div
            key={index}
            className="flex items-baseline text-start text-off-black/70 space-x-1"
          >
            <span
              className="size-2.5 rounded"
              style={{ backgroundColor: item.color }}
            />
            <span>
              {item.label}
              <br />
              <span className="font-semibold text-off-black">
                {item.percent}%
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const ProfileList = (props: Props) => {
  return (
    <div
      className={twMerge(
        "w-full text-center gap-6 flex flex-col",
        props.className,
      )}
    >
      {props.profileList?.profiles!.map((p, i) => (
        <div
          key={i}
          className="grid grid-cols-[40px_minmax(0,1fr)_minmax(auto,110px)] gap-4 items-center"
        >
          <Image
            src={p.avatar}
            alt={p.name}
            width={40}
            height={40}
            className="size-10 aspect-square  rounded-full object-cover mr-4"
          />
          <div className="flex-1 flex-col flex text-start items-start justify-start">
            <div className="sm:text-sm text-xs font-semibold text-gray-800">
              {p.name}
            </div>
            <div className={`sm:text-sm text-sm ${p.roleColor}`}>{p.role}</div>
          </div>
          <div className="flex items-center gap-1 text-sm mr-auto">
            <span className="text-yellow-500 text-base">★</span>
            <span className="font-semibold">{p.rating}</span>&nbsp;
            <span className="text-gray-500">{p.status}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

const AverageRating = (props: Props) => {
  const ratingWeights = {
    Excellent: 5,
    Good: 4,
    Fair: 3,
    Improved: 2,
  };

  const total = props.averageRating?.data!.reduce(
    (sum, item) => sum + item.count,
    0,
  );

  const weightedSum = props.averageRating?.data!.reduce((sum, item) => {
    // @ts-ignore
    const score = ratingWeights[item.label] || 0;
    return sum + item.count * score;
  }, 0);

  const averageRating = (weightedSum! / total!).toFixed(1);

  const bars = props.averageRating?.data!.map((item) => ({
    ...item,
    percent: ((item.count / total!) * 100).toFixed(1),
    flex: item.count / total!,
  }));

  return (
    <div className={twMerge("w-full flex-col", props.className)}>
      <div className="flex items-center sm:text-2xl text-xl font-semibold">
        <span className="text-orange-500">★</span>
        <span className="sm:text-5xl text-4xl ml-1 mr-4">{averageRating}</span>
        <span className="text-gray-400 sm:text-sm text-xs font-normal">
          Average <br /> rating
        </span>
      </div>

      <div className="flex w-full  mt-6 gap-1">
        {bars!.map((bar, i) => (
          <div
            key={i}
            style={{
              flex: bar.flex,
            }}
            className="flex flex-col max-sm:text-xs justify-start gap-2 font-semibold"
          >
            <span>{bar.percent}% </span>
            <div
              className="h-4 rounded-full overflow-hidden "
              style={{
                backgroundColor: bar.color,
              }}
            />
          </div>
        ))}
      </div>

      <div className="flex justify-between text-sm flex-wrap mt-3">
        {bars!.map((bar, i) => (
          <div key={i} className="flex items-center space-x-1 mr-2 mt-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: bar.color }}
            />
            <span className="text-off-black/70">{bar.label}</span>
          </div>
        ))}
      </div>
      <div className="text-xs text-off-black/70 flex items-center space-x-2 pt-4">
        <span className="text-lg leading-none">ⓘ</span>
        <p>
          Highlight employees needing improvement with suggestions for training
          or mentoring
        </p>
      </div>
    </div>
  );
};
export default Content;
