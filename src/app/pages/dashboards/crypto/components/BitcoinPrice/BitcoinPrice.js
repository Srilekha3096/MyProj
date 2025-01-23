import React, { useEffect, useState } from 'react';
import { Typography } from "@mui/material";
import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import { useTranslation } from "react-i18next";
import { TrendingUp } from "@mui/icons-material";
import ChartLastMonthSales from "./ChartLastMonthSales";
import moment from 'moment';
import { FormatFloatValue, formatIndianNumber } from 'app/shared/ReuseComponents/DateFormatter';
import Div from '@jumbo/shared/Div';
import axios from 'axios';
import { BASE_URL } from 'app/services/auth-services';

const data = {
    "month_wise_data": {
        "August 2023": [],
        "September 2023": [],
        "October 2023": [],
        "November 2023": [],
        "December 2023": [],
        "January 2024": [],
        "February 2024": [
            {
                "id": 16,
                "SalesOrder_Id": "SOR000000002",
                "Parking_Notes": "Erode",
                "SalesOrderDate": "2024-02-29",
                "Service_Location": "Perungudi",
                "SalesOrder_Type": "OneTime",
                "Card_expiry_date": "2024-02-29",
                "Recurring_EndDate": "2024-02-29",
                "Prefered_Date": "2024-02-29",
                "Prefered_Time": "11:13:12",
                "Amount_Paid": 998.0,
                "Payment_Method": "Online",
                "DebitCardNo": 7845,
                "Card_Cvv": 135,
                "Assignedservice_Personal": "Prakash",
                "Order_Attended": true,
                "Order_Cancelled": false,
                "Booking_Details": "",
                "Card_Holder_Name": "",
                "Completed_flg": false,
                "Is_Deleted": false,
                "Created_Date": "2024-02-29",
                "Updated_Date": "2024-02-29",
                "Company_Id": 1,
                "Partner_Id": 2,
                "Customer_Id": 3,
                "Service_Id": 20,
                "Created_By": 3,
                "Updated_By": 3
            }
        ],
        "March 2024": [
            {
                "id": 18,
                "SalesOrder_Id": "SOR000000004",
                "Parking_Notes": "Greeta towers.",
                "SalesOrderDate": "2024-03-01",
                "Service_Location": "Chennai",
                "SalesOrder_Type": "OneTime",
                "Card_expiry_date": "2024-03-01",
                "Recurring_EndDate": "2024-03-01",
                "Prefered_Date": "2024-03-01",
                "Prefered_Time": "05:28:05",
                "Amount_Paid": 450.0,
                "Payment_Method": "Online",
                "DebitCardNo": 1542,
                "Card_Cvv": 324,
                "Assignedservice_Personal": "Prakash",
                "Order_Attended": true,
                "Order_Cancelled": false,
                "Booking_Details": "",
                "Card_Holder_Name": "",
                "Completed_flg": false,
                "Is_Deleted": false,
                "Created_Date": "2024-03-01",
                "Updated_Date": "2024-03-01",
                "Company_Id": 1,
                "Partner_Id": 2,
                "Customer_Id": 3,
                "Service_Id": 20,
                "Created_By": 3,
                "Updated_By": 3
            },
            {
                "id": 19,
                "SalesOrder_Id": "SOR000000005",
                "Parking_Notes": "Greeta towers.",
                "SalesOrderDate": "2024-03-01",
                "Service_Location": "Chennai",
                "SalesOrder_Type": "OneTime",
                "Card_expiry_date": "2024-03-01",
                "Recurring_EndDate": "2024-03-01",
                "Prefered_Date": "2024-03-01",
                "Prefered_Time": "06:09:43",
                "Amount_Paid": 449.0,
                "Payment_Method": "Online",
                "DebitCardNo": 4578,
                "Card_Cvv": 364,
                "Assignedservice_Personal": "Prakash",
                "Order_Attended": false,
                "Order_Cancelled": true,
                "Booking_Details": "",
                "Card_Holder_Name": "",
                "Completed_flg": false,
                "Is_Deleted": false,
                "Created_Date": "2024-03-01",
                "Updated_Date": "2024-03-01",
                "Company_Id": 1,
                "Partner_Id": 2,
                "Customer_Id": 3,
                "Service_Id": 20,
                "Created_By": 3,
                "Updated_By": 3
            },
            {
                "id": 17,
                "SalesOrder_Id": "SOR000000003",
                "Parking_Notes": "Greeta towers.",
                "SalesOrderDate": "2024-03-01",
                "Service_Location": "Chennai",
                "SalesOrder_Type": "OneTime",
                "Card_expiry_date": "2024-03-01",
                "Recurring_EndDate": "2024-03-01",
                "Prefered_Date": "2024-03-01",
                "Prefered_Time": "05:24:59",
                "Amount_Paid": 550.0,
                "Payment_Method": "Online",
                "DebitCardNo": 451,
                "Card_Cvv": 123,
                "Assignedservice_Personal": "Tamil",
                "Order_Attended": true,
                "Order_Cancelled": true,
                "Booking_Details": "",
                "Card_Holder_Name": "",
                "Completed_flg": false,
                "Is_Deleted": false,
                "Created_Date": "2024-03-01",
                "Updated_Date": "2024-03-01",
                "Company_Id": 1,
                "Partner_Id": 2,
                "Customer_Id": 3,
                "Service_Id": 20,
                "Created_By": 3,
                "Updated_By": 3
            }
        ],
        "April 2024": []
    },
    "total_count": 4
}

const BitcoinPrice = () => {
    const { t } = useTranslation();
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


    const [listData, setListData] = useState(data);




    useEffect(async () => {
        var payload = {
            Company_Id: companyId
        }
        await axios.post(`${BASE_URL}/Erpapp/OneTimeSalesDashboard/`, payload, header).then((res) => {
            console.log("RRRRRRR", res);
            setListData(res?.data);
        }).catch((error) => {
            console.log(error);
        });
    }, []);



    // Function to calculate monthly totals
    const calculateMonthlyTotals = (data) => {
        const monthlyTotals = {};

        for (const [month, entries] of Object.entries(data)) {
            let totalQuantity = 0;

            entries.forEach((entry) => {
                totalQuantity += parseFloat(entry?.Amount_Paid);
            });

            monthlyTotals[month] = totalQuantity;
        }

        return monthlyTotals;
    };

    const monthlyTotals = calculateMonthlyTotals(listData?.month_wise_data);

    let chartData = Object.entries(monthlyTotals).map(([month, total]) => ({
        name: moment(month, 'MMMM YYYY').format('MMM YY'),
        count: total,
    }));


    let totalReceivedAmount = 0;
    chartData.forEach((chart) => {
        totalReceivedAmount += chart?.count;
    });



    return (
        <JumboCardQuick
            noWrapper
            title={<Typography variant={"h2"} color={"common.black"}>{FormatFloatValue(totalReceivedAmount)}</Typography>}
            subheader={
                <Typography
                    variant={"h6"}
                    color={"common.grey"}
                    mb={0}
                >{t(
                    // "widgets.subheader.bitcoinPrice"
                    'One Time Sales'
                )}</Typography>
            }
            action={
                <Typography
                    variant={"body1"}>
                    {/* 23% <TrendingUp sx={{ verticalAlign: 'middle', fontSize: '1rem', ml: .5 }} /> */}
                </Typography>
            }
            sx={{ color: "common.grey" }}
            bgColor={"#FFFFFF"}
            headerSx={{ pb: 0 }}
        >
            <Div sx={{ p: 1 }}>
                <ChartLastMonthSales data={chartData} />
            </Div>
        </JumboCardQuick>
    );
};

export default BitcoinPrice;
