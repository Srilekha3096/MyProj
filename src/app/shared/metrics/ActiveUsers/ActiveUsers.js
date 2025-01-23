import React, { useEffect, useState } from 'react';
import ActiveUsersChart from "./ActiveUsersChart";
import { Typography } from "@mui/material";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import { useTranslation } from "react-i18next";
import axios from 'axios';
import { BASE_URL } from 'app/services/auth-services';
import moment from 'moment';
import Div from '@jumbo/shared/Div';



const data = {
    "month_wise_data": {
        "August 2023": [],
        "September 2023": [],
        "October 2023": [],
        "November 2023": [],
        "December 2023": [],
        "January 2024": [
            {
                "id": 3,
                "MatIsu_Id": "MAI000000002",
                "Requested_By": "Tamil",
                "Issue_Date": "2024-01-12",
                "Issue_Price": 30.0,
                "Issue_Amount": 30.0,
                "Item_LineNo": 3,
                "Item": [
                    {
                        "id": 5,
                        "uom": "pieces",
                        "item_name": "Micro Fiber 500 GSM",
                        "Stock_After": 95,
                        "AvailableQty": 500,
                        "issue_quantity": "5",
                        "request_quantity": "5"
                    }
                ],
                "Quantity_Requested": false,
                "Quantity_Issued": true,
                "Created_Date": "2024-01-13",
                "Updated_Date": "2024-01-12",
                "Is_Deleted": false,
                "Company_Id": 1,
                "Partner_Id": null,
                "Store_Id": 1,
                "MatReq_Id": 3,
                "CostCentre_Id": 1,
                "Issued_By": 1,
                "Created_By": 1,
                "Updated_By": 1
            },
            {
                "id": 9,
                "MatIsu_Id": "MAI000000008",
                "Requested_By": "Tamil",
                "Issue_Date": "2024-01-24",
                "Issue_Price": 30.0,
                "Issue_Amount": 30.0,
                "Item_LineNo": 3,
                "Item": [
                    {
                        "id": 5,
                        "uom": "pieces",
                        "item_name": "Micro Fiber 500 GSM",
                        "Unit_Price": 25,
                        "Stock_After": 19,
                        "Total_Value": 25,
                        "AvailableQty": 500,
                        "issue_quantity": "01",
                        "request_quantity": "5"
                    }
                ],
                "Quantity_Requested": true,
                "Quantity_Issued": false,
                "Created_Date": "2024-01-24",
                "Updated_Date": "2024-01-24",
                "Is_Deleted": false,
                "Company_Id": 1,
                "Partner_Id": null,
                "Store_Id": 2,
                "MatReq_Id": 3,
                "CostCentre_Id": 1,
                "Issued_By": 1,
                "Created_By": 1,
                "Updated_By": 1
            },
            {
                "id": 2,
                "MatIsu_Id": "MAI000000001",
                "Requested_By": "Tamil",
                "Issue_Date": "2024-01-11",
                "Issue_Price": 30.0,
                "Issue_Amount": 30.0,
                "Item_LineNo": 3,
                "Item": [
                    {
                        "id": 4,
                        "uom": "ltr",
                        "item_name": "car washing liquid",
                        "Unit_Price": 0,
                        "Stock_After": 20,
                        "Total_Value": 0,
                        "AvailableQty": 40,
                        "issue_quantity": "20",
                        "request_quantity": "20"
                    }
                ],
                "Quantity_Requested": false,
                "Quantity_Issued": true,
                "Created_Date": "2024-01-11",
                "Updated_Date": "2024-02-02",
                "Is_Deleted": false,
                "Company_Id": 1,
                "Partner_Id": null,
                "Store_Id": 2,
                "MatReq_Id": 2,
                "CostCentre_Id": 1,
                "Issued_By": 1,
                "Created_By": 1,
                "Updated_By": 1
            },
            {
                "id": 10,
                "MatIsu_Id": "MAI000000009",
                "Requested_By": "Tamil",
                "Issue_Date": "2024-01-31",
                "Issue_Price": 30.0,
                "Issue_Amount": 30.0,
                "Item_LineNo": 3,
                "Item": [
                    {
                        "id": 11,
                        "uom": "ltr",
                        "item_name": "Car",
                        "Unit_Price": 200,
                        "Stock_After": 180,
                        "Total_Value": 8000,
                        "AvailableQty": 220,
                        "issue_quantity": 40,
                        "request_quantity": "50"
                    },
                    {
                        "id": 10,
                        "uom": "ltr",
                        "item_name": "Car Cleaner",
                        "Unit_Price": 100,
                        "Stock_After": 125,
                        "Total_Value": 9000,
                        "AvailableQty": 215,
                        "issue_quantity": 90,
                        "request_quantity": "100"
                    }
                ],
                "Quantity_Requested": true,
                "Quantity_Issued": false,
                "Created_Date": "2024-01-31",
                "Updated_Date": "2024-02-05",
                "Is_Deleted": false,
                "Company_Id": 1,
                "Partner_Id": null,
                "Store_Id": 4,
                "MatReq_Id": 7,
                "CostCentre_Id": 1,
                "Issued_By": 1,
                "Created_By": 1,
                "Updated_By": 1
            }
        ],
        "February 2024": [
            {
                "id": 11,
                "MatIsu_Id": "MAI000000010",
                "Requested_By": "Tamil",
                "Issue_Date": "2024-02-01",
                "Issue_Price": 30.0,
                "Issue_Amount": 30.0,
                "Item_LineNo": 3,
                "Item": [
                    {
                        "id": 11,
                        "uom": "ltr",
                        "item_name": "Car",
                        "Unit_Price": 445,
                        "Stock_After": 111,
                        "Total_Value": 4005,
                        "AvailableQty": 120,
                        "issue_quantity": 9,
                        "request_quantity": "50"
                    },
                    {
                        "id": 10,
                        "uom": "ltr",
                        "item_name": "Car Cleaner",
                        "Unit_Price": 111,
                        "Stock_After": 351,
                        "Total_Value": 10989,
                        "AvailableQty": 450,
                        "issue_quantity": 99,
                        "request_quantity": "100"
                    }
                ],
                "Quantity_Requested": true,
                "Quantity_Issued": false,
                "Created_Date": "2024-02-01",
                "Updated_Date": "2024-02-01",
                "Is_Deleted": false,
                "Company_Id": 1,
                "Partner_Id": null,
                "Store_Id": 2,
                "MatReq_Id": 7,
                "CostCentre_Id": 1,
                "Issued_By": 1,
                "Created_By": 1,
                "Updated_By": 1
            },
            {
                "id": 13,
                "MatIsu_Id": "MAI000000012",
                "Requested_By": "Tamil",
                "Issue_Date": "2024-02-16",
                "Issue_Price": 30.0,
                "Issue_Amount": 30.0,
                "Item_LineNo": 3,
                "Item": [
                    {
                        "id": 4,
                        "uom": "ltr",
                        "item_name": "car washing liquid",
                        "Unit_Price": 445,
                        "Stock_After": 100,
                        "Total_Value": 8900,
                        "AvailableQty": 120,
                        "issue_quantity": 20,
                        "request_quantity": "30"
                    },
                    {
                        "id": 5,
                        "uom": "pieces",
                        "item_name": "Micro Fiber 500 GSM",
                        "Unit_Price": 111,
                        "Stock_After": 13,
                        "Total_Value": 777,
                        "AvailableQty": 20,
                        "issue_quantity": 7,
                        "request_quantity": "9"
                    }
                ],
                "Quantity_Requested": true,
                "Quantity_Issued": false,
                "Created_Date": "2024-02-16",
                "Updated_Date": "2024-02-16",
                "Is_Deleted": false,
                "Company_Id": 1,
                "Partner_Id": null,
                "Store_Id": 2,
                "MatReq_Id": 4,
                "CostCentre_Id": 1,
                "Issued_By": 2,
                "Created_By": 2,
                "Updated_By": 2
            },
            {
                "id": 14,
                "MatIsu_Id": "MAI000000013",
                "Requested_By": "Tamil",
                "Issue_Date": "2024-02-16",
                "Issue_Price": 30.0,
                "Issue_Amount": 30.0,
                "Item_LineNo": 3,
                "Item": [
                    {
                        "id": 4,
                        "uom": "ltr",
                        "item_name": "car washing liquid",
                        "Unit_Price": 445,
                        "Stock_After": 90,
                        "Total_Value": 13350,
                        "AvailableQty": 120,
                        "issue_quantity": 30,
                        "request_quantity": "30"
                    },
                    {
                        "id": 5,
                        "uom": "pieces",
                        "item_name": "Micro Fiber 500 GSM",
                        "Unit_Price": 111,
                        "Stock_After": 101,
                        "Total_Value": 999,
                        "AvailableQty": 110,
                        "issue_quantity": 9,
                        "request_quantity": "9"
                    }
                ],
                "Quantity_Requested": false,
                "Quantity_Issued": false,
                "Created_Date": "2024-02-16",
                "Updated_Date": "2024-02-16",
                "Is_Deleted": false,
                "Company_Id": 1,
                "Partner_Id": 2,
                "Store_Id": 1,
                "MatReq_Id": 4,
                "CostCentre_Id": 1,
                "Issued_By": 2,
                "Created_By": 2,
                "Updated_By": 2
            },
            {
                "id": 16,
                "MatIsu_Id": "MAI000000014",
                "Requested_By": "Tamil",
                "Issue_Date": "2024-02-16",
                "Issue_Price": 30.0,
                "Issue_Amount": 30.0,
                "Item_LineNo": 3,
                "Item": [
                    {
                        "id": 5,
                        "uom": "pieces",
                        "item_name": "Micro Fiber 500 GSM",
                        "Unit_Price": 200,
                        "Stock_After": 40,
                        "Total_Value": 2000,
                        "AvailableQty": 50,
                        "issue_quantity": 10,
                        "request_quantity": "15"
                    },
                    {
                        "id": 4,
                        "uom": "ltr",
                        "item_name": "car washing liquid",
                        "Unit_Price": 100,
                        "Stock_After": 40,
                        "Total_Value": 5000,
                        "AvailableQty": 90,
                        "issue_quantity": 50,
                        "request_quantity": "55"
                    }
                ],
                "Quantity_Requested": true,
                "Quantity_Issued": false,
                "Created_Date": "2024-02-16",
                "Updated_Date": "2024-02-16",
                "Is_Deleted": false,
                "Company_Id": 1,
                "Partner_Id": 2,
                "Store_Id": 4,
                "MatReq_Id": 5,
                "CostCentre_Id": 1,
                "Issued_By": 2,
                "Created_By": 2,
                "Updated_By": 2
            },
            {
                "id": 17,
                "MatIsu_Id": "MAI000000015",
                "Requested_By": "Tamil",
                "Issue_Date": "2024-02-17",
                "Issue_Price": 30.0,
                "Issue_Amount": 30.0,
                "Item_LineNo": 3,
                "Item": [
                    {
                        "id": 5,
                        "uom": "pieces",
                        "item_name": "Micro Fiber 500 GSM",
                        "Unit_Price": 0,
                        "Stock_After": 96,
                        "Total_Value": 0,
                        "AvailableQty": 101,
                        "issue_quantity": 5,
                        "request_quantity": "5"
                    }
                ],
                "Quantity_Requested": false,
                "Quantity_Issued": false,
                "Created_Date": "2024-02-17",
                "Updated_Date": "2024-02-17",
                "Is_Deleted": false,
                "Company_Id": 1,
                "Partner_Id": 2,
                "Store_Id": 1,
                "MatReq_Id": 3,
                "CostCentre_Id": 1,
                "Issued_By": 5,
                "Created_By": 5,
                "Updated_By": 5
            },
            {
                "id": 18,
                "MatIsu_Id": "MAI000000016",
                "Requested_By": "Tamil",
                "Issue_Date": "2024-02-22",
                "Issue_Price": 30.0,
                "Issue_Amount": 30.0,
                "Item_LineNo": 3,
                "Item": [
                    {
                        "id": 4,
                        "uom": "ltr",
                        "item_name": "car washing liquid",
                        "Unit_Price": 445,
                        "Stock_After": 4,
                        "Total_Value": 8455,
                        "AvailableQty": 23,
                        "issue_quantity": 19,
                        "request_quantity": "20"
                    }
                ],
                "Quantity_Requested": true,
                "Quantity_Issued": false,
                "Created_Date": "2024-02-22",
                "Updated_Date": "2024-02-22",
                "Is_Deleted": false,
                "Company_Id": 1,
                "Partner_Id": 2,
                "Store_Id": 2,
                "MatReq_Id": 2,
                "CostCentre_Id": 1,
                "Issued_By": 5,
                "Created_By": 5,
                "Updated_By": 5
            },
            {
                "id": 19,
                "MatIsu_Id": "MAI000000017",
                "Requested_By": "Parkavi",
                "Issue_Date": "2024-02-26",
                "Issue_Price": 30.0,
                "Issue_Amount": 30.0,
                "Item_LineNo": 3,
                "Item": [
                    {
                        "id": 4,
                        "uom": "ltr",
                        "item_name": "car washing liquid",
                        "Unit_Price": 445,
                        "Stock_After": 4,
                        "Total_Value": 8455,
                        "AvailableQty": 23,
                        "issue_quantity": 19,
                        "request_quantity": "20"
                    }
                ],
                "Quantity_Requested": false,
                "Quantity_Issued": false,
                "Created_Date": "2024-02-27",
                "Updated_Date": "2024-02-26",
                "Is_Deleted": false,
                "Company_Id": 1,
                "Partner_Id": 2,
                "Store_Id": 1,
                "MatReq_Id": 19,
                "CostCentre_Id": 1,
                "Issued_By": 3,
                "Created_By": 3,
                "Updated_By": 3
            }
        ],
        "March 2024": [
            {
                "id": 20,
                "MatIsu_Id": "MAI000000018",
                "Requested_By": "Prakash",
                "Issue_Date": "2024-03-02",
                "Issue_Price": 30.0,
                "Issue_Amount": 30.0,
                "Item_LineNo": 3,
                "Item": [
                    {
                        "id": 16,
                        "uom": "pieces",
                        "item_name": "Scruber",
                        "Unit_Price": 0,
                        "Stock_After": 75,
                        "Total_Value": 0,
                        "AvailableQty": 100,
                        "issue_quantity": 25,
                        "request_quantity": 52
                    },
                    {
                        "id": 26,
                        "uom": "pieces",
                        "item_name": "Scruber",
                        "Unit_Price": 0,
                        "Stock_After": 75,
                        "Total_Value": 0,
                        "AvailableQty": 100,
                        "issue_quantity": 25,
                        "request_quantity": 52
                    }
                ],
                "Quantity_Requested": true,
                "Quantity_Issued": false,
                "Created_Date": "2024-03-04",
                "Updated_Date": "2024-03-02",
                "Is_Deleted": false,
                "Company_Id": 1,
                "Partner_Id": 2,
                "Store_Id": 11,
                "MatReq_Id": 23,
                "CostCentre_Id": 1,
                "Issued_By": 3,
                "Created_By": 3,
                "Updated_By": 3
            }
        ],
        "April 2024": []
    },
    "total_count": 12
}

const ActiveUsers = () => {
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
        await axios.post(`${BASE_URL}/Erpapp/MaterialIssueDashboard/`, payload, header).then((res) => {
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

            // entries.forEach((entry) => {
            //     totalQuantity += entry?.Quantity_Recevied;
            // });

            // monthlyTotals[month] = totalQuantity;
            monthlyTotals[month] = entries?.length;
        }

        return monthlyTotals;
    };

    const monthlyTotals = calculateMonthlyTotals(listData?.month_wise_data);

    let chartData = Object.entries(monthlyTotals).map(([month, total]) => ({
        name: moment(month, 'MMMM YYYY').format('MMM YY'),
        count: total,
    }));


    let totalReceivedQty = 0;
    chartData.forEach((chart) => {
        totalReceivedQty += chart?.count;
    });





    return (
        <JumboCardQuick
            title={<Typography variant={"h3"}>{listData?.total_count} Nos</Typography>}
            subheader={t(
                // 'widgets.subheader.activeUsers'
                'Consumptions'
            )}
            action={
                <Typography variant={"body1"} color={"success.main"}>
                    {/* 1.5% <TrendingUpIcon sx={{ verticalAlign: 'middle', fontSize: '1rem', ml: .5, color: 'inherit' }} /> */}
                </Typography>
            }
            wrapperSx={{ p: 0, pb: "0px !important" }}
        >
            <Div sx={{ p: 1, pb: 0 }}>
                <ActiveUsersChart data={chartData} />
            </Div>
        </JumboCardQuick>
    );
};

export default ActiveUsers;
