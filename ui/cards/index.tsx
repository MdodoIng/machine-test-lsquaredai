import React from "react";
import { twMerge } from "tailwind-merge";
import Head from "./Head";
import Content, { CardBottomType } from "./Content";

type Props = {
  className?: string;
  head?: {
    title?: string;
    subtitle?: string;
    right?: {
      className?: string;
      children?: React.ReactNode;
      linkTo?: string;
      linkToClass?: string;
      icon?: string;
    };
    hidden?: boolean;
  };
  content?: {
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
};

const Card = (props: Props) => {
  return (
    <div
      className={twMerge(
        "bg-off-white rounded-3xl p-5 flex flex-col",
        props.className,
      )}
    >
      {props.head?.hidden !== false && <Head {...props.head} />}

      <Content {...props.content} />
    </div>
  );
};

export default Card;
