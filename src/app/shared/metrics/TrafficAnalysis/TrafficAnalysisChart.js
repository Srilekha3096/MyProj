import React from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import Div from "@jumbo/shared/Div";
import { capitalizeFLetter } from '@jumbo/utils';



const TrafficAnalysisChart = ({ data, TotalSalesTarget, TotalReceivedAmount }) => {
    return (
        <Div sx={{ mb: 2 }}>
            <ResponsiveContainer height={214}>
                <PieChart>
                    <defs>
                        <filter id="f1" x="0" y="0" width="150%" height="150%">
                            <feGaussianBlur in="SourceAlpha" stdDeviation="4" />
                            <feOffset dx="2" dy="4" />
                            <feMerge>
                                <feMergeNode />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>
                    <Pie
                        data={data}
                        color="#000000"
                        dataKey="Actual"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        isAnimationActive={true}
                        outerRadius={95}
                        fill="#8884d8"
                        strokeWidth={0}
                    >
                        {data?.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry?.colors[index % entry?.colors?.length]}
                                strokeWidth={8}
                            />
                        ))}
                    </Pie>
                    <Tooltip
                        content={({ active, label, payload }) => {
                            if (active) {
                                const entry = payload[0] || {};
                                return (
                                    <Div sx={{ color: "common.black" }}>
                                        <div>TotalSalesTarget : {TotalSalesTarget}</div>
                                        {/* <div style={{
                                            fontSize: 8,
                                            letterSpacing: 1,
                                            textTransform: 'uppercase'
                                        }}>
                                            {capitalizeFLetter(entry?.name)}
                                        </div> */}
                                        <div>{entry?.dataKey}: {TotalReceivedAmount}</div>
                                        {/* <div>{TotalReceivedAmount}</div> */}
                                    </Div>
                                );
                            }
                            return null;
                        }} />
                </PieChart>
            </ResponsiveContainer>
        </Div>
    );
};

export default TrafficAnalysisChart;
