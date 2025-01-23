import JumboContentLayoutMain from '@jumbo/components/JumboContentLayout/JumboContentLayoutMain';
import Div from '@jumbo/shared/Div';
import { Grid, Typography } from '@mui/material';
import React from 'react';
import data from './data';
import { Area, Bar, BarChart, CartesianGrid, Cell, ComposedChart, Legend, Line, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useTranslation } from 'react-i18next';
import { newSubscribers } from 'app/shared/metrics/NewSubscribers/data';


const datas = [
    { name: 'Earning', value: 18756, color: '#00BFFF' },
    { name: 'Pending', value: 5599, color: 'green' },
];


const MonthlyProfit = () => {
    const { t } = useTranslation();
    return (
        <>
            <JumboContentLayoutMain>
                <br /><br />
                <Typography variant='h3'>Monthly Profit and Loss Statement</Typography>
                <br /><br /><br />
                <Div className='row'>
                    <Div className='col-4'>
                        <br /><br /><br /><br />
                        <ResponsiveContainer width="95%" height={350}>
                            <ComposedChart layout="vertical" data={data} margin={{ top: 0, right: 0, left: 10, bottom: 0 }}>
                                <XAxis type="number" />
                                <YAxis dataKey="name" type="category" />
                                <Tooltip labelStyle={{ color: 'black' }} itemStyle={{ color: 'black' }} cursor={false} />
                                <Legend />
                                <CartesianGrid stroke="#f5f5f5" />
                                <Bar dataKey="pv" barSize={20} fill={"#1e88e5"} />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </Div>
                    <Div className='col-8'>
                        <br /><br /><br />
                        <Grid container columnSpacing={6}>
                            <Grid item xs={3}>
                                <div>
                                    <Typography variant={"h3"} color={"common.black"}>Total Revenue</Typography>
                                    <Typography variant={"h5"} color={"common.black"}
                                        mb={0}>{t('63,500.00')}</Typography>
                                </div>
                                <div>
                                    <ResponsiveContainer height={100}>
                                        <BarChart data={newSubscribers} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                                            <Tooltip
                                                cursor={false}
                                                content={({ active, label, payload }) => {
                                                    return active ? (
                                                        <Div sx={{ color: "common.white" }}>
                                                            {payload.map((row, index) => (
                                                                <div key={index}>{`${label}: ${row.value} Subscribers`}</div>
                                                            ))}
                                                        </Div>
                                                    ) : null;
                                                }}
                                                wrapperStyle={{
                                                    backgroundColor: 'rgba(0,0,0,.8)',
                                                    padding: '5px 8px',
                                                    borderRadius: 4,
                                                    overflow: 'hidden',
                                                    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
                                                }}
                                            />
                                            <XAxis dataKey="month" color='white' />
                                            <Bar dataKey="count" stackId="a" fill="green" barSize={10} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </Grid>
                            <Grid item xs={3}>
                                <div>
                                    <Typography variant={"h3"} color={"common.black"}>Cost of Goods Sold</Typography>
                                    <Typography variant={"h5"} color={"common.black"}
                                        mb={0}>{t('63,500.00')}</Typography>
                                </div>
                                <div>
                                    <ResponsiveContainer height={100}>
                                        <BarChart data={newSubscribers} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                                            <Tooltip
                                                cursor={false}
                                                content={({ active, label, payload }) => {
                                                    return active ? (
                                                        <Div sx={{ color: "common.white" }}>
                                                            {payload.map((row, index) => (
                                                                <div key={index}>{`${label}: ${row.value} Subscribers`}</div>
                                                            ))}
                                                        </Div>
                                                    ) : null;
                                                }}
                                                wrapperStyle={{
                                                    backgroundColor: 'rgba(0,0,0,.8)',
                                                    padding: '5px 8px',
                                                    borderRadius: 4,
                                                    overflow: 'hidden',
                                                    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
                                                }}
                                            />
                                            <XAxis dataKey="month" color='white' />
                                            <Bar dataKey="count" stackId="a" fill="green" barSize={10} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </Grid>
                            <Grid item xs={3}>
                                <div>
                                    <Typography variant={"h3"} color={"common.black"}>Gross Profit</Typography>
                                    <Typography variant={"h5"} color={"common.black"}
                                        mb={0}>{t('63,500.00')}</Typography>
                                </div>
                                <div>
                                    <ResponsiveContainer height={100}>
                                        <BarChart data={newSubscribers} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                                            <Tooltip
                                                cursor={false}
                                                content={({ active, label, payload }) => {
                                                    return active ? (
                                                        <Div sx={{ color: "common.white" }}>
                                                            {payload.map((row, index) => (
                                                                <div key={index}>{`${label}: ${row.value} Subscribers`}</div>
                                                            ))}
                                                        </Div>
                                                    ) : null;
                                                }}
                                                wrapperStyle={{
                                                    backgroundColor: 'rgba(0,0,0,.8)',
                                                    padding: '5px 8px',
                                                    borderRadius: 4,
                                                    overflow: 'hidden',
                                                    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
                                                }}
                                            />
                                            <XAxis dataKey="month" color='white' />
                                            <Bar dataKey="count" stackId="a" fill="green" barSize={10} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </Grid>
                            <Grid item xs={3}>
                                <div>
                                    <Typography variant={"h3"} color={"common.black"}>Total Operating Exp</Typography>
                                    <Typography variant={"h5"} color={"common.black"}
                                        mb={0}>{t('63,500.00')}</Typography>
                                </div>
                                <div>
                                    <ResponsiveContainer height={100}>
                                        <BarChart data={newSubscribers} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                                            <Tooltip
                                                cursor={false}
                                                content={({ active, label, payload }) => {
                                                    return active ? (
                                                        <Div sx={{ color: "common.white" }}>
                                                            {payload.map((row, index) => (
                                                                <div key={index}>{`${label}: ${row.value} Subscribers`}</div>
                                                            ))}
                                                        </Div>
                                                    ) : null;
                                                }}
                                                wrapperStyle={{
                                                    backgroundColor: 'rgba(0,0,0,.8)',
                                                    padding: '5px 8px',
                                                    borderRadius: 4,
                                                    overflow: 'hidden',
                                                    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
                                                }}
                                            />
                                            <XAxis dataKey="month" color='white' />
                                            <Bar dataKey="count" stackId="a" fill="green" barSize={10} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </Grid>

                        </Grid>

                        <br />
                        <br />
                        <Grid container columnSpacing={6}>
                            <Grid item xs={3}>
                                <div>
                                    <Typography variant={"h3"} color={"common.black"}>Operating Profit</Typography>
                                    <Typography variant={"h5"} color={"common.black"}
                                        mb={0}>{t('63,500.00')}</Typography>
                                </div>
                                <div>
                                    <ResponsiveContainer height={100}>
                                        <BarChart data={newSubscribers} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                                            <Tooltip
                                                cursor={false}
                                                content={({ active, label, payload }) => {
                                                    return active ? (
                                                        <Div sx={{ color: "common.white" }}>
                                                            {payload.map((row, index) => (
                                                                <div key={index}>{`${label}: ${row.value} Subscribers`}</div>
                                                            ))}
                                                        </Div>
                                                    ) : null;
                                                }}
                                                wrapperStyle={{
                                                    backgroundColor: 'rgba(0,0,0,.8)',
                                                    padding: '5px 8px',
                                                    borderRadius: 4,
                                                    overflow: 'hidden',
                                                    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
                                                }}
                                            />
                                            <XAxis dataKey="month" color='white' />
                                            <Bar dataKey="count" stackId="a" fill="red" barSize={10} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </Grid>
                            <Grid item xs={3}>
                                <div>
                                    <Typography variant={"h3"} color={"common.black"}>Partner Earnings</Typography>
                                    <Typography variant={"h5"} color={"common.black"}
                                        mb={0}>{t('63,500.00')}</Typography>
                                </div>
                                <div>
                                    <ResponsiveContainer height={100}>
                                        <BarChart data={newSubscribers} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                                            <Tooltip
                                                cursor={false}
                                                content={({ active, label, payload }) => {
                                                    return active ? (
                                                        <Div sx={{ color: "common.white" }}>
                                                            {payload.map((row, index) => (
                                                                <div key={index}>{`${label}: ${row.value} Subscribers`}</div>
                                                            ))}
                                                        </Div>
                                                    ) : null;
                                                }}
                                                wrapperStyle={{
                                                    backgroundColor: 'rgba(0,0,0,.8)',
                                                    padding: '5px 8px',
                                                    borderRadius: 4,
                                                    overflow: 'hidden',
                                                    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
                                                }}
                                            />
                                            <XAxis dataKey="month" color='white' />
                                            <Bar dataKey="count" stackId="a" fill="red" barSize={10} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </Grid>
                            <Grid item xs={3}>
                                <div>
                                    <Typography variant={"h3"} color={"common.black"}>% of Revenue</Typography>
                                    <Typography variant={"h5"} color={"common.black"}
                                        mb={0}>{t('63,500.00')}</Typography>
                                </div>
                                <div>
                                    <Div sx={{ mt: 0.5, mb: 1.5 }}>
                                        <ResponsiveContainer height={90}>
                                            <PieChart>
                                                <text x="50%" fontSize={16} y="50%" textAnchor="middle" dominantBaseline="middle" fill="#000000">
                                                    1800
                                                </text>
                                                <Pie data={datas} dataKey="value" cx="50%" cy="50%" innerRadius={36} outerRadius={44} fill="green" >
                                                    {
                                                        datas.map((entry, index) => (
                                                            <Cell key={index} fill={entry.color} />
                                                        ))
                                                    }
                                                </Pie>
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </Div>
                                    <Div>
                                        <Typography variant={"h4"} textAlign={"center"} color={"common.black"}>65,300.00</Typography>
                                        <Typography
                                            variant={"h5"}
                                            color={"common.black"}
                                            mb={0}
                                            textAlign={"center"}
                                            sx={{ whiteSpace: 'nowrap' }}
                                        >
                                            {t('BUDGET')}
                                        </Typography>
                                    </Div>
                                </div>
                            </Grid>
                            <Grid item xs={3}>
                                <div>
                                    <Typography variant={"h3"} color={"common.black"}>% of Expense</Typography>
                                    <Typography variant={"h5"} color={"common.black"}
                                        mb={0}>{t('63,500.00')}</Typography>
                                </div>
                                <div>
                                    <Div sx={{ mt: 0.5, mb: 1.5 }}>
                                        <ResponsiveContainer height={90}>
                                            <PieChart>
                                                <text x="50%" fontSize={16} y="50%" textAnchor="middle" dominantBaseline="middle" fill="#000000">
                                                    1800
                                                </text>
                                                <Pie data={datas} dataKey="value" cx="50%" cy="50%" innerRadius={36} outerRadius={44} fill="green" >
                                                    {
                                                        datas.map((entry, index) => (
                                                            <Cell key={index} fill={entry.color} />
                                                        ))
                                                    }
                                                </Pie>
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </Div>
                                    <Div>
                                        <Typography variant={"h4"} textAlign={"center"} color={"common.black"}>65,300.00</Typography>
                                        <Typography
                                            variant={"h5"}
                                            color={"common.black"}
                                            mb={0}
                                            textAlign={"center"}
                                            sx={{ whiteSpace: 'nowrap' }}
                                        >
                                            {t('BUDGET')}
                                        </Typography>
                                    </Div>
                                </div>
                            </Grid>
                        </Grid>
                    </Div>
                </Div>
            </JumboContentLayoutMain>
        </>
    )
}

export default MonthlyProfit;