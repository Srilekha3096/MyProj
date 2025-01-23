import React, { useEffect, useState } from 'react';
import Typography from "@mui/material/Typography";
import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import { useTranslation } from "react-i18next";
import { TrendingUp } from "@mui/icons-material";
import OnlineSignupChartFilled from "./OnlineSignupChartFilled";
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
                "id": 7,
                "SalesOrder_Id": "SOR000000001",
                "Parking_Notes": "park left side of the building",
                "SalesOrderDate": "2024-03-04",
                "Service_Location": "Chennai",
                "SalesOrder_Type": "Subscription",
                "Card_expiry_date": "2024-03-04",
                "Recurring_EndDate": "2024-03-04",
                "Prefered_Date": "2024-03-04",
                "Prefered_Time": "09:03:47",
                "Amount_Paid": 12000.0,
                "Payment_Method": "Online",
                "DebitCardNo": 1313,
                "Card_Cvv": 122,
                "Assignedservice_Personal": "Ponkumar",
                "Order_Attended": false,
                "Order_Cancelled": true,
                "Booking_Details": "Booked Car accessories",
                "Card_Holder_Name": "Ponkumar",
                "Completed_flg": false,
                "Is_Deleted": false,
                "Created_Date": "2024-02-22",
                "Updated_Date": "2024-02-22",
                "Company_Id": 1,
                "Partner_Id": 2,
                "Customer_Id": 3,
                "Service_Id": 39,
                "Created_By": 1,
                "Updated_By": 1
            }
        ],
        "March 2024": [],
        "April 2024": []
    },
    "total_count": 1
}


const RipplePrice = () => {
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
        await axios.post(`${BASE_URL}/Erpapp/SubscriptionSalesDashboard/`, payload, header).then((res) => {
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
            title={<Typography variant={"h3"} color={"common.black"}>{FormatFloatValue(totalReceivedAmount)}</Typography>}
            subheader={
                <Typography
                    variant={"h6"}
                    color={"common.grey"}
                    mb={0}
                >{t(
                    // 'widgets.subheader.ripplePrice'
                    'Sales from subscription'
                )}</Typography>
            }
            action={
                <Typography
                    variant={"body1"}
                >
                    {/* 6% <TrendingUp sx={{ verticalAlign: 'middle', fontSize: '1rem', ml: .5 }} /> */}
                </Typography>
            }
            sx={{ color: "common.black" }}
            bgColor={"#FFFFFF"}
            wrapperSx={{ p: 0, pb: "0px !important" }}
        >
            <Div sx={{ p: 0 }}>
                <OnlineSignupChartFilled data={chartData} color={"#AED6F1 "} />
            </Div>
        </JumboCardQuick>
    );
};

export default RipplePrice;
