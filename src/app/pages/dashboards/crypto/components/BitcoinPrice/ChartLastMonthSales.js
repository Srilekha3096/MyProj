import React from 'react';
import {Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis} from "recharts";
import {capitalizeFLetter} from "@jumbo/utils";
import Div from "@jumbo/shared/Div";

const ChartLastMonthSales = ({data}) => {
    return (
        <ResponsiveContainer height={120}>
            <AreaChart data={data} margin={{top: 0, right: 0, left: 0, bottom: 0}}>
                <defs>
                    <linearGradient id="colorLastMonthSales" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#b29af4"/>
                        <stop offset="95%" stopColor="#7352c7"/>
                    </linearGradient>
                </defs>
                <Tooltip
                    animationEasing={"ease-in-out"}
                    content={({active, label, payload}) => {
                        if (active) {
                            const entry = payload[0] || {};
                            return (
                                <Div sx={{ color: "common.white" }}>
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
                        background: 'rgba(0,0,0,0.8)',
                        borderRadius: 4,
                        padding: '5px 5px',
                        fontWeight: 500,
                        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
                    }}
                    cursor={false}
                />
                <CartesianGrid strokeDasharray="6 1 2" horizontal={false} strokeOpacity={0.7}/>
                <XAxis dataKey="name" tickLine={false} axisLine={false} fontSize={9} />
                <Area type={"monotone"} dataKey="count" strokeWidth={2} stackId="2" stroke="#FFf"
                      fill={"url(#colorLastMonthSales)"} fillOpacity={.7}/>
            </AreaChart>
        </ResponsiveContainer>
    );
};

export default ChartLastMonthSales;
