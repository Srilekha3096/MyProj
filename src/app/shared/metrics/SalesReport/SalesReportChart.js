import React from 'react';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import Div from "@jumbo/shared/Div";
import { capitalizeFLetter } from "@jumbo/utils";


const SalesReportChart = ({ data }) => {

    console.log("chartData", data)

    return (
        <ResponsiveContainer height={120}>
            <BarChart data={data} margin={{top: 0, right: 0, left: 0, bottom: 0}}>
                <Tooltip
                    animationEasing={"ease-in-out"}
                    content={({ active, label, payload }) => {
                        if (active) {
                            const entry = payload[0] || {};
                            return (
                                <Div sx={{ color: "common.black" }}>
                                    <div style={{
                                        fontSize: 8,
                                        letterSpacing: 1,
                                        textTransform: 'uppercase'
                                    }}>
                                        {capitalizeFLetter(label)}
                                    </div>
                                    <div>{entry?.name}: {entry?.value}</div>
                                </Div>
                            );
                        }
                        return null;
                    }}
                    wrapperStyle={{
                        background: 'rgba(255,255,255,0.9)',
                        borderRadius: 4,
                        padding: '5px 5px',
                        fontWeight: 500,
                        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 1px 5px'
                    }}
                />
                <XAxis dataKey="name" tickLine={false} axisLine={false} fontSize={9} />
                <Bar dataKey="count" fill="#9046EB" maxBarSize={10} minBarSize={1} barSize={4} />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default SalesReportChart;
