import { JSX } from "react";
import React from "react";
import { FC } from "react";
export type CardBottomType = "profileList" | "counts" | "chart" | "chartGauge" | "barChart" | "heatmapGrid"


type Props = {
    type?: CardBottomType;
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
        }
    };
    chartGauge?: {

        subtitle?: string;
        data?:
        {
            label?: string;
            color?: string;
            count?: number;
        }[]
    }
    barChart?: {
        data?: Record<string, number>,
        colors?: string[]
    }
    heatmapGrid?: {
        HeatmapGrid?: string[][],
        days?: string[],
        percentRanges?: string[]
    }
};


const Content = (props: Props) => {

    const d: Record<CardBottomType, FC<any>> = {
        heatmapGrid: HeatmapGrid,

    }

    const Compents = d[props.type]

    return (
        <Compents {...props} />
    )
}



export const HeatmapGrid = (props: Props) => {
    const days = props.heatmapGrid?.days
    const percentRanges = props.heatmapGrid?.percentRanges
    const heatmapData = props.heatmapGrid?.HeatmapGrid
    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: 'auto repeat(5, 40px)',
                gap: '10px',
                padding: '20px',
                fontFamily: 'Arial, sans-serif',
            }}
        >
            {/* Legend on left side */}
            {heatmapData!.map((row, rowIndex) => (
                <React.Fragment key={rowIndex}>
                    <div style={{ display: 'flex', alignItems: 'center', fontSize: '14px' }}>
                        <div
                            style={{
                                width: '14px',
                                height: '14px',
                                backgroundColor: row[0],
                                borderRadius: '4px',
                                marginRight: '8px',
                            }}
                        />
                        {percentRanges![rowIndex]}
                    </div>

                    {/* Heatmap Row */}
                    {row.map((color, colIndex) => (
                        <div
                            key={colIndex}
                            style={{
                                width: '40px',
                                height: '40px',
                                backgroundColor: color,
                                borderRadius: '12px',
                            }}
                        />
                    ))}
                </React.Fragment>
            ))}

            {/* Empty cell for bottom left */}
            <div></div>

            {/* Day labels */}
            {days!.map((day, i) => (
                <div
                    key={i}
                    style={{ textAlign: 'center', fontSize: '14px', fontWeight: '500', color: '#666' }}
                >
                    {day}
                </div>
            ))}
        </div>
    );
}



export default Content