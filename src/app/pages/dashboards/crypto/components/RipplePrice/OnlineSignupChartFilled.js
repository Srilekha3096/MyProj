import React from 'react';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import Div from "@jumbo/shared/Div";
import { capitalizeFLetter } from "@jumbo/utils";

//todo: add ResponsiveContainer and fix the page reload ResponsiveContainer width issue
const OnlineSignupChartFilled = ({ data, color, shadowColor }) => {
    return (
        <ResponsiveContainer height={120}>
            <LineChart data={data} className={"mx-auto"}>
                <defs>
                    <filter id="shadow" height="200%">
                        <feDropShadow
                            dx="0" dy="5" stdDeviation="8"
                            floodColor={shadowColor ? shadowColor : "#AED6F1 "}
                        />
                    </filter>
                </defs>
                <Tooltip
                    animationEasing={"ease-in-out"}
                    content={({ active, label, payload }) => {
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
                        padding: '5px 8px',
                        fontWeight: 500,
                        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
                    }}
                    cursor={false}
                />
                <CartesianGrid strokeDasharray="6 1 2" horizontal={false} strokeOpacity={0.7} />
                <XAxis dataKey="name" tickLine={false} axisLine={false} fontSize={9} />
                <Line dataKey="count"
                    filter="url(#shadow)"
                    type="monotone"
                    dot={null}
                    strokeWidth={2}
                    stackId="2"
                    stroke={color ? color : "#0062FF"}
                />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default OnlineSignupChartFilled;
