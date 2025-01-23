import React from 'react';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import Div from "@jumbo/shared/Div";
import { capitalizeFLetter } from '@jumbo/utils';

//todo: add ResponsiveContainer and fix the page reload ResponsiveContainer width issue
const ActiveUsersChart = ({ height, data }) => {
    return (
        <ResponsiveContainer height={height ? height : 103}>
            <LineChart data={data} className={"mx-auto"}>
                <CartesianGrid strokeDasharray="6 1 2" horizontal={false} strokeOpacity={0.5} />
                <Tooltip
                    cursor={false}
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
                        backgroundColor: 'rgba(0,0,0,.8)',
                        padding: '5px 5px',
                        borderRadius: 4,
                        overflow: 'hidden',
                        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
                    }}
                />
                <XAxis dataKey="name" tickLine={false} axisLine={false} fontSize={9} />
                <Line dataKey="count" type="monotone" dot={null} strokeWidth={2} stackId="2"
                    stroke="rgb(52, 143, 108)" />

            </LineChart>
        </ResponsiveContainer>
    );
};
/* Todo height prop define */
export default ActiveUsersChart;
