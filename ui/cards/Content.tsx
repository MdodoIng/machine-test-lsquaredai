"use client";
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
    labels: string;
    data: {
      labels: string;
      data: {
        labels: string;
        count: number;
      }[];
    };
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
  const barMargin = 4; // 2px on each side
  const containerRef = useRef<HTMLDivElement>(null);
  const [totalBars, setTotalBars] = useState(26); // default fallback
  // Usage example
  const dynamicData = {
    annual: 45,
    personal: 165,
    other: 50,
  };

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

  const total = Object.values(data).reduce((sum, val) => sum + val, 0);

  let rawRatios = Object.entries(data).map(([type, value]) => ({
    type,
    raw: value,
    bars: Math.round((value / total) * totalBars),
  }));

  // Correct rounding differences
  const barCountSum = rawRatios.reduce((sum, item) => sum + item.bars, 0);
  const diff = totalBars - barCountSum;
  if (diff !== 0) {
    const sorted = [...rawRatios].sort((a, b) => b.raw - a.raw);
    for (let i = 0; i < Math.abs(diff); i++) {
      sorted[i % sorted.length].bars += Math.sign(diff);
    }
    rawRatios = sorted;
  }

  const colors = {
    annual: "#0074e8",
    personal: "#a3d34c",
    other: "#111111",
  };

  const barWithLabels = rawRatios.map(({ type, raw, bars }) => ({
    type,
    label: `${raw} Employees`,
    bars: Array(bars).fill(type),
  }));

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <div
        ref={containerRef}
        style={{
          display: "flex",
          width: "100%",
          height: "60px",
          position: "relative",
        }}
      >
        {barWithLabels.map((section, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              position: "relative",
              flex: section.bars.length,
              height: "100%",
              gap: `${barMargin}px`,
            }}
          >
            {/* Label above first bar */}
            <div
              style={{
                position: "absolute",
                top: "-25px",
                left: "0",
                fontSize: "14px",
                whiteSpace: "nowrap",
              }}
            >
              {section.type === "other" ? `${data.other} Other` : section.label}
            </div>

            {/* Bars */}
            {section.bars.map((type, idx) => (
              <div
                key={idx}
                style={{
                  width: `${barWidth}px`,
                  height: "100%",
                  backgroundColor: colors[type],
                  borderRadius: "4px",
                }}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div style={{ display: "flex", gap: "20px", marginTop: "30px" }}>
        {Object.entries(colors).map(([key, color]) => (
          <Legend
            key={key}
            color={color}
            label={key.charAt(0).toUpperCase() + key.slice(1)}
          />
        ))}
      </div>
    </div>
  );
};

const Legend = ({ color, label }) => (
  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
    <div
      style={{
        width: "10px",
        height: "10px",
        backgroundColor: color,
        borderRadius: "2px",
      }}
    />
    <span>{label}</span>
  </div>
);

export default Content;
