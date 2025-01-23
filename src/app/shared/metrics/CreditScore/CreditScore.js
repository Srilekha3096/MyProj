import React, { useEffect, useState } from 'react';
import CreditScoreChart from "./CreditScoreChart";
import { Button, Typography, useMediaQuery, useTheme } from "@mui/material";
import RefreshIcon from '@mui/icons-material/Refresh';
import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import Div from "@jumbo/shared/Div";
import { useTranslation } from "react-i18next";
import moment from 'moment';
import axios from 'axios';
import { BASE_URL } from 'app/services/auth-services';



const data = {
    "TotalBudgetTarget": 5808086.0,
    "month_wise_data": {
        "August 2023": [],
        "September 2023": [],
        "October 2023": [],
        "November 2023": [],
        "December 2023": [],
        "January 2024": [],
        "February 2024": [
            {
                "id": 6,
                "Voucher_Type": "Payment vouchar",
                "Bank_Cash": "Bank",
                "Voucher_Id": "VOU000000001",
                "Transaction_No": "1",
                "Voucher": "Bank Voucher",
                "Amount": 1000.0,
                "Reference": "Karthik",
                "Currency": "INR",
                "Bank_Name": "Axis",
                "Account_Description": "Personal Use",
                "Transaction_Amount": 100.0,
                "Account": [
                    {
                        "debit": "1000",
                        "Amount": "11000",
                        "Credit": 0,
                        "Account_Id": "CHA000000008",
                        "accountName": "Reimbursement",
                        "Account_Type": "Expense",
                        "GLaccount_Id": "401001",
                        "Account_Group": ""
                    },
                    {
                        "debit": 0,
                        "Amount": "10000",
                        "Credit": "1000",
                        "Account_Id": "CHA000000007",
                        "accountName": "Reimbursement",
                        "Account_Type": "Income",
                        "GLaccount_Id": "401001",
                        "Account_Group": ""
                    }
                ],
                "Notes": "nothing",
                "Voucher_Date": "2024-02-26",
                "Cash_Or_Bank": false,
                "Bank_Or_Cash": true,
                "Conversion_Rate": "",
                "Debitor_Credit_List": "",
                "Instrument_Type": "",
                "Instrument_No": "",
                "Approved_Flg": true,
                "Approved_By": "Ponkumar",
                "Is_Deleted": false,
                "Created_Date": "2024-02-26",
                "Updated_Date": "2024-02-26",
                "Company_Id": 1,
                "Partner_Id": 2,
                "CostCenter_Id": 2,
                "Created_By": 1,
                "Updated_By": 1
            },
            {
                "id": 7,
                "Voucher_Type": "Payment vouchar",
                "Bank_Cash": "Bank",
                "Voucher_Id": "VOU000000002",
                "Transaction_No": "1",
                "Voucher": "Bank Voucher",
                "Amount": 10000.0,
                "Reference": "Karthik",
                "Currency": "",
                "Bank_Name": "Axis",
                "Account_Description": "Personal Use.",
                "Transaction_Amount": 5000.0,
                "Account": [
                    {
                        "debit": "10000",
                        "Amount": 10010,
                        "Credit": 0,
                        "Account_Id": "CHA000000010",
                        "accountName": "Reimbursement",
                        "Account_Type": "Expense",
                        "GLaccount_Id": "401001",
                        "Account_Group": ""
                    },
                    {
                        "debit": 0,
                        "401001": "GLA000000006",
                        "Amount": 100,
                        "Credit": "10000",
                        "Account_Id": "CHA000000005",
                        "accountName": "Reimbursement",
                        "Account_Type": "Expense",
                        "Account_Group": ""
                    }
                ],
                "Notes": "",
                "Voucher_Date": "2024-02-26",
                "Cash_Or_Bank": false,
                "Bank_Or_Cash": true,
                "Conversion_Rate": "",
                "Debitor_Credit_List": "",
                "Instrument_Type": "",
                "Instrument_No": "",
                "Approved_Flg": true,
                "Approved_By": "Karthik",
                "Is_Deleted": false,
                "Created_Date": "2024-02-26",
                "Updated_Date": "2024-02-26",
                "Company_Id": 1,
                "Partner_Id": 2,
                "CostCenter_Id": 2,
                "Created_By": 3,
                "Updated_By": 3
            }
        ],
        "March 2024": [],
        "April 2024": []
    }
}


const CreditScore = () => {
    const { t } = useTranslation();
    const [score, setScore] = React.useState(500);
    const [isLoading, setLoading] = React.useState(false);

    const simulateNetworkRequest = () => {
        return new Promise((resolve) => setTimeout(resolve, 2000));
    }

    const updateScore = () => {
        setLoading(!isLoading);
        simulateNetworkRequest().then(() => {
            setScore((Math.floor(Math.random() * 9) + 2) * 98);
            setLoading(!isLoading);
        });
    };


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
        await axios.post(`${BASE_URL}/Erpapp/BudgetScoreDashboard/`, payload, header).then((res) => {
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
                totalQuantity += entry?.Transaction_Amount;
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
            title={t('Budget Score')}
            subheader={t('Total Budget Vs Actual')}
            sx={{
                textAlign: 'center'
            }}
            wrapperSx={{ pt: 0, ml: { xs: -2, md: 2, xl: 8 } }}
        >
            <br />
            <CreditScoreChart data={chartData} listData={listData?.TotalBudgetTarget} totalReceivedAmount={totalReceivedAmount} score={score} />
            {isMdUp &&
                <>
                    <br />
                    <br />
                </>
            }
        </JumboCardQuick>
    );
};

export default CreditScore;
