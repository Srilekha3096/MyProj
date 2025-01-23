import React, { useEffect, useState } from 'react';
import TrafficAnalysisChart from "./TrafficAnalysisChart";
import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import { useTranslation } from "react-i18next";
import moment from 'moment';
import axios from 'axios';
import { BASE_URL } from 'app/services/auth-services';
import CreditScoreChart from '../CreditScore/CreditScoreChart';
import { useMediaQuery, useTheme } from '@mui/material';


const data = {
    "TotalSalesTarget": 24369044.0,
    "month_wise_data": {
        "August 2023": [],
        "September 2023": [],
        "October 2023": [],
        "November 2023": [],
        "December 2023": [
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
            }
        ],
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
            }
        ],
        "April 2024": [
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
            }
        ]
    }
}


const TrafficAnalysis = () => {
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

    const theme = useTheme();
    const isMdUp = useMediaQuery(theme.breakpoints.up('md'));


    const [listData, setListData] = useState(data);



    useEffect(async () => {
        var payload = {
            Company_Id: companyId
        }
        await axios.post(`${BASE_URL}/Erpapp/SalesScoreDashboard/`, payload, header).then((res) => {
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
                totalQuantity += entry?.Amount_Paid;
            });

            monthlyTotals[month] = totalQuantity;
        }

        return monthlyTotals;
    };

    const monthlyTotals = calculateMonthlyTotals(listData?.month_wise_data);
    console.log("monthlyTotals", monthlyTotals);

    let totalReceivedAmount = 0;
    const chartDataFilter = Object.entries(monthlyTotals).map(([month, total]) => {
        totalReceivedAmount += total;
        return {
            name: moment(month, 'MMMM YYYY').format('MMM YY'),
            count: totalReceivedAmount,
            colors: ['#438DDC', '#43DC48', '#BC43DC', '#ECE138', '#EC5B38', '#38ECEC', '#EC3877', '#EC384E', '#8DEC38'],
        };
    });


    chartDataFilter.forEach((chart) => {
        totalReceivedAmount += chart?.count;
    });


    const chartData = [
        {
            "Actual": totalReceivedAmount,
            "colors": ['#438DDC', '#43DC48', '#BC43DC', '#ECE138', '#EC5B38', '#38ECEC', '#EC3877', '#EC384E', '#8DEC38']
        }
    ];

    return (
        <JumboCardQuick
            title={t('Sales score')}
            subheader={t('Total Revenue Target Vs Actual')}
            sx={{
                textAlign: 'center'
            }}
            wrapperSx={{ pt: 0, ml: { xs: -2, md: 2, xl: 8 } }}
        >
            <br />
            <CreditScoreChart data={chartDataFilter} listData={listData?.TotalSalesTarget} totalReceivedAmount={totalReceivedAmount} />

            {/* <TrafficAnalysisChart data={chartData} TotalSalesTarget={listData?.TotalSalesTarget} TotalReceivedAmount={totalReceivedAmount} /> */}
            {isMdUp &&
                <>
                    <br />
                    <br />
                </>
            }
        </JumboCardQuick>
    );
};

export default TrafficAnalysis;
