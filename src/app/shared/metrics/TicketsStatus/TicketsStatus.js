import React, { useEffect, useState } from 'react';
import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import { ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts";
import { ticketsStatus } from "./data";
import List from "@mui/material/List";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";
import { BASE_URL } from 'app/services/auth-services';
import axios from 'axios';
import moment from 'moment';

const ListItemInline = styled(ListItem)(({ theme }) => ({
    width: 'auto',
    display: 'inline-flex',
    padding: theme.spacing(0, .5),
}));

const RenderLegend = (props) => {
    const { payload } = props;

    const token = localStorage.getItem("accesstoken");

    const header = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    };

    let userDetails = localStorage.getItem("UserDetails");
    userDetails = JSON.parse(userDetails);
    let companyId = userDetails?.Organization_Id;

    const [listData, setListData] = useState([]);


    // Function to calculate monthly totals
    const calculateMonthlyTotals = (data) => {
        const monthlyTotals = {};

        for (const [month, entries] of Object.entries(data)) {
            let totalQuantity = 0;

            entries.forEach((entry) => {
                totalQuantity += entry?.Transaction_Amount;
            });

            monthlyTotals[month] = totalQuantity;
        }

        return monthlyTotals;
    };

    const monthlyTotals = calculateMonthlyTotals(listData?.month_wise_data || {});

    let chartData = Object.entries(monthlyTotals).map(([month, total]) => ({
        name: moment(month, 'MMMM YYYY').format('MMM YY'),
        count: total,
    }));

    let totalReceivedAmount = 0;
    chartData.forEach((chart) => {
        totalReceivedAmount += chart?.count;
    });

    useEffect(() => {
        const fetchBudgetVsSpendData = async () => {
            const payload = {
                "Region": "",
                "State": "",
                "City": "",
                "Partner_Name": "",
                "Period": [
                    "2024-01-01",
                    "2024-12-31"
                ]
            };
            try {
                const res = await axios.post(`${BASE_URL}/Erpapp/Budgetvsspendoverview/`, payload, header);
                console.log("RRRRRRR", res);
                setListData(res?.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchBudgetVsSpendData();
    }, []);


    return (
        <List disablePadding>
            {
                payload.map((entry, index) => {
                    return (
                        <ListItemInline key={`item-${index}`}>
                            <ListItemIcon sx={{ minWidth: 20 }}>
                                <FiberManualRecordIcon fontSize={"10px"} sx={{ color: entry.color }} />
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    <Typography variant={"body1"} fontSize={"12px"}>{entry.value}</Typography>
                                }
                            />
                        </ListItemInline>
                    )
                })
            }
        </List>
    );
};

const TicketsStatus = () => {
    const { t } = useTranslation();
    return (
        <JumboCardQuick
            title={t("Expense Graph")}
            subheader={t('Category wise Expenses Pie Chart')}
            sx={{ textAlign: 'center' }}
            wrapperSx={{
                pt: 2,
                '&:last-child': {
                    pb: 4.5
                }
            }}
        >
            <ResponsiveContainer width="100%" height={225}>
                <PieChart>
                    <text x="50%" className="h1" y="50%" textAnchor="middle" dominantBaseline="middle" />
                    <Pie data={ticketsStatus} dataKey="value" cx="50%" cy="50%" innerRadius={45} outerRadius={80}
                        fill="#8884d8">
                        {ticketsStatus?.map((item, index) => (
                            <Cell key={index} fill={item.color} />
                        ))}
                    </Pie>
                    <Legend content={RenderLegend} wrapperStyle={{ position: "absolute", bottom: -24 }} />
                </PieChart>
            </ResponsiveContainer>

        </JumboCardQuick>
    );
};

export default TicketsStatus;
