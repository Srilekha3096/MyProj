import React from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import Div from '@jumbo/shared/Div';
import { capitalizeFLetter } from '@jumbo/utils';

const NewArticlesChart = ({ data }) => {
    return (
        <ResponsiveContainer height={90}>
            <AreaChart data={data} margin={{top: 0, right: 0, left: 0, bottom: 0}}>
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
                        backgroundColor: 'rgba(0,0,0,.8)',
                        padding: '5px 5px',
                        borderRadius: 4,
                        overflow: 'hidden',
                        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
                    }}
                    cursor={false}
                />
                <CartesianGrid strokeDasharray="6 1 2" horizontal={false} strokeOpacity={0.5} />
                <XAxis dataKey="name" tickLine={false} axisLine={false} fontSize={9} />
                <Area
                    dataKey="count"
                    type="monotone"
                    strokeWidth={3}
                    stackId="2"
                    stroke="#FFf"
                    fill="#0DC7B8"
                    fillOpacity={1}
                />
            </AreaChart>
        </ResponsiveContainer>
    );
};

export default NewArticlesChart;
